"use client";

import { Pencil, Trash2 } from "lucide-react";

interface CustomerActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export default function CustomerActions({
  onEdit,
  onDelete,
}: CustomerActionsProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={onEdit}
        className="rounded-md p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-blue-400"
        aria-label="Edit customer"
      >
        <Pencil size={18} />
      </button>

      <button
        onClick={onDelete}
        className="rounded-md p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-red-500"
        aria-label="Delete customer"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}