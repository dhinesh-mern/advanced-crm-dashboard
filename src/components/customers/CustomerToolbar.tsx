"use client";

import { Plus, SlidersHorizontal, Search } from "lucide-react";

interface CustomerToolbarProps {
  search: string;
  status: string;
  company: string;

  companies: string[];

  dragEnabled: boolean;
  onToggleDrag: () => void;

  onOpenFilters: () => void;

  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onCompanyChange: (value: string) => void;
  onAddCustomer: () => void;
}
export default function CustomerToolbar({
  search,
  status,
  company,
  companies,
  dragEnabled,
  onToggleDrag,
  onOpenFilters,
  onSearchChange,
  onStatusChange,
  onCompanyChange,
  onAddCustomer,
}: CustomerToolbarProps) {

  return (
    <div className="mb-6 flex flex-col gap-4 rounded-xl border border-slate-800 bg-slate-900 p-5 lg:flex-row lg:items-center lg:justify-between">
      {/* Left Section */}
      <div className="flex flex-1 flex-col gap-4 md:flex-row">
        {/* Search */}
        <div className="relative w-full md:max-w-md">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search customers..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 py-2.5 pl-10 pr-4 text-sm text-white outline-none transition focus:border-blue-500"
          />
        </div>

        {/* Status Filter */}
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500"
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        {/* Company Filter */}
        <select
          value={company}
          onChange={(e) => onCompanyChange(e.target.value)}
          className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500"
        >
          <option value="All">All Companies</option>

          {companies.map((company) => (
            <option
              key={company}
              value={company}
            >
              {company}
            </option>
          ))}
        </select>
      </div>

      {/* Right Section */}
      {/* Right Section */}
      <div className="flex gap-3">
        <button
          onClick={onOpenFilters}
          className="flex items-center gap-2 rounded-lg border border-slate-700 px-4 py-2.5 text-white hover:bg-slate-800"
        >
          <SlidersHorizontal size={18} />
          Filters
        </button>

        <button
          onClick={onAddCustomer}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Customer
        </button>
        
<button
  onClick={onToggleDrag}
  className={`rounded-lg px-4 py-2.5 text-white transition ${
    dragEnabled
      ? "bg-green-600 hover:bg-green-700"
      : "border border-slate-700 hover:bg-slate-800"
  }`}
>
  {dragEnabled
    ? "Finish Reordering"
    : "Reorder Customers"}
</button>


      </div>
    </div>
  
  );
}