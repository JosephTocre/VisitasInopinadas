import React from "react";

interface FilterField {
  label: string;
  key: string;
  type: "select" | "text";
  options?: { value: string; label: string }[];
  placeholder?: string;
}

interface FilterBarProps {
  fields: FilterField[];
  values: Record<string, string>;
  onChange: (newValues: Record<string, string>) => void;
}

export function FilterBar({ fields, values, onChange }: FilterBarProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
      {fields.map((field) => (
        <div key={field.key} className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500 uppercase">
            {field.label}
          </label>
          {field.type === 'select' ? (
            <select
              className="border border-gray-300 p-2 rounded-lg text-sm focus:ring-2 focus:ring-black focus:border-black outline-none bg-white"
              onChange={(e) => onChange({ ...values, [field.key]: e.target.value })}
              value={values[field.key] || ""}
            >
              {field.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              placeholder={field.placeholder}
              className="border border-gray-300 p-2 rounded-lg text-sm focus:ring-2 focus:ring-black focus:border-black outline-none"
              onChange={(e) => onChange({ ...values, [field.key]: e.target.value })}
              value={values[field.key] ?? ""}
            />
          )}
        </div>
      ))}
    </div>
  );
}
