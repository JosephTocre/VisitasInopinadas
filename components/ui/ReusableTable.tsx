import React from "react";

interface ReusableTableProps<T> {
  columns: {
    header: string;
    accessor: (item: T) => React.ReactNode;
    align?: "left" | "center" | "right";
    width?: string;
  }[];
  data: T[];
  isLoading?: boolean;
  emptyMessage?: string;
}

export function ReusableTable<T>({
  columns,
  data,
  isLoading,
  emptyMessage = "No se encontraron visitas registradas para los filtros seleccionados.",
}: ReusableTableProps<T>) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <table className="min-w-full">
        <thead className="bg-black">
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className={`
  px-6 py-3 text-xs font-semibold text-white uppercase tracking-wider
  ${col.align === "right"
                    ? "text-right"
                    : col.align === "center"
                      ? "text-center"
                      : "text-left"}
`}
                style={col.width ? { width: col.width } : undefined}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {isLoading ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-10 text-center text-sm text-gray-500"
              >
                Cargando...
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-10 text-center text-sm text-gray-500"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((item, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50 transition-colors">
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className={`
  px-6 py-4 whitespace-nowrap text-sm text-gray-700
  ${col.align === "right"
                        ? "text-right"
                        : col.align === "center"
                          ? "text-center"
                          : "text-left"}
`}
                    style={col.width ? { width: col.width } : undefined}
                  >
                    {col.accessor(item)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
