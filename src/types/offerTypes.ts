import React from 'react';

// Lead Contact Interface
export interface LeadContact {
  name: string;
  id: string;
  phone?: string;
  email?: string;
}

// Offer Preview Section Interface
export interface OfferPreviewSection {
  id: string;
  title: string;
  icon?: React.ReactNode;
  render: (offer: any, t: (key: string, options?: any) => string) => React.ReactNode;
  visible?: boolean;
}

// Offer Interface
export interface Offer {
  id?: string;
  offerId?: string;
  title?: string;
  leadName?: string;
  patientName?: string;
  leadId?: string;
  patientId?: string;
  leadContact?: LeadContact;
  services?: Array<{
    name: string;
    description?: string;
    amount?: number;
    price?: number;
    currency?: string;
  }>;
  totalAmount?: number;
  basePrice?: number;
  currency?: string;
  status?: string;
  validUntil?: string;
  createdAt?: string;
  offerDate?: string;
  createdBy?: string;
  paymentTerms?: string;
  notes?: string;
  sharedExternally?: boolean;
}

// User permissions interface
export interface UserPermissions {
  canEdit?: boolean;
  canSend?: boolean;
  canDownload?: boolean;
  canChangeStatus?: boolean;
}