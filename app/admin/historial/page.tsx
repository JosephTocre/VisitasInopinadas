"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { PageHeader } from "@/components/ui/PageHeader";
import { ReusableTable } from "@/components/ui/ReusableTable";
import { Pagination } from "@/components/ui/Pagination";
import { DetalleVisitaModal } from "@/components/DetalleVisitaModal";
import { ExportButton } from "@/components/ExportButton";
import { FilterBar } from "@/components/ui/FilterBar";

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
  const [pagina, setPagina] = useState(1); // Nuevo estado
  const [meta, setMeta] = useState({ totalPages: 1 }); // Nuevo estado para controlar paginación
  const [visitaSeleccionada, setVisitaSeleccionada] = useState<any>(null);

  const formatField = (
    value: any,
    formatter?: (val: any) => string,
    useCumpleFormat = false,
  ) => {
    // Cambiamos a esta validación para permitir 'false' y '0'
    if (value === null || value === undefined || value === "") {
      return <span className="text-gray-400 italic">N/A</span>;
    }

    // Si el valor es booleano, lo convertimos a texto explícito
    if (typeof value === "boolean") {
      if (useCumpleFormat) {
        return value ? "Cumple" : "No cumple";
      }
      return value ? "Sí" : "No";
    }

    // Si es string, capitalizar la primera letra y poner el resto en minúscula
    if (typeof value === "string") {
      return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }

    return formatter ? formatter(value) : value;
  };

  const formatTime = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);

    // Validamos si la fecha es válida
    if (isNaN(date.getTime())) return "N/A";

    return date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // Cambia a false si prefieres formato 24h
    });
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    // Validamos si la fecha es realmente válida
    if (isNaN(date.getTime())) return "Fecha inválida";

    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const fetchVisitas = async () => {
    // Combinamos filtros + página
    const query = new URLSearchParams({
      ...filtros,
      page: pagina.toString(),
    }).toString();

    const res = await fetch(`/api/visitas?${query}`);
    const data = await res.json();

    // Ajustado a la nueva estructura: { data, meta }
    setVisitas(data.data);
    setMeta(data.meta);
  };

  const abrirDetalle = async (id: number) => {
    const res = await fetch(`/api/visitas/${id}`);
    const data = await res.json();
    setVisitaSeleccionada(data);
  };

  // Reiniciar a la página 1 cuando cambien los filtros
  useEffect(() => {
    setPagina(1);
  }, [filtros]);

  useEffect(() => {
    fetchVisitas();
  }, [filtros, pagina]); // Dependemos de filtros y página

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="p-8 w-full bg-[#eaeaea]">
        <PageHeader
          title="Historial de Visitas"
          description="Consulta y seguimiento de todas las visitas registradas."
        />

        <FilterBar
          fields={[
            {
              label: "Ciclo",
              key: "ciclo",
              type: "select",
              options: [
                { value: "todos", label: "Todos los ciclos" },
                { value: "2026-1", label: "2026 - Ciclo 1 Marzo" },
                { value: "2026-2", label: "2026 - Ciclo 2 Agosto" },
              ],
            },
            {
              label: "Docente",
              key: "docente",
              type: "text",
              placeholder: "Buscar por apellido...",
            },
          ]}
          values={filtros}
          onChange={(newValues) =>
            setFiltros({
              ciclo: newValues.ciclo ?? filtros.ciclo,
              docente: newValues.docente ?? filtros.docente,
            })
          }
        />

        <div className="flex justify-end mb-8">
          <ExportButton
            data={visitas}
            title="Historial de Visitas"
            filename="historial-visitas"
          />
        </div>

        <ReusableTable
          columns={[
            {
              header: "Fecha",
              accessor: (v) => new Date(v.fecha).toLocaleDateString(),
            },
            { header: "Sede", accessor: (v) => v.sede },
            { header: "Curso", accessor: (v) => v.curso },
            {
              header: "Docente",
              accessor: (v) =>
                v.controlDocente
                  ? `${v.controlDocente.nombre_docente} ${v.controlDocente.apellido_docente}`
                  : "N/A",
            },
            {
              header: "Acciones",
              accessor: (v) => (
                <button
                  onClick={() => abrirDetalle(v.id_visita)}
                  className="text-black font-medium hover:underline px-3 py-1 bg-gray-100 rounded-md"
                >
                  Detalle
                </button>
              ),
            },
          ]}
          data={visitas}
        />

        {/* Controles de Paginación */}
        <Pagination
          currentPage={pagina}
          totalPages={meta.totalPages}
          onPageChange={setPagina}
        />

        {/* Modal de Detalle */}
        {visitaSeleccionada && (
          <DetalleVisitaModal
            visita={visitaSeleccionada}
            onClose={() => setVisitaSeleccionada(null)}
            formatDate={formatDate}
            formatTime={formatTime}
            formatField={formatField}
          />
        )}
      </main>
    </div>
  );
}
