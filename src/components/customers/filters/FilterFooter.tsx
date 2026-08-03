"use client";

import { Button } from "@/components/ui/button";

interface FilterFooterProps {
  activeFilterCount: number;
  onApply: () => void;
  onClear: () => void;
}

export default function FilterFooter({
  activeFilterCount,
  onApply,
  onClear,
}: FilterFooterProps) {
  return (
    <div className="sticky bottom-0 mt-8 border-t border-slate-800 bg-slate-950 p-4">
      {/* Active Filter Count */}

      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm text-slate-400">
          Active Filters
        </span>

        <span className="rounded-full bg-blue-600 px-2.5 py-1 text-xs font-medium text-white">
          {activeFilterCount}
        </span>
      </div>

      {/* Buttons */}

      <div className="flex gap-3">
<Button
  variant="outline"
  onClick={onClear}
  className="flex-1 border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white"
>
  Clear All
</Button>

        <Button
          className="flex-1"
          onClick={onApply}
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
}