"use client";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface CustomerPaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;

  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export default function CustomerPagination({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
}: CustomerPaginationProps) {
  const start = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;

  const end = Math.min(currentPage * pageSize, totalItems);

  const pages = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div className="mt-6 flex flex-col gap-4 rounded-xl border border-slate-800 bg-slate-900 p-4 md:flex-row md:items-center md:justify-between">
      {/* Left */}

      <div className="text-sm text-slate-400">
        Showing{" "}
        <span className="font-medium text-white">
          {start}-{end}
        </span>{" "}
        of{" "}
        <span className="font-medium text-white">
          {totalItems}
        </span>{" "}
        customers
      </div>

      {/* Right */}

      <div className="flex flex-wrap items-center gap-3">
        {/* Rows per page */}

        <div className="flex items-center gap-2">

          <span className="text-sm text-slate-400">
            Rows
          </span>

          <select
            value={pageSize}
            onChange={(e) =>
              onPageSizeChange(Number(e.target.value))
            }
            className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>

        </div>

        {/* Previous */}

        <button
          disabled={currentPage === 1}
          onClick={() =>
            onPageChange(currentPage - 1)
          }
          className="flex items-center gap-1 rounded-lg border border-slate-700 px-3 py-2 text-sm text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={16} />
          Previous
        </button>

        {/* Page Numbers */}

        <div className="flex items-center gap-2">
          {pages.map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`h-9 w-9 rounded-lg text-sm font-medium transition ${
                page === currentPage
                  ? "bg-blue-600 text-white"
                  : "border border-slate-700 text-slate-300 hover:bg-slate-800"
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Next */}

        <button
          disabled={currentPage === totalPages}
          onClick={() =>
            onPageChange(currentPage + 1)
          }
          className="flex items-center gap-1 rounded-lg border border-slate-700 px-3 py-2 text-sm text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}