"use client";

interface TextFilterProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export default function TextFilter({
  label,
  placeholder,
  value,
  onChange,
}: TextFilterProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-300">
        {label}
      </label>

      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-white placeholder:text-slate-500 outline-none transition focus:border-blue-500"
      />
    </div>
  );
}