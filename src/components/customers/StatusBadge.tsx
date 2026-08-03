interface StatusBadgeProps {
  status: "Active" | "Inactive";
}

export default function StatusBadge({
  status,
}: StatusBadgeProps) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium
      ${
        status === "Active"
          ? "bg-green-500/20 text-green-400"
          : "bg-red-500/20 text-red-400"
      }`}
    >
      {status}
    </span>
  );
}