export type CustomerStatus = "Active" | "Inactive";

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: CustomerStatus;
  lastContact: string;
  avatar: string;
  notes?: string;
}