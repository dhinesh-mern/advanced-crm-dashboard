import { Customer } from "../../app/types/customer";
import StatusBadge from "./StatusBadge";
import { Pencil, Trash2 } from "lucide-react";
import CustomerActions from "./CustomerActions";


import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  customer: Customer;
  onClick: () => void;

  onEdit: () => void;
  onDelete: () => void;

  dragEnabled: boolean;
}



export default function CustomerRow({
  customer,
  onClick,
  onEdit,
  onDelete,
  dragEnabled,
}: Props) {

  const {
  attributes,
  listeners,
  setNodeRef,
  transform,
  transition,
} = useSortable({
  id: customer.id,
});

const style = {
  transform: CSS.Transform.toString(transform),
  transition,
};


  return (
<tr
    ref={setNodeRef}
    style={style}
    {...attributes}
    {...(dragEnabled ? listeners : {})}
  onClick={onClick}
  className="cursor-pointer border-b border-slate-800 transition-colors hover:bg-slate-800/40"
>

      <td className="px-6 py-4">
        <div className="flex items-center gap-3">

          <img
            src={customer.avatar}
            alt={customer.name}
            className="h-10 w-10 rounded-full"
          />

          <span className="font-medium text-white">
            {customer.name}
          </span>

        </div>
      </td>

      <td className="px-6 text-gray-300">
        {customer.email}
      </td>

      <td className="px-6 text-gray-300">
        {customer.phone}
      </td>

      <td className="px-6 text-gray-300">
        {customer.company}
      </td>

      <td className="px-6">
        <StatusBadge status={customer.status} />
      </td>

      <td className="px-6 text-gray-300">
        {customer.lastContact}
      </td>

<td
  className="px-6"
  onClick={(e) => e.stopPropagation()}
>
<CustomerActions
  onEdit={onEdit}
  onDelete={onDelete}
/>
</td>

    </tr>
  );
}