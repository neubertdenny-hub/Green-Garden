# GreenGarden Automation System

## Status: IN PROGRESS 🚀

Automation für Kundenanfragen, Angebotserstellung und Reklamationsbearbeitung.

---

## ✅ GEBAUT (Phase 1)

### 1. Kontaktformular (`/contact`)
- ✅ `/app/contact/page.tsx` - Frontend Formular
- ✅ `/app/api/contact/route.ts` - API zum Eingang
- ✅ Email-Klassifizierung (nutzt `email-classifier.ts`)
- ✅ Automatische Kategorisierung (Angebot/Frage/Reklamation)

### 2. Types & Interfaces
- ✅ `/lib/types/inquiry.ts` - Inquiry, InquiryStatus, OfferData

### 3. Admin Dashboard
- ✅ `/app/admin/inquiries/page.tsx` - Dashboard Grundlage

### 4. Angebots-Generator
- ✅ `/lib/automation/offer-generator.ts` - Billbee Integration
- ✅ `generateOfferFromInquiry()` - Auto-Angebote erstellen
- ✅ `generateOfferEmailHtml()` - HTML Email Templates

---

## ⏳ TODO (Phase 2+3)

### Phase 2: Datenbank Integration
- [ ] Supabase Setup
  - [ ] Create `inquiries` table
  - [ ] Create `offers` table
  - [ ] Create `audit_log` table
- [ ] Save inquiries to DB
- [ ] Supabase Client Setup
- [ ] Real-time subscriptions

### Phase 3: Automation Workflows
- [ ] Auto-response Email nach Inquiry
- [ ] Auto-Angebot nach Klassifizierung
- [ ] Email-Webhook für Incoming Emails
- [ ] Chatbot Integration (Chat API)
- [ ] Status Tracking & Updates

### Phase 4: Admin Features
- [ ] Inquiry List mit Live Updates
- [ ] Manual Offer Creation
- [ ] Status Management
- [ ] Email Sending from Dashboard
- [ ] Analytics & Reports

---

## ENVIRONMENT SETUP (SPÄTER)

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key

# Resend (Email)
RESEND_API_KEY=your_key

# Email Webhook
EMAIL_WEBHOOK_KEY=your_key
```

---

## API ROUTES

### POST /api/contact
Submit inquiry from form.

**Request:**
```json
{
  "customerName": "Max Mustermann",
  "customerEmail": "max@example.com",
  "customerPhone": "+49 123 456789",
  "subject": "Angebotsa nfrage für Produkte",
  "message": "Ich bin interessiert an...",
  "source": "contact_form"
}
```

**Response:**
```json
{
  "success": true,
  "inquiryId": "INQ-123456-abc123",
  "message": "Danke für Ihre Anfrage!",
  "classification": {
    "type": "offer",
    "confidence": 0.85
  }
}
```

---

## NEXT STEPS

1. **Supabase Setup**
   - Create project at supabase.com
   - Create tables: inquiries, offers, audit_log
   - Get URL & API key

2. **Resend Setup**
   - Get API key at resend.com
   - Add email domain

3. **Connect to Database**
   - Save inquiries to DB
   - Fetch for dashboard

4. **Test Workflows**
   - Submit inquiry via form
   - Check classification
   - Send auto-response

---

## File Structure

```
app/
├── contact/
│   └── page.tsx (Contact Form Frontend)
├── admin/
│   └── inquiries/
│       └── page.tsx (Admin Dashboard)
└── api/
    └── contact/
        └── route.ts (API Endpoint)

lib/
├── types/
│   └── inquiry.ts (TypeScript Types)
├── automation/
│   └── offer-generator.ts (Angebots-Logik)
├── email-classifier.ts ✅
├── email-sender.ts ✅
└── billbee.ts ✅
```

---

## KEYS (SPÄTER)

1. Supabase Setup → get URL & API Key
2. Resend Setup → get API Key
3. Add to `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=xxx
   NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
   RESEND_API_KEY=xxx
   ```

---

Status: READY FOR DB SETUP 🚀
