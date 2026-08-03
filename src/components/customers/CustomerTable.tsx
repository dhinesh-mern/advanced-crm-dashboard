import { Customer } from "../../app/types/customer";
import CustomerRow from "./CustomerRow";
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

import {
  DndContext,
  closestCenter,
  DragEndEvent,
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

interface CustomerTableProps {
  customers: Customer[];

  sortBy: "name" | "email" | "lastContact";

  sortOrder: "asc" | "desc";

  onSort: (field: "name" | "email" | "lastContact") => void;


  onRowClick: (customer: Customer) => void;

    onEdit: (customer: Customer) => void;

  onDelete: (customer: Customer) => void;

  onDragEnd: (event: DragEndEvent) => void;

  dragEnabled: boolean;
}

export default function CustomerTable({
  customers,
  sortBy,
  sortOrder,
  onSort,  onRowClick,
    onEdit,
  onDelete,
    onDragEnd,
    dragEnabled,
}: CustomerTableProps) {
  const renderSortIcon = (
    field: "name" | "email" | "lastContact"
  ) => {
    if (sortBy !== field) {
      return (
        <ArrowUpDown
          size={15}
          className="text-slate-500"
        />
      );
    }

    return sortOrder === "asc" ? (
      <ArrowUp
        size={15}
        className="text-blue-500"
      />
    ) : (
      <ArrowDown
        size={15}
        className="text-blue-500"
      />
    );
  };

  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
<DndContext
  collisionDetection={closestCenter}
  onDragEnd={onDragEnd}
>
      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="border-b border-slate-800 bg-slate-950">

            <tr>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">

<button
  disabled={dragEnabled}
  onClick={() => onSort("name")}
  className="flex items-center gap-2 disabled:cursor-not-allowed disabled:opacity-40"
>
                  Name
                  {renderSortIcon("name")}
                </button>

              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">

<button
  disabled={dragEnabled}
  onClick={() => onSort("email")}
  className="flex items-center gap-2 disabled:cursor-not-allowed disabled:opacity-40"
>
                  Email
                  {renderSortIcon("email")}
                </button>

              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                Phone
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                Company
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                Status
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">

<button
  disabled={dragEnabled}
  onClick={() => onSort("lastContact")}
  className="flex items-center gap-2 disabled:cursor-not-allowed disabled:opacity-40"
>
                  Last Contact
                  {renderSortIcon("lastContact")}
                </button>

              </th>

              <th className="w-24 px-6 py-4 text-center text-sm font-semibold text-slate-300">
                Actions
              </th>

            </tr>

          </thead>

<SortableContext
  items={customers.map((customer) => customer.id)}
  strategy={verticalListSortingStrategy}
>
          <tbody>

            {customers.length > 0 ? (
              customers.map((customer) => (
<CustomerRow
  key={customer.id}
  customer={customer}
  onClick={() => onRowClick(customer)}
    onEdit={() => onEdit(customer)}
  onDelete={() => onDelete(customer)}
  dragEnabled={dragEnabled}
/>
              ))
            ) : (
              <tr>

                <td
                  colSpan={7}
                  className="py-12 text-center text-slate-500"
                >
                  No customers found.
                </td>

              </tr>
            )}

          </tbody>


</SortableContext>

        </table>

      </div>

</DndContext>


    </div>
  );
}