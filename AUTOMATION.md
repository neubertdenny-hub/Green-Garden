# GreenGarden Automation System

## Status: PHASE 2 IN PROGRESS 🚀

Automation für Kundenanfragen, Angebotserstellung und Reklamationsbearbeitung.

---

## ✅ GEBAUT (Phase 1 & 2)

### Phase 1: Contact Form & Classification
- ✅ `/app/contact/page.tsx` - Professional Kontaktformular
- ✅ `/app/api/contact/route.ts` - API Endpoint mit Klassifizierung
- ✅ Email-Klassifizierung (regex-basiert)
- ✅ Auto-Kategorisierung (offer/question/complaint/feedback/other)
- ✅ Product SKU & Quantity Extraction

### Phase 2: Database & Email Integration (LIVE)
- ✅ Supabase Client (`/lib/supabase.ts`)
- ✅ Database Schema (migrations.sql)
  - ✅ inquiries table
  - ✅ offers table
  - ✅ audit_log table
  - ✅ email_history table
- ✅ Inquiry Persistence in Supabase
- ✅ Resend Email API Integration (`/lib/email-resend.ts`)
- ✅ Auto-Response Emails
- ✅ Admin Dashboard mit Live Stats (`/app/admin/inquiries`)
  - ✅ Real-time Inquiry Count
  - ✅ Status Filtering (new/offer_sent/won/lost)
  - ✅ Type Badges (offer/question/complaint)

### Phase 3: Offer Automation (Ready)
- ✅ `/lib/automation/offer-generator.ts` - Billbee Integration
- ✅ `generateOfferFromInquiry()` - Auto-Angebote
- ✅ `generateOfferEmailHtml()` - Professional Offer Templates
- ⏳ Trigger nach Klassifizierung (ready, needs cron)

---

## 🔄 IN PROGRESS (Phase 3)

### Offer Workflows
- [ ] Cron Job für Auto-Angebote
- [ ] Billbee Price Sync
- [ ] Manual Offer Creation (Admin)
- [ ] Offer Expiration Tracking

### Email Webhooks
- [ ] Incoming Email Handler
- [ ] Email Classification from EML
- [ ] Auto-Attach to Inquiry Thread

### Chat Integration
- [ ] Chatbot Endpoint
- [ ] Real-time WebSocket
- [ ] Chat Message Classification

---

## ENVIRONMENT SETUP

```env
# Supabase (REQUIRED for Phase 2)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...

# Resend Email (ACTIVE ✅)
RESEND_API_KEY=re_xxx_your_api_key_here

# Email Webhook
EMAIL_WEBHOOK_KEY=green_garden_webhook_key_123

# Cron Secret
CRON_SECRET=green_garden_cron_secret_456
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
