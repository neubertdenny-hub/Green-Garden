// Inquiry Types for Automation System

export type InquiryType = 'offer' | 'question' | 'complaint' | 'feedback' | 'other';
export type InquiryStatus = 'new' | 'classified' | 'offer_sent' | 'won' | 'lost' | 'resolved' | 'escalated';

export interface Inquiry {
  id: string;
  createdAt: string;
  updatedAt: string;

  // Customer Info
  customerName: string;
  customerEmail: string;
  customerPhone?: string;

  // Inquiry Details
  type: InquiryType;
  status: InquiryStatus;
  subject: string;
  message: string;
  source: 'contact_form' | 'email' | 'chatbot'; // Where it came from

  // Product (if applicable)
  productSku?: string;
  productName?: string;
  quantity?: number;

  // Offer (if applicable)
  offerSent?: boolean;
  offerSentAt?: string;
  offerExpiresAt?: string;
  estimatedPrice?: number;

  // Notes & Internal
  internalNotes?: string;
  assignedTo?: string; // Support agent
  tags?: string[]; // For categorization

  // Metadata
  userAgent?: string;
  ipAddress?: string;
  classificationScore?: number; // AI confidence
}

export interface InquiryResponse {
  success: boolean;
  inquiryId?: string;
  message: string;
  classification?: {
    type: InquiryType;
    confidence: number;
  };
}

export interface OfferData {
  inquiryId: string;
  productSku: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  discount: number;
  expiresIn: number; // days
}
