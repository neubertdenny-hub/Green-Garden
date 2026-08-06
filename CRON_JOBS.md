# Cron Jobs Setup für GreenGarden

## Stündliche Angebotserstellung (Phase 3)

Dieser Cron Job verarbeitet automatisch alle neuen Angebotsanfragen (`type='offer'`, `status='new'`) und:

1. Holt aktuelle Preise von Billbee
2. Berechnet Rabatte basierend auf Menge
3. Generiert professionelle Angebots-Emails
4. Versendet Emails via Resend
5. Aktualisiert Status auf `offer_sent`

---

## API Endpoint

**URL:** `/api/cron/process-offers`
**Method:** `GET`
**Auth:** Requires `CRON_SECRET` in Authorization header

### Authentifizierung

```bash
Authorization: Bearer ${CRON_SECRET}
```

Der Secret ist in `.env.local`:
```env
CRON_SECRET=green_garden_cron_secret_456
```

---

## Option 1: Vercel Cron (Empfohlen)

Wenn du auf Vercel deployst, kannst du automatische Cron Jobs einrichten.

Erstelle eine `vercel.json` in der Root:

```json
{
  "crons": [
    {
      "path": "/api/cron/process-offers",
      "schedule": "0 * * * *"
    }
  ]
}
```

**Schedule Erklärung:**
- `0 * * * *` = Stündlich um die volle Stunde
- `0 */2 * * *` = Alle 2 Stunden
- `*/15 * * * *` = Alle 15 Minuten

Deploy und der Cron läuft automatisch! 🚀

---

## Option 2: Manuell Testen (Local)

```bash
curl -X GET http://localhost:3000/api/cron/process-offers \
  -H "Authorization: Bearer green_garden_cron_secret_456"
```

**Erwartete Response:**

```json
{
  "status": "success",
  "message": "Processed 3 inquiries",
  "summary": {
    "total": 3,
    "success": 2,
    "errors": 1
  },
  "results": [
    {
      "inquiryId": "INQ-...",
      "status": "success",
      "email": "test@beispiel.de",
      "productSku": "NN-IK54-4FG4",
      "quantity": 5,
      "totalPrice": "499.95"
    }
  ]
}
```

---

## Option 3: Externe Cron (z.B. EasyCron, GitHub Actions)

### Mit EasyCron.com:

1. Registriere dich auf [easycron.com](https://www.easycron.com)
2. Neue Cron erstellen:
   - **URL:** `https://yourdomain.com/api/cron/process-offers`
   - **HTTP Header:**
     ```
     Authorization: Bearer YOUR_CRON_SECRET
     ```
   - **Schedule:** `0 * * * *` (stündlich)

3. Cron wird stündlich ausgeführt

---

## Was passiert beim Ausführen:

### 1️⃣ Abfrage
```
SELECT * FROM inquiries 
WHERE type='offer' AND status='new'
LIMIT 50
```

### 2️⃣ Für jede Anfrage:
- ✅ Billbee API: Preis abrufen
- ✅ Rabatt berechnen (10% ab 15 Stück)
- ✅ Angebot-Email generieren
- ✅ Email via Resend versendet
- ✅ Status → "offer_sent"
- ✅ offer-Tabelle: Datensatz erstellt

### 3️⃣ Fehlerbehandlung
Wenn etwas schiefgeht:
- Status → "error"
- Error-Message in `internal_notes`
- Weiterhin 49 andere Anfragen verarbeiten

---

## Monitoring

### Logs anschauen (Vercel):

```bash
vercel logs
# oder im Dashboard unter Logs
```

### Manuell überprüfen:

1. Gehe zu http://localhost:3000/admin/inquiries
2. Schaue auf **Status** der Anfragen:
   - 🟢 **new** = Noch nicht verarbeitet
   - 🔵 **offer_sent** = Angebot versendet
   - 🔴 **error** = Fehler (check `internal_notes`)

3. Schaue in Supabase → **offers** Tabelle
   - Sollte einen Eintrag pro verarbeiteter Anfrage haben

---

## Fehlerbehandlung

| Problem | Ursache | Lösung |
|---------|--------|--------|
| "Unauthorized" (401) | CRON_SECRET falsch | Überprüfe `.env.local` |
| "Supabase not configured" | env.local nicht geladen | Server neu starten |
| "Product not found" | SKU existiert nicht in Billbee | Überprüfe Product SKU in der Anfrage |
| "Email sending failed" | Resend Domäne nicht verifiziert | Domain in Resend Dashboard verifizieren |

---

## Logs verstehen

```
📋 Processing 3 pending offer inquiries...
✅ Offer sent to test@beispiel.de for Küchenanschlussbox (5x)
✅ Offer sent to max@beispiel.de for Premium Rasensamen (2x)
⚠️ Inquiry INQ-123 has no product SKU

📊 Cron Job Summary:
   ✅ Success: 2
   ❌ Errors: 1
   📈 Total Processed: 3
```

---

## Nächste Schritte

1. **Deploy auf Vercel:**
   - `git push` → Vercel deployed automatisch
   - Cron läuft stündlich

2. **Testen mit echter Anfrage:**
   - Kontaktformular: Neue Anfrage einreichen
   - Cron läuft automatisch
   - Angebot sollte 1 Stunde später ankommen

3. **Monitoring einrichten:**
   - Resend Dashboard: Email Öffnungsrate
   - Supabase: offers-Tabelle wachsen sehen
   - Admin Dashboard: Status-Updates
