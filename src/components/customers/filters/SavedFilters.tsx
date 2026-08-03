"use client";

import { Bookmark, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CustomerFilters } from "@/app/types/customer-filter";

export interface SavedFilter {
  id: string;
  name: string;
  filters: CustomerFilters;
}

interface SavedFiltersProps {
  filters: SavedFilter[];
  onSelect: (filter: SavedFilter) => void;
  onDelete: (id: string) => void;
  onSaveCurrent: () => void;
}

export default function SavedFilters({
  filters,
  onSelect,
  onDelete,
  onSaveCurrent,
}: SavedFiltersProps) {
  return (
    <div className="space-y-4">
      {/* Save Current */}

      {/* <Button
        className="w-full"
        onClick={onSaveCurrent}
      >
        Save Current Filter
      </Button> */}

      {/* Empty State */}

      {filters.length === 0 && (
        <div className="rounded-lg border border-dashed border-slate-700 py-8 text-center text-sm text-slate-500">
          No saved filters yet.
        </div>
      )}

      {/* Saved Filters */}

      <div className="space-y-2">

        {filters.map((filter) => (
          <div
            key={filter.id}
            className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900 p-3"
          >
            <button
              onClick={() => onSelect(filter)}
              className="flex flex-1 items-center gap-3 text-left"
            >
              <Bookmark
                size={18}
                className="text-yellow-400"
              />

              <span className="text-sm text-white">
                {filter.name}
              </span>
            </button>

            <button
              onClick={() => onDelete(filter.id)}
              className="rounded-md p-2 text-slate-400 transition hover:bg-slate-800 hover:text-red-500"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}

      </div>
    </div>
  );
}