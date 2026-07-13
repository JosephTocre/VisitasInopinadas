"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import AdminSidebar from "@/components/AdminSidebar";
import { PageHeader } from "@/components/ui/PageHeader";
import { DynamicForm, FieldConfig } from "@/components/ui/DynamicForm";
import { ReusableTable } from "@/components/ui/ReusableTable";

interface Sede {
    id_sede: number;
    nombre: string;
}

interface Curso {
    id_curso: number;
    nombre: string;
}

const camposSede: FieldConfig[] = [
    {
        name: "nombre",
        label: "Nombre de la sede",
        type: "text",
    },
];

const camposCurso: FieldConfig[] = [
    {
        name: "nombre",
        label: "Nombre del curso",
        type: "text",
    },
];

export default function GestionAcademicaPage() {
    /* ===============================
        ESTADOS DE SEDES
    =============================== */

    const [sedes, setSedes] = useState<Sede[]>([]);
    const [formSede, setFormSede] = useState({
        nombre: "",
    });

    const [editingSede, setEditingSede] = useState<number | null>(null);

    const [mensajeSede, setMensajeSede] = useState("");
    const [errorSede, setErrorSede] = useState("");

    /* ===============================
        ESTADOS DE CURSOS
    =============================== */

    const [cursos, setCursos] = useState<Curso[]>([]);

    const [formCurso, setFormCurso] = useState({
        nombre: "",
    });

    const [editingCurso, setEditingCurso] = useState<number | null>(null);

    const [mensajeCurso, setMensajeCurso] = useState("");
    const [errorCurso, setErrorCurso] = useState("");

    /* ===============================
        LOADING
    =============================== */

    const [loadingSedes, setLoadingSedes] = useState(false);
    const [loadingCursos, setLoadingCursos] = useState(false);

    /* ===============================
        CARGAR SEDES
    =============================== */

    const fetchSedes = async () => {
        try {
            setLoadingSedes(true);

            const res = await fetch("/api/sedes");

            if (!res.ok) {
                throw new Error("No se pudieron cargar las sedes.");
            }

            const data = await res.json();

            setSedes(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingSedes(false);
        }
    };

    /* ===============================
        CARGAR CURSOS
    =============================== */

    const fetchCursos = async () => {
        try {
            setLoadingCursos(true);

            const res = await fetch("/api/cursos");

            if (!res.ok) {
                throw new Error("No se pudieron cargar los cursos.");
            }

            const data = await res.json();

            setCursos(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingCursos(false);
        }
    };

    /* ===============================
        INICIO
    =============================== */

    useEffect(() => {
        fetchSedes();
        fetchCursos();
    }, []);

    /* =====================================================
    REGISTRAR / ACTUALIZAR SEDE
====================================================== */

    const guardarSede = async (e: React.FormEvent) => {
        e.preventDefault();

        setMensajeSede("");
        setErrorSede("");

        try {
            const url = editingSede
                ? `/api/sedes/${editingSede}`
                : "/api/sedes";

            const method = editingSede ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formSede),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "No se pudo guardar la sede.");
            }

            await Swal.fire({
                icon: "success",
                title: editingSede
                    ? "Sede actualizada"
                    : "Sede registrada",
                timer: 1500,
                showConfirmButton: false,
            });

            setEditingSede(null);

            setFormSede({
                nombre: "",
            });

            fetchSedes();
        } catch (error) {
            setErrorSede(
                error instanceof Error
                    ? error.message
                    : "Error inesperado"
            );
        }
    };

    /* =====================================================
        EDITAR SEDE
    ====================================================== */

    const editarSede = (sede: Sede) => {
        setEditingSede(sede.id_sede);

        setFormSede({
            nombre: sede.nombre,
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    /* =====================================================
        ELIMINAR SEDE
    ====================================================== */

    const eliminarSede = async (id: number) => {
        const result = await Swal.fire({
            title: "¿Eliminar sede?",
            text: "Esta acción no se puede deshacer.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Eliminar",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#d33",
        });

        if (!result.isConfirmed) return;

        try {
            const res = await fetch(`/api/sedes/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                throw new Error();
            }

            await Swal.fire({
                icon: "success",
                title: "Sede eliminada",
                timer: 1500,
                showConfirmButton: false,
            });

            fetchSedes();
        } catch {
            Swal.fire({
                icon: "error",
                title: "No se pudo eliminar la sede",
            });
        }
    };

    /* =====================================================
        REGISTRAR / ACTUALIZAR CURSO
    ====================================================== */

    const guardarCurso = async (e: React.FormEvent) => {
        e.preventDefault();

        setMensajeCurso("");
        setErrorCurso("");

        try {
            const url = editingCurso
                ? `/api/cursos/${editingCurso}`
                : "/api/cursos";

            const method = editingCurso ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formCurso),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "No se pudo guardar el curso.");
            }

            await Swal.fire({
                icon: "success",
                title: editingCurso
                    ? "Curso actualizado"
                    : "Curso registrado",
                timer: 1500,
                showConfirmButton: false,
            });

            setEditingCurso(null);

            setFormCurso({
                nombre: "",
            });

            fetchCursos();
        } catch (error) {
            setErrorCurso(
                error instanceof Error
                    ? error.message
                    : "Error inesperado"
            );
        }
    };

    /* =====================================================
        EDITAR CURSO
    ====================================================== */

    const editarCurso = (curso: Curso) => {
        setEditingCurso(curso.id_curso);

        setFormCurso({
            nombre: curso.nombre,
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    /* =====================================================
        ELIMINAR CURSO
    ====================================================== */

    const eliminarCurso = async (id: number) => {
        const result = await Swal.fire({
            title: "¿Eliminar curso?",
            text: "Esta acción no se puede deshacer.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Eliminar",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#d33",
        });

        if (!result.isConfirmed) return;

        try {
            const res = await fetch(`/api/cursos/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                throw new Error();
            }

            await Swal.fire({
                icon: "success",
                title: "Curso eliminado",
                timer: 1500,
                showConfirmButton: false,
            });

            fetchCursos();
        } catch {
            Swal.fire({
                icon: "error",
                title: "No se pudo eliminar el curso",
            });
        }
    };

    /* =====================================================
        CANCELAR EDICIÓN
    ====================================================== */

    const cancelarEdicionSede = () => {
        setEditingSede(null);

        setFormSede({
            nombre: "",
        });
    };

    const cancelarEdicionCurso = () => {
        setEditingCurso(null);

        setFormCurso({
            nombre: "",
        });
    };

    return (
        <div className="flex min-h-screen bg-[#f5f5f5]">
            <AdminSidebar />

            <div className="w-px bg-gray-300" />

            <main className="p-8 w-full">
                <PageHeader
                    title="Gestión Académica"
                    description="Administre las sedes y los cursos disponibles en el sistema."
                />

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

                    {/* ==================== SEDES ==================== */}

                    <div className="space-y-6">

                        <DynamicForm
                            title={
                                editingSede
                                    ? "Editar sede"
                                    : "Registrar sede"
                            }
                            description={
                                editingSede
                                    ? "Modifique el nombre de la sede."
                                    : "Complete la información para registrar una nueva sede."
                            }
                            fields={camposSede}
                            formData={formSede}
                            setFormData={setFormSede}
                            onSubmit={guardarSede}
                            onCancel={
                                editingSede
                                    ? cancelarEdicionSede
                                    : undefined
                            }
                            submitButtonText={
                                editingSede
                                    ? "Actualizar sede"
                                    : "Registrar sede"
                            }
                            mensaje={mensajeSede}
                            error={errorSede}
                        />

                        <ReusableTable
                            columns={[
                                {
                                    header: "Nombre",
                                    accessor: (s: Sede) => s.nombre,
                                },
                                {
                                    header: "Acciones",
                                    align: "center",
                                    width: "150px",
                                    accessor: (s: Sede) => (
                                        <div className="flex justify-center gap-2">
                                            <button
                                                onClick={() => editarSede(s)}
                                                className="text-sm text-blue-600 hover:underline px-3 py-1 bg-blue-50 rounded-md"
                                            >
                                                Editar
                                            </button>

                                            <button
                                                onClick={() => eliminarSede(s.id_sede)}
                                                className="text-sm text-red-600 hover:underline px-3 py-1 bg-red-50 rounded-md"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    ),
                                },
                            ]}
                            data={sedes}
                            isLoading={loadingSedes}
                        />

                    </div>

                    {/* ==================== CURSOS ==================== */}

                    <div className="space-y-6">

                        <DynamicForm
                            title={
                                editingCurso
                                    ? "Editar curso"
                                    : "Registrar curso"
                            }
                            description={
                                editingCurso
                                    ? "Modifique el nombre del curso."
                                    : "Complete la información para registrar un nuevo curso."
                            }
                            fields={camposCurso}
                            formData={formCurso}
                            setFormData={setFormCurso}
                            onSubmit={guardarCurso}
                            onCancel={
                                editingCurso
                                    ? cancelarEdicionCurso
                                    : undefined
                            }
                            submitButtonText={
                                editingCurso
                                    ? "Actualizar curso"
                                    : "Registrar curso"
                            }
                            mensaje={mensajeCurso}
                            error={errorCurso}
                        />

                        <ReusableTable
                            columns={[
                                {
                                    header: "Nombre",
                                    accessor: (c: Curso) => c.nombre,
                                },
                                {
                                    header: "Acciones",
                                    align: "center",
                                    width: "180px",
                                    accessor: (c: Curso) => (
                                        <div className="flex justify-center gap-2">
                                            <button
                                                onClick={() => editarCurso(c)}
                                                className="text-sm text-blue-600 hover:underline px-3 py-1 bg-blue-50 rounded-md"
                                            >
                                                Editar
                                            </button>

                                            <button
                                                onClick={() => eliminarCurso(c.id_curso)}
                                                className="text-sm text-red-600 hover:underline px-3 py-1 bg-red-50 rounded-md"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    ),
                                },
                            ]}
                            data={cursos}
                            isLoading={loadingCursos}
                        />

                    </div>

                </div>

            </main>
        </div>
    );
}