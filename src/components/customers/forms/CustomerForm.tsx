"use client";

import { Customer } from "@/app/types/customer";

interface CustomerFormProps {
  customer: Customer;
  onChange: (customer: Customer) => void;

  errors?: {
    name: string;
    email: string;
    phone: string;
    company: string;
  };

  clearError?: (
    field: "name" | "email" | "phone" | "company"
  ) => void;
}

export default function CustomerForm({
  customer,
  onChange,
    errors,
  clearError,

}: CustomerFormProps) {
  const update = <K extends keyof Customer>(
    key: K,
    value: Customer[K]
  ) => {
    onChange({
      ...customer,
      [key]: value,
    });
  };

  return (
    <div className="space-y-6">

      {/* Name */}

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">
          Customer Name *
        </label>

        <input
          type="text"
          value={customer.name}
          onChange={(e) =>{
            update("name", e.target.value)  
            clearError?.("name");
          }

            
          }
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-white outline-none focus:border-blue-500"
        />

        {errors?.name && (
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
          onChange={(e) =>{
             update("email", e.target.value)
            clearError?.("email");
          }
           
          }
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-white outline-none focus:border-blue-500"
        />

        {errors?.email && (
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
          type="text"
          value={customer.phone}
          onChange={(e) => {
              update("phone", e.target.value)
              clearError?.("phone");
          }
           
          }
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-white outline-none focus:border-blue-500"
        />

        {errors?.phone && (
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
          type="text"
          value={customer.company}
          onChange={(e) =>
          {

                       update("company", e.target.value)
              clearError?.("company");
          }
 
          }
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-white outline-none focus:border-blue-500"
        />

        {errors?.company && (
  <p className="mt-1 text-sm text-red-500">
    {errors.company}
  </p>
)}

      </div>


      {/* Avatar */}

<div>
  <label className="mb-2 block text-sm font-medium text-slate-300">
    Profile Picture URL
  </label>

  <input
    type="url"
    placeholder="https://example.com/avatar.jpg"
    value={customer.avatar}
    onChange={(e) =>
      update("avatar", e.target.value)
    }
    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-white outline-none focus:border-blue-500"
  />

  {customer.avatar && (
    <div className="mt-4 flex justify-center">
      <img
        src={customer.avatar}
        alt="Preview"
        className="h-24 w-24 rounded-full border-2 border-slate-700 object-cover"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
    </div>
  )}
</div>


      {/* Status */}

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">
          Status
        </label>

        <select
          value={customer.status}
          onChange={(e) =>
            update(
              "status",
              e.target.value as Customer["status"]
            )
          }
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-white outline-none"
        >
          <option value="Active">
            Active
          </option>

          <option value="Inactive">
            Inactive
          </option>
        </select>
      </div>

      {/* Last Contact */}

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">
          Last Contact
        </label>

        <input
          type="date"
          value={customer.lastContact}
          onChange={(e) =>
            update(
              "lastContact",
              e.target.value
            )
          }
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-white outline-none"
        />
      </div>

      {/* Notes */}

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">
          Notes
        </label>

        <textarea
          rows={4}
          value={customer.notes ?? ""}
          onChange={(e) =>
            update("notes", e.target.value)
          }
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none resize-none"
        />
      </div>

    </div>
  );
}