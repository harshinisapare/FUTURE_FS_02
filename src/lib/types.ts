export type LeadStatus = 'new' | 'contacted' | 'converted';
export type LeadSource = 'website' | 'referral' | 'social' | 'email' | 'cold-call' | 'event';

export interface LeadNote {
  id: string;
  text: string;
  createdAt: Date;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  source: LeadSource;
  status: LeadStatus;
  value: number;
  notes: LeadNote[];
  createdAt: Date;
  updatedAt: Date;
  lastContactedAt: Date | null;
}
