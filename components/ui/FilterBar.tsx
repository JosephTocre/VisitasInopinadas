import React from "react";

interface FilterField {
  label: string;
  key: string;
  type: "select" | "text" | "date";
  options?: { value: string; label: string }[];
  placeholder?: string;
}

interface FilterBarProps {
  fields: FilterField[];
  values: Record<string, string>;
  onChange: (newValues: Record<string, string>) => void;
  children?: React.ReactNode;
  title?: string;

  showTodayButton?: boolean;
}

export function FilterBar({
  fields,
  values,
  onChange,
  children,
  title,
  showTodayButton = false,
}: FilterBarProps) {
  const aplicarHoy = () => {
    const hoy = new Date();

    const manana = new Date(hoy);
    manana.setDate(manana.getDate() + 1);

    onChange({
      fechaInicio: hoy.toISOString().split("T")[0],
      fechaFin: manana.toISOString().split("T")[0],
    });
  };
  return (
    <div className="flex flex-wrap gap-4 mb-8 bg-white p-4 rounded-xl border border-gray-200 shadow-sm items-end">
      {title && (
        <div className="w-full text-xl font-bold text-gray-700">{title}</div>
      )}
      {fields.map((field) => (
        <div
          key={field.key}
          className="flex flex-col gap-1 w-full md:w-auto md:flex-1"
        >
          <label className="text-xs font-semibold text-gray-500 uppercase">
            {field.label}
          </label>
          {field.type === "select" ? (
            <select
              className="border border-gray-300 p-2 rounded-lg text-sm focus:ring-2 focus:ring-black focus:border-black outline-none bg-white"
              onChange={(e) => onChange({ [field.key]: e.target.value })}
              value={values[field.key] || ""}
            >
              {field.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : field.type === "date" ? (
            <input
              type="date"
              className="border border-gray-300 p-2 rounded-lg text-sm focus:ring-2 focus:ring-black focus:border-black outline-none"
              onChange={(e) => onChange({ [field.key]: e.target.value })}
              value={values[field.key] || ""}
            />
          ) : (
            <input
              type="text"
              placeholder={field.placeholder}
              className="border border-gray-300 p-2 rounded-lg text-sm focus:ring-2 focus:ring-black focus:border-black outline-none"
              onChange={(e) => onChange({ [field.key]: e.target.value })}
              value={values[field.key] || ""}
            />
          )}
        </div>
      ))}
      {showTodayButton && (
        <div className="flex h-full items-end">
          <button
            type="button"
            onClick={aplicarHoy}
            className="bg-black text-white px-4 py-2 rounded-lg font-semibold hover:opacity-80 transition"
          >
            Hoy
          </button>
        </div>
      )}
      {children}
    </div>
  );
}
