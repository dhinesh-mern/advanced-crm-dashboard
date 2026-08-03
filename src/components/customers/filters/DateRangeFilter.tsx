"use client";

interface DateRangeFilterProps {
  fromDate: string;
  toDate: string;
  onFromDateChange: (date: string) => void;
  onToDateChange: (date: string) => void;
}

export default function DateRangeFilter({
  fromDate,
  toDate,
  onFromDateChange,
  onToDateChange,
}: DateRangeFilterProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* From */}

      <div className="space-y-2">
        <label className="text-xs font-medium uppercase tracking-wide text-slate-400">
          From
        </label>

        <input
          type="date"
          value={fromDate}
          onChange={(e) => onFromDateChange(e.target.value)}
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-white outline-none transition focus:border-blue-500"
        />
      </div>

      {/* To */}

      <div className="space-y-2">
        <label className="text-xs font-medium uppercase tracking-wide text-slate-400">
          To
        </label>

        <input
          type="date"
          value={toDate}
          onChange={(e) => onToDateChange(e.target.value)}
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-white outline-none transition focus:border-blue-500"
        />
      </div>
    </div>
  );
}