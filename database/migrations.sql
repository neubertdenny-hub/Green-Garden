-- GreenGarden Inquiry Management System
-- Supabase Database Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Inquiries Table
CREATE TABLE IF NOT EXISTS inquiries (
  id TEXT PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  type TEXT NOT NULL CHECK (type IN ('offer', 'question', 'complaint', 'feedback', 'other')),
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'classified', 'offer_sent', 'won', 'lost', 'resolved', 'escalated')),
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  source TEXT NOT NULL CHECK (source IN ('contact_form', 'email', 'chatbot')),
  product_sku TEXT,
  product_name TEXT,
  quantity INTEGER,
  user_agent TEXT,
  ip_address TEXT,
  classification_score DECIMAL(3,2),
  assigned_to TEXT,
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  internal_notes TEXT,
  INDEX idx_email (customer_email),
  INDEX idx_status (status),
  INDEX idx_type (type),
  INDEX idx_created (created_at)
);

-- Offers Table
CREATE TABLE IF NOT EXISTS offers (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  inquiry_id TEXT NOT NULL REFERENCES inquiries(id) ON DELETE CASCADE,
  product_sku TEXT NOT NULL,
  product_name TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  discount DECIMAL(10,2) DEFAULT 0,
  discount_percent DECIMAL(5,2),
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  sent_at TIMESTAMP WITH TIME ZONE,
  accepted_at TIMESTAMP WITH TIME ZONE,
  INDEX idx_inquiry (inquiry_id),
  INDEX idx_expires (expires_at)
);

-- Audit Log Table
CREATE TABLE IF NOT EXISTS audit_log (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  inquiry_id TEXT REFERENCES inquiries(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  actor TEXT,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_inquiry (inquiry_id),
  INDEX idx_created (created_at)
);

-- Email History Table
CREATE TABLE IF NOT EXISTS email_history (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  inquiry_id TEXT REFERENCES inquiries(id) ON DELETE CASCADE,
  recipient TEXT NOT NULL,
  subject TEXT NOT NULL,
  email_type TEXT NOT NULL CHECK (email_type IN ('auto_response', 'offer', 'status_update', 'manual')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed', 'bounced')),
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  sent_at TIMESTAMP WITH TIME ZONE,
  INDEX idx_inquiry (inquiry_id),
  INDEX idx_status (status)
);

-- Enable Row Level Security (RLS)
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_history ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read/write (for now - restrict in production)
CREATE POLICY "Allow public read inquiries" ON inquiries
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert inquiries" ON inquiries
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update inquiries" ON inquiries
  FOR UPDATE USING (true);

CREATE POLICY "Allow public read offers" ON offers
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert offers" ON offers
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read audit_log" ON audit_log
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert audit_log" ON audit_log
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read email_history" ON email_history
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert email_history" ON email_history
  FOR INSERT WITH CHECK (true);
