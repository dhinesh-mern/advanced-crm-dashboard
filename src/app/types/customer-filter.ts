export interface CustomerFilters {
  statuses: string[];

  companies: string[];

  phone: string;

  email: string;

  fromDate: string;

  toDate: string;
}

export const DEFAULT_CUSTOMER_FILTERS: CustomerFilters = {
  statuses: [],

  companies: [],

  phone: "",

  email: "",

  fromDate: "",

  toDate: "",
};