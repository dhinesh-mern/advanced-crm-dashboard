"use client";

import { Checkbox } from "@/components/ui/checkbox";

const STATUS_OPTIONS = [
  "Active",
  "Inactive",
];

interface StatusFilterProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export default function StatusFilter({
  value,
  onChange,
}: StatusFilterProps) {
  const toggleStatus = (status: string) => {
    if (value.includes(status)) {
      onChange(value.filter((item) => item !== status));
    } else {
      onChange([...value, status]);
    }
  };

  return (
    <div className="space-y-4">
      {STATUS_OPTIONS.map((status) => (
        <div
          key={status}
          className="flex items-center justify-between rounded-lg border border-slate-800 p-3 hover:bg-slate-900 transition-colors"
        >
          <label
            htmlFor={status}
            className="cursor-pointer text-sm text-white"
          >
            {status}
          </label>

          <Checkbox
            id={status}
            checked={value.includes(status)}
            onCheckedChange={() => toggleStatus(status)}
          />
        </div>
      ))}
    </div>
  );
}