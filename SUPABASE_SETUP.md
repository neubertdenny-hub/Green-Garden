# Supabase Setup Guide

GreenGarden Automation benötigt Supabase für die Datenpersistierung von Kundenanfragen.

## 1. Supabase Project erstellen

1. Gehe zu https://supabase.com und logge dich ein (oder erstelle einen Account)
2. Klicke auf "New Project"
3. Wähle einen Projektnamen: `greengarden`
4. Wähle eine Region (z.B. `eu-west-1` für Deutschland)
5. Setze ein sicheres Passwort
6. Klicke "Create new project"

## 2. Database Schema erstellen

Nach dem Projekt-Setup:

1. Gehe zu "SQL Editor" im Supabase Dashboard
2. Klicke "New Query"
3. Kopiere den gesamten Inhalt von `database/migrations.sql`
4. Füge ihn in den SQL Editor ein
5. Klicke "Run"

Das erstellt automatisch alle notwendigen Tabellen:
- `inquiries` - Kundenanfragen
- `offers` - Angebote
- `audit_log` - Aktivitätsprotokoll
- `email_history` - Email-Versand-Tracking

## 3. API Keys kopieren

1. Gehe zu "Settings" → "API"
2. Kopiere folgende Werte:

**NEXT_PUBLIC_SUPABASE_URL**
- Zu finden unter "Project URL"

**NEXT_PUBLIC_SUPABASE_ANON_KEY**
- Zu finden unter "anon public" (unter "Project API Keys")

## 4. .env.local aktualisieren

Füge die Keys zu `.env.local` hinzu:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...your-key...
```

## 5. Dev Server neu starten

```bash
npm run dev
```

Der Server sollte jetzt "✅ Supabase connected" in den Logs zeigen.

## Überprüfung

Nachdem die Keys hinzugefügt wurden:

1. Gehe zu http://localhost:3000/contact
2. Fülle das Kontaktformular aus
3. Absenden
4. Gehe zu Supabase Dashboard → "inquiries" Tabelle
5. Die neue Anfrage sollte dort erscheinen

## Troubleshooting

**"Supabase credentials not configured"**
- Überprüfe, dass die Keys in `.env.local` korrekt sind
- Der Dev Server muss neu gestartet werden nach Änderungen an .env.local

**"Permission denied" Fehler**
- Überprüfe, dass Row Level Security (RLS) Policies in der Database gesetzt sind
- Führe `database/migrations.sql` erneut aus

**Connection fehlgeschlagen**
- Überprüfe die Supabase Project URL (muss mit `https://` beginnen)
- Überprüfe, dass der API Key (anon public) korrekt kopiert wurde
