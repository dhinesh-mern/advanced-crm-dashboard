"use client";

import { Customer } from "@/app/types/customer";

interface CustomerFormProps {
  customer: Customer;
  onChange: (customer: Customer) => void;
    errors: {
    name: string;
    email: string;
    phone: string;
    company: string;
  };

  

  clearError: (
    field: "name" | "email" | "phone" | "company"
  ) => void;

}

export default function CustomerForm({
  customer,
  onChange,
    errors,
  clearError,

}: CustomerFormProps) {
  const updateField = <
    K extends keyof Customer
  >(
    key: K,
    value: Customer[K]
  ) => {
    onChange({
      ...customer,
      [key]: value,
    });
  };

  return (
    <div className="space-y-5">

      {/* Name */}

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">
          Name *
        </label>

        <input
          value={customer.name}
onChange={(e) => {
  updateField("name", e.target.value);
  clearError("name");
}}
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-white outline-none focus:border-blue-500"
        />

        {errors.name && (
  <p className="mt-1 text-sm text-red-500">
    {errors.name}
  </p>
)}

      </div>

      {/* Email */}

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">
          Email *
        </label>

        <input
          type="email"
          value={customer.email}
onChange={(e) => {
  updateField("email", e.target.value);
  clearError("email");
}}
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-white outline-none focus:border-blue-500"
        />

{errors.email && (
  <p className="mt-1 text-sm text-red-500">
    {errors.email}
  </p>
)}

      </div>

      {/* Phone */}

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">
          Phone
        </label>

        <input
          value={customer.phone}
onChange={(e) => {
  updateField("phone", e.target.value);
  clearError("phone");
}}
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-white outline-none focus:border-blue-500"
        />

        {errors.phone && (
  <p className="mt-1 text-sm text-red-500">
    {errors.phone}
  </p>
)}

      </div>

      {/* Company */}

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">
          Company
        </label>

        <input
          value={customer.company}
onChange={(e) => {
  updateField("company", e.target.value);
  clearError("company");
}}
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-white outline-none focus:border-blue-500"
        />

        {errors.company && (
  <p className="mt-1 text-sm text-red-500">
    {errors.company}
  </p>
)}

      </div>

      {/* Status + Date */}

      <div className="grid grid-cols-2 gap-4">

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Status
          </label>

          <select
            value={customer.status}
            onChange={(e) =>
              updateField(
                "status",
                e.target.value as Customer["status"]
              )
            }
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-white outline-none"
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Last Contact
          </label>

          <input
            type="date"
            value={customer.lastContact}
            onChange={(e) =>
              updateField(
                "lastContact",
                e.target.value
              )
            }
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-white outline-none"
          />


        </div>

      </div>

      {/* Notes */}

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">
          Notes
        </label>

        <textarea
          rows={5}
          value={customer.notes ?? ""}
          onChange={(e) =>
            updateField("notes", e.target.value)
          }
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none resize-none"
        />


      </div>

    </div>
  );
}