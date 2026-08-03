"use client";

import { useMemo, useState } from "react";
import { Check, Search, X } from "lucide-react";

interface CompanyFilterProps {
  companies: string[];
  value: string[];
  onChange: (companies: string[]) => void;
}

export default function CompanyFilter({
  companies,
  value,
  onChange,
}: CompanyFilterProps) {
  const [search, setSearch] = useState("");

  const filteredCompanies = useMemo(() => {
    return companies.filter((company) =>
      company.toLowerCase().includes(search.toLowerCase())
    );
  }, [companies, search]);

  const toggleCompany = (company: string) => {
    if (value.includes(company)) {
      onChange(value.filter((item) => item !== company));
    } else {
      onChange([...value, company]);
    }
  };

  const removeCompany = (company: string) => {
    onChange(value.filter((item) => item !== company));
  };

  return (
    <div className="space-y-4">
      {/* Search */}

      <div className="relative">
        <Search
          size={16}
          className="absolute left-3 top-3 text-slate-500"
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search company..."
          className="w-full rounded-lg border border-slate-700 bg-slate-900 py-2.5 pl-9 pr-4 text-sm text-white outline-none focus:border-blue-500"
        />
      </div>

      {/* Selected */}

      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((company) => (
            <div
              key={company}
              className="flex items-center gap-2 rounded-full bg-blue-600 px-3 py-1 text-xs text-white"
            >
              {company}

              <button
                onClick={() => removeCompany(company)}
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Company List */}

      <div className="max-h-64 space-y-2 overflow-y-auto rounded-lg border border-slate-800 p-2">

        {filteredCompanies.map((company) => {
          const selected = value.includes(company);

          return (
            <button
              key={company}
              onClick={() => toggleCompany(company)}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2 transition ${
                selected
                  ? "bg-blue-600 text-white"
                  : "hover:bg-slate-800"
              }`}
            >
              <span>{company}</span>

              {selected && <Check size={16} />}
            </button>
          );
        })}

      </div>
    </div>
  );
}