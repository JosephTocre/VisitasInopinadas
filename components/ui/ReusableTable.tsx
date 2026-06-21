import React from 'react';

interface ReusableTableProps<T> {
  columns: { header: string; accessor: (item: T) => React.ReactNode }[];
  data: T[];
}

export function ReusableTable<T>({ columns, data }: ReusableTableProps<T>) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <table className="min-w-full">
        <thead className="bg-black">
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((item, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50 transition-colors">
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {col.accessor(item)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
