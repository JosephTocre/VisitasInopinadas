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
  sede: {
    nombre: string;
  };

  curso: {
    nombre: string;
  };
  fecha: string;

  controlDocente?: {
    docente?: {
      nombre_docente: string;
      apellido_docente: string;
    };
  } | null;

  usuario: {
    nombre: string;
    apellidos: string;
  } | null;
}

export default function HistorialPage() {
  const [visitas, setVisitas] = useState<Visita[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filtros, setFiltros] = useState({
    fechaInicio: "",
    fechaFin: "",
    docente: "",
  });
  const [pagina, setPagina] = useState(1); // Nuevo estado
  const [meta, setMeta] = useState({ totalPages: 1 }); // Nuevo estado para controlar paginación
  const [visitaSeleccionada, setVisitaSeleccionada] = useState<any>(null);

  const fetchVisitas = async () => {
    const token = localStorage.getItem("token"); // Aquí sí puedes leerlo

    setIsLoading(true);
    // Construimos los parámetros de búsqueda, ignorando valores vacíos
    const params: any = { page: pagina.toString() };
    if (filtros.fechaInicio) params.fechaInicio = filtros.fechaInicio;
    if (filtros.fechaFin) params.fechaFin = filtros.fechaFin;
    if (filtros.docente.trim() !== "") params.docente = filtros.docente;

    const query = new URLSearchParams(params).toString();

    const res = await fetch(`/api/visitas?${query}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Envías el token aquí
      },
    });

    if (!res.ok) {
      console.error("Error al cargar visitas:", await res.text());
      setIsLoading(false);
      return;
    }

    const data = await res.json();

    // Ajustado a la nueva estructura: { data, meta }
    setVisitas(data.data || []);
    setMeta(data.meta || { totalPages: 1 });
    setIsLoading(false);
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
    <div className="min-h-screen bg-[#f5f5f5] flex">
      <AdminSidebar />
      <div className="w-px bg-gray-300" />
      <main className="p-8 w-full">
        <PageHeader
          title="Historial de Visitas"
          description="Consulta y seguimiento de todas las visitas registradas."
        />

        <FilterBar
          fields={[
            {
              label: "Fecha Inicio",
              key: "fechaInicio",
              type: "date",
            },
            {
              label: "Fecha Fin",
              key: "fechaFin",
              type: "date",
            },
            {
              label: "Docente",
              key: "docente",
              type: "text",
            },
          ]}
          values={filtros}
          onChange={(newValues) =>
            setFiltros({
              ...filtros,
              ...newValues,
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
            {
              header: "Sede",
              accessor: (v) => v.sede?.nombre ?? "-",
            },
            {
              header: "Curso",
              accessor: (v) => v.curso?.nombre ?? "-",
            },
            {
              header: "Inspector",
              accessor: (v) =>
                v.usuario
                  ? `${v.usuario.nombre} ${v.usuario.apellidos}`
                  : "N/A",
            },
            {
              header: "Docente",
              accessor: (v) =>
                v.controlDocente?.docente
                  ? `${v.controlDocente.docente.nombre_docente} ${v.controlDocente.docente.apellido_docente}`
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
          isLoading={isLoading}
        />

        {/* Controles de Paginación */}
        {visitas.length > 0 && (
          <Pagination
            currentPage={pagina}
            totalPages={meta?.totalPages || 1}
            onPageChange={setPagina}
          />
        )}

        {/* Modal de Detalle */}
        {visitaSeleccionada && (
          <DetalleVisitaModal
            visita={visitaSeleccionada}
            onClose={() => setVisitaSeleccionada(null)}
          />
        )}
      </main>
    </div>
  );
}
