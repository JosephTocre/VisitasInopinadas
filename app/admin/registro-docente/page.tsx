"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { PageHeader } from "@/components/ui/PageHeader";
import { ReusableTable } from "@/components/ui/ReusableTable";
import { DynamicForm, FieldConfig } from "@/components/ui/DynamicForm"; // Assuming DynamicForm is in this path
import Swal from "sweetalert2";

const camposDocente: FieldConfig[] = [
  { name: "nombre_docente", label: "Nombre", type: "text" },
  { name: "apellido_docente", label: "Apellidos", type: "text" },
];

export default function RegistroDocentePage() {
  const [formData, setFormData] = useState({
    nombre_docente: "",
    apellido_docente: "",
  });

  const [editingId, setEditingId] = useState<number | null>(null);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [docentes, setDocentes] = useState([]);

  const fetchDocentes = async () => {
    setIsLoading(true);

    const res = await fetch("/api/docentes");

    if (!res.ok) {
      console.error("Error al cargar docentes:", await res.text());
      setIsLoading(false);
      return;
    }

    const data = await res.json();
    setDocentes(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchDocentes();
  }, []);

  const registrarDocente = async (e: React.FormEvent) => {
    e.preventDefault();

    setMensaje("");
    setError("");

    try {
      const url = editingId ? `/api/docentes/${editingId}` : "/api/docentes";
      const method = editingId ? "PUT" : "POST";

      const respuesta = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(data.error || "Error al procesar la solicitud");
      }

      setMensaje(
        editingId
          ? "Docente actualizado correctamente"
          : "Docente registrado correctamente",
      );

      setFormData({
        nombre_docente: "",
        apellido_docente: "",
      });
      setEditingId(null);
      fetchDocentes();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Error inesperado");
    }
  };

  const editarDocente = (docente: any) => {
    setEditingId(docente.id_docente);
    setFormData({
      nombre_docente: docente.nombre_docente,
      apellido_docente: docente.apellido_docente,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const eliminarDocente = async (id: number) => {
    const result = await Swal.fire({
      title: "¿Eliminar docente?",
      text: "Esta acción desactivará al docente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`/api/docentes/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Error al eliminar");
      }

      await Swal.fire({
        title: "¡Eliminado!",
        text: "El docente fue eliminado correctamente.",
        icon: "success",
        timer: 1800,
        showConfirmButton: false,
      });

      fetchDocentes();
    } catch (error) {
      await Swal.fire({
        title: "Error",
        text: "No se pudo eliminar el docente.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  const cancelarEdicion = () => {
    setEditingId(null);
    setFormData({
      nombre_docente: "",
      apellido_docente: "",
    });
  };

  return (
    <div className="flex min-h-screen bg-[#f5f5f5]">
      <AdminSidebar />

      <div className="w-px bg-gray-300" />

      <main className="p-8 w-full">
        <PageHeader
          title="Registro de docentes"
          description="Crea nuevos registros de docentes en el sistema."
        />

        <DynamicForm
          title={editingId ? "Editar docente" : "Información del docente"}
          description={
            editingId
              ? "Modifique los datos del docente."
              : "Complete los datos para registrar un nuevo docente."
          }
          fields={camposDocente}
          formData={formData}
          setFormData={setFormData}
          onSubmit={registrarDocente}
          onCancel={editingId ? cancelarEdicion : undefined}
          submitButtonText={editingId ? "Actualizar docente" : "Crear docente"}
          mensaje={mensaje}
          error={error}
        />

        <div className="mt-8">
          <ReusableTable
            columns={[
              {
                header: "Nombre",
                accessor: (d: any) =>
                  `${d.nombre_docente} ${d.apellido_docente}`,
              },
              {
                header: "Acciones",
                accessor: (d: any) => (
                  <div className="flex gap-2">
                    <button
                      onClick={() => editarDocente(d)}
                      className="text-sm text-blue-600 hover:underline px-3 py-1 bg-blue-50 rounded-md"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => eliminarDocente(d.id_docente)}
                      className="text-sm text-red-600 hover:underline px-3 py-1 bg-red-50 rounded-md"
                    >
                      Eliminar
                    </button>
                  </div>
                ),
              },
            ]}
            data={docentes}
            isLoading={isLoading}
          />
        </div>
      </main>
    </div>
  );
}
