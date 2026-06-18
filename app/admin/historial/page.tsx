"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface Visita {
  id_visita: number;
  sede: string;
  curso: string;
  fecha: string;
  ciclo: string;
  controlDocente: { nombre_docente: string; apellido_docente: string } | null;
}

export default function HistorialPage() {
  const [visitas, setVisitas] = useState<Visita[]>([]);
  const [filtros, setFiltros] = useState({
    ciclo: "todos",
    docente: "",
  });

  const fetchVisitas = async () => {
    // Ajuste de query: solo enviamos los filtros activos
    const query = new URLSearchParams(filtros as any).toString();
    const res = await fetch(`/api/visitas?${query}`);
    const data = await res.json();
    setVisitas(data);
  };

  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.text("Historial de Visitas", 14, 15);
    autoTable(doc, {
      startY: 20,
      head: [["Fecha", "Sede", "Curso", "Docente"]],
      body: visitas.map((v) => [
        new Date(v.fecha).toLocaleDateString(),
        v.sede,
        v.curso,
        v.controlDocente
          ? `${v.controlDocente.nombre_docente} ${v.controlDocente.apellido_docente}`
          : "N/A",
      ]),
    });
    doc.save("historial-visitas.pdf");
  };

  useEffect(() => {
    fetchVisitas();
  }, [filtros]);

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="p-8 w-full bg-[#eaeaea]">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Historial de Visitas
          </h1>
          <p className="text-sm text-gray-500">
            Consulta y seguimiento de todas las visitas registradas.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-500 uppercase">
              Ciclo
            </label>
            <select
              className="border border-gray-300 p-2 rounded-lg text-sm focus:ring-2 focus:ring-black focus:border-black outline-none bg-white"
              onChange={(e) =>
                setFiltros({ ...filtros, ciclo: e.target.value })
              }
              value={filtros.ciclo}
            >
              <option value="todos">Todos los ciclos</option>
              <option value="2026-1">2026 - Ciclo 1 Marzo</option>
              <option value="2026-2">2026 - Ciclo 2 Agosto</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-500 uppercase">
              Docente
            </label>
            <input
              type="text"
              placeholder="Buscar por apellido..."
              className="border border-gray-300 p-2 rounded-lg text-sm focus:ring-2 focus:ring-black focus:border-black outline-none"
              onChange={(e) =>
                setFiltros({ ...filtros, docente: e.target.value })
              }
            />
          </div>
        </div>

        <div className="flex justify-end mb-8">
          <button
            onClick={exportarPDF}
            className="bg-black text-white px-4 py-2 rounded-lg font-semibold hover:opacity-80 transition"
          >
            Exportar en PDF
          </button>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-black">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Sede
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Curso
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Docente
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {visitas.map((v) => (
                <tr
                  key={v.id_visita}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {new Date(v.fecha).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {v.sede}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {v.curso}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {v.controlDocente
                      ? `${v.controlDocente.nombre_docente} ${v.controlDocente.apellido_docente}`
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                    <a
                      href={`/admin/historial/${v.id_visita}`}
                      className="text-black font-medium hover:underline px-3 py-1 bg-gray-100 rounded-md"
                    >
                      Ver detalle
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
