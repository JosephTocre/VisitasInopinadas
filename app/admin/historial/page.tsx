"use client";

import { useCallback, useEffect, useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { PageHeader } from "@/components/ui/PageHeader";
import { ReusableTable } from "@/components/ui/ReusableTable";
import { Pagination } from "@/components/ui/Pagination";
import { DetalleVisitaModal } from "@/components/DetalleVisitaModal";
import { ExportButton } from "@/components/ExportButton";
import { FilterBar } from "@/components/ui/FilterBar";

interface Visita {
  id_visita: number;
  sede: { nombre: string };
  curso: { nombre: string };
  fecha: string;
  periodo: string;
  controlDocente: {
    docente: { nombre_docente: string; apellido_docente: string };
  } | null;
  usuario: { nombre: string; apellidos: string } | null;
}

export default function HistorialPage() {
  const [visitas, setVisitas] = useState<Visita[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filtros, setFiltros] = useState({
    periodo: "todos",
    docente: "",
    sede: "todos",
    curso: "todos",
  });
  const [pagina, setPagina] = useState(1);
  const [meta, setMeta] = useState({ total: 0, totalPages: 1 });
  const [sedes, setSedes] = useState<string[]>([]);
  const [cursos, setCursos] = useState<string[]>([]);
  const [visitaSeleccionada, setVisitaSeleccionada] = useState<Record<
    string,
    unknown
  > | null>(null);

  const fetchFiltros = useCallback(async (periodo?: string) => {
    const token = localStorage.getItem("token");

    const params = new URLSearchParams({ mode: "filtros" });
    if (periodo && periodo !== "todos") params.append("periodo", periodo);

    const res = await fetch(`/api/visitas?${params.toString()}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      return;
    }

    const text = await res.text();
    if (!text || text.trim() === "") {
      return;
    }

    try {
      const data = JSON.parse(text);
      setSedes(data.sedes || []);
      setCursos(data.cursos || []);

      setFiltros((prev) => ({
        ...prev,
        sede:
          prev.sede === "todos" || data.sedes.includes(prev.sede)
            ? prev.sede
            : "todos",
        curso:
          prev.curso === "todos" || data.cursos.includes(prev.curso)
            ? prev.curso
            : "todos",
      }));
    } catch (e) {
      console.error("Error al procesar respuesta de filtros:", e);
    }
  }, []);

  useEffect(() => {
    fetchFiltros(filtros.periodo);
  }, [filtros.periodo, fetchFiltros]);

  const fetchVisitas = async () => {
    const token = localStorage.getItem("token");

    setIsLoading(true);
    // Construimos los parámetros de búsqueda, ignorando valores vacíos
    const params: Record<string, string> = { page: pagina.toString() };
    if (filtros.periodo !== "todos") params.periodo = filtros.periodo;
    if (filtros.docente.trim() !== "") params.docente = filtros.docente;
    if (filtros.sede !== "todos") params.sede = filtros.sede;
    if (filtros.curso !== "todos") params.curso = filtros.curso;

    const query = new URLSearchParams(params).toString();

    const res = await fetch(`/api/visitas?${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      console.error("Error al cargar visitas:", await res.text());
      setIsLoading(false);
      return;
    }

    const data = await res.json();

    setVisitas(data.data || []);
    setMeta(data.meta || { totalPages: 1 });
    setIsLoading(false);
  };

  const abrirDetalle = async (id: number) => {
    const res = await fetch(`/api/visitas/${id}`);
    const data = await res.json();
    setVisitaSeleccionada(data);
  };

  useEffect(() => {
    const loadVisitas = async () => {
      await fetchVisitas();
    };

    loadVisitas();
  }, [filtros, pagina]);

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
              label: "Periodo",
              key: "periodo",
              type: "select",
              options: [
                { value: "todos", label: "Todos los periodos" },
                { value: "2026-1", label: "2026 - Ciclo 1 (Marzo - Julio)" },
                {
                  value: "2026-verano",
                  label: "2026 - Ciclo Verano (Enero - Febrero)",
                },
                {
                  value: "2025-2",
                  label: "2025 - Ciclo 2 (Agosto - Diciembre)",
                },
                { value: "2025-1", label: "2025 - Ciclo 1 (Marzo - Julio)" },
                {
                  value: "2025-verano",
                  label: "2025 - Ciclo Verano (Enero - Febrero)",
                },
              ],
            },
            {
              label: "Docente",
              key: "docente",
              type: "text",
              placeholder: "Buscar por apellido...",
            },
            {
              label: "Sede",
              key: "sede",
              type: "select",
              options: [
                { value: "todos", label: "Todas las sedes" },
                ...sedes.map((sede) => ({
                  value: sede,
                  label: sede,
                })),
              ],
            },
            {
              label: "Curso",
              key: "curso",
              type: "select",
              options: [
                { value: "todos", label: "Todos los cursos" },
                ...cursos.map((curso) => ({
                  value: curso,
                  label: curso,
                })),
              ],
            },
          ]}
          values={filtros}
          onChange={(newValues) => {
            setFiltros((prev) => {
              const nuevosFiltros = {
                ...prev,
                ...newValues,
              };

              // Si cambió el periodo, reiniciar filtros dependientes
              if (
                newValues.periodo !== undefined &&
                newValues.periodo !== prev.periodo
              ) {
                nuevosFiltros.sede = "todos";
                nuevosFiltros.curso = "todos";
              }

              return nuevosFiltros;
            });

            setPagina(1);
          }}
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
            { header: "Sede", accessor: (v) => v.sede.nombre },
            { header: "Curso", accessor: (v) => v.curso.nombre },
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
                v.controlDocente
                  ? `${v.controlDocente.docente.nombre_docente} ${v.controlDocente.docente.apellido_docente}`
                  : "N/A",
            },
            {
              header: "Acciones",
              accessor: (v) => (
                <button
                  onClick={() => abrirDetalle(v.id_visita)}
                  className="text-sm text-black-600 hover:underline px-3 py-1 bg-gray-50 rounded-md"
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
