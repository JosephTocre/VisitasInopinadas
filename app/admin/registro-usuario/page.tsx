"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { PageHeader } from "@/components/ui/PageHeader";
import { ReusableTable } from "@/components/ui/ReusableTable";
import { DynamicForm, FieldConfig } from "@/components/ui/DynamicForm"; // Assuming DynamicForm is in this path
import Swal from "sweetalert2";

const camposUsuario: FieldConfig[] = [
  { name: "nombre", label: "Nombre", type: "text" },
  { name: "apellidos", label: "Apellidos", type: "text" },
  { name: "correo", label: "Correo electrónico", type: "email" },
  { name: "contrasena", label: "Contraseña", type: "password" },
  {
    name: "rol",
    label: "Rol",
    type: "select",
    options: [
      { value: "ADMIN", label: "Administrador" },
      { value: "INSPECTOR", label: "Inspector" },
    ],
  },
];

export default function RegistroUsuarioPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    correo: "",
    contrasena: "",
    rol: "",
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  const [usuarioLogueado, setUsuarioLogueado] = useState<any>(null);
  const [usuarios, setUsuarios] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const MAX_CARACTERES = 100;

  const limpiarTexto = (valor: string) => {
    return valor
      .replace(/\s{2,}/g, " ")
      .replace(/^\s+/, "")
      .slice(0, MAX_CARACTERES);
  };

  const fetchUsuarios = async () => {
    setIsLoading(true);

    const res = await fetch("/api/usuarios");

    if (!res.ok) {
      console.error("Error al cargar usuarios:", await res.text());
      setIsLoading(false);
      return;
    }

    const data = await res.json();

    // Obtener usuario del localStorage para filtrar
    const userStr = localStorage.getItem("usuario");
    const usuarioLogueado = userStr ? JSON.parse(userStr) : null;

    if (usuarioLogueado) {
      setUsuarios(data.filter((u: any) => u.id_usuario !== usuarioLogueado.id));
    } else {
      setUsuarios(data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const userStr = localStorage.getItem("usuario");
    if (userStr) {
      setUsuarioLogueado(JSON.parse(userStr));
    }
    fetchUsuarios();
  }, []);

  const registrarUsuario = async (e: React.FormEvent) => {
    e.preventDefault();

    setMensaje("");
    setError("");

    const { nombre, apellidos, correo, contrasena, rol } = formData;
    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);

    if (!correoValido) {
      setError("Correo inválido");
      return;
    }

    try {
      const url = editingId
        ? `/api/usuarios/${editingId}`
        : "/api/auth/register";
      const method = editingId ? "PUT" : "POST";

      // Creamos el payload
      const payload: any = { nombre, apellidos, correo, rol };

      // Solo enviamos la contraseña si se escribió algo (especialmente importante en edición)
      if (contrasena) {
        payload.contrasena = contrasena;
      }

      const respuesta = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(data.mensaje || "Error al procesar usuario");
      }

      setMensaje(
        editingId
          ? "Usuario actualizado correctamente"
          : "Usuario registrado correctamente",
      );

      setFormData({
        nombre: "",
        apellidos: "",
        correo: "",
        contrasena: "",
        rol: "",
      });
      setEditingId(null);
      fetchUsuarios();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Error inesperado");
    }
  };

  const editarUsuario = (usuario: any) => {
    setEditingId(usuario.id_usuario);
    setFormData({
      nombre: usuario.nombre,
      apellidos: usuario.apellidos,
      correo: usuario.correo,
      contrasena: "",
      rol: usuario.rol,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const eliminarUsuario = async (id: number) => {
    const result = await Swal.fire({
      title: "¿Eliminar usuario?",
      text: "Esta acción desactivará al usuario.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`/api/usuarios/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Error al eliminar");
      }

      await Swal.fire({
        title: "¡Eliminado!",
        text: "El usuario fue eliminado correctamente.",
        icon: "success",
        timer: 1800,
        showConfirmButton: false,
      });

      fetchUsuarios();
    } catch (error) {
      await Swal.fire({
        title: "Error",
        text: "No se pudo eliminar el usuario.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  const cancelarEdicion = () => {
    setEditingId(null);
    setFormData({
      nombre: "",
      apellidos: "",
      correo: "",
      contrasena: "",
      rol: "",
    });
  };

  return (
    <div className="flex min-h-screen bg-[#f5f5f5]">
      <AdminSidebar />

      <div className="w-px bg-gray-300" />

      <main className="p-8 w-full">
        <PageHeader
          title="Registro de usuarios"
          description="Crea nuevas cuentas para administradores e inspectores del sistema."
        />

        <DynamicForm
          title={editingId ? "Editar usuario" : "Información del usuario"}
          description={
            editingId
              ? "Modifique los datos del usuario. Deje la contraseña vacía si no desea cambiarla."
              : "Complete los datos para registrar una nueva cuenta."
          }
          fields={camposUsuario.map((field) =>
            field.name === "contrasena" && editingId
              ? {
                  ...field,
                  label: "Nueva contraseña (dejar vacío para mantener actual)",
                  required: false,
                }
              : {
                  ...field,
                  required: field.name === "contrasena" ? true : field.required,
                },
          )}
          formData={formData}
          setFormData={setFormData}
          onSubmit={registrarUsuario}
          onCancel={editingId ? cancelarEdicion : undefined}
          submitButtonText={editingId ? "Actualizar usuario" : "Crear usuario"}
          mensaje={mensaje}
          error={error}
        />

        <div className="mt-8">
          <ReusableTable
            columns={[
              {
                header: "Nombre",
                accessor: (u: any) => `${u.nombre} ${u.apellidos}`,
              },
              { header: "Correo", accessor: (u: any) => u.correo },
              { header: "Rol", accessor: (u: any) => u.rol },
              {
                header: "Acciones",
                accessor: (u: any) => (
                  <div className="flex gap-2">
                    <button
                      onClick={() => editarUsuario(u)}
                      className="text-sm text-blue-600 hover:underline px-3 py-1 bg-blue-50 rounded-md"
                    >
                      Editar
                    </button>
                    {/* <button
                      onClick={() => eliminarUsuario(u.id_usuario)}
                      className="text-sm text-red-600 hover:underline px-3 py-1 bg-red-50 rounded-md"
                    >
                      Eliminar
                    </button> */}
                  </div>
                ),
              },
            ]}
            data={usuarios}
            isLoading={isLoading}
          />
        </div>

        {usuarioLogueado && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">Mi Perfil</h2>
            <ReusableTable
              columns={[
                {
                  header: "Nombre",
                  accessor: (u: any) => `${u.nombre} ${u.apellidos}`,
                },
                { header: "Correo", accessor: (u: any) => u.correo },
                { header: "Rol", accessor: (u: any) => u.rol },
                {
                  header: "Acciones",
                  accessor: (u: any) => (
                    <div className="flex gap-2">
                      <button
                        onClick={() => editarUsuario(u)}
                        className="text-sm text-blue-600 hover:underline px-3 py-1 bg-blue-50 rounded-md"
                      >
                        Editar
                      </button>
                    </div>
                  ),
                },
              ]}
              data={[usuarioLogueado]}
            />
          </div>
        )}
      </main>
    </div>
  );
}
