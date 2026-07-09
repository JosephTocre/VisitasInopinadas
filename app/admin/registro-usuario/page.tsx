"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { PageHeader } from "@/components/ui/PageHeader";
import { ReusableTable } from "@/components/ui/ReusableTable";

export default function RegistroUsuarioPage() {
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [rol, setRol] = useState("");

  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const MAX_CARACTERES = 100;

  const limpiarTexto = (valor: string) => {
    return valor
      .replace(/\s{2,}/g, " ")
      .replace(/^\s+/, "")
      .slice(0, MAX_CARACTERES);
  };

  const [usuarios, setUsuarios] = useState([]);
  const fetchUsuarios = async () => {
    const res = await fetch("/api/usuarios");
    const data = await res.json();
    setUsuarios(data);
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const registrarUsuario = async (e: React.FormEvent) => {
    e.preventDefault();

    setMensaje("");
    setError("");

    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);

    if (!correoValido) {
      setError("Correo inválido");
      return;
    }

    try {
      const respuesta = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          apellidos,
          correo,
          contrasena,
          rol,
        }),
      });

      const data = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(data.mensaje || "Error al registrar usuario");
      }

      setMensaje("Usuario registrado correctamente");

      setNombre("");
      setApellidos("");
      setCorreo("");
      setContrasena("");
      setRol("");
      fetchUsuarios(); // Refresh the user list after successful registration
    } catch (error) {
      setError(error instanceof Error ? error.message : "Error inesperado");
    }
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

        {/* Card */}
        <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-8 max-w-5xl">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-black">
              Información del usuario
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Complete los datos para registrar una nueva cuenta.
            </p>
          </div>

          <form onSubmit={registrarUsuario} className="grid grid-cols-2 gap-5">
            {/* Nombre */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre
              </label>

              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(limpiarTexto(e.target.value))}
                required
                className="
                  w-full
                  border
                  border-gray-200
                  rounded-xl
                  px-4
                  py-3
                  bg-white
                  text-black
                  shadow-sm
                  outline-none
                  focus:ring-2
                  focus:ring-black
                  focus:border-black
                  transition
                "
              />
            </div>

            {/* Apellidos */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Apellidos
              </label>

              <input
                type="text"
                value={apellidos}
                onChange={(e) => setApellidos(limpiarTexto(e.target.value))}
                required
                className="
                  w-full
                  border
                  border-gray-200
                  rounded-xl
                  px-4
                  py-3
                  bg-white
                  text-black
                  shadow-sm
                  outline-none
                  focus:ring-2
                  focus:ring-black
                  focus:border-black
                  transition
                "
              />
            </div>

            {/* Correo */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Correo electrónico
              </label>

              <input
                type="email"
                value={correo}
                onChange={(e) => {
                  const valor = e.target.value.replace(/\s/g, "").slice(0, 100);

                  setCorreo(valor);
                }}
                required
                className="
                  w-full
                  border
                  border-gray-200
                  rounded-xl
                  px-4
                  py-3
                  bg-white
                  text-black
                  shadow-sm
                  outline-none
                  focus:ring-2
                  focus:ring-black
                  focus:border-black
                  transition
                "
              />
            </div>

            {/* Contraseña */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>

              <input
                type="password"
                value={contrasena}
                onChange={(e) =>
                  setContrasena(e.target.value.replace(/\s/g, "").slice(0, 100))
                }
                required
                className="
                  w-full
                  border
                  border-gray-200
                  rounded-xl
                  px-4
                  py-3
                  bg-white
                  text-black
                  shadow-sm
                  outline-none
                  focus:ring-2
                  focus:ring-black
                  focus:border-black
                  transition
                "
              />
            </div>

            {/* Rol */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rol
              </label>

              <select
                value={rol}
                onChange={(e) => setRol(e.target.value)}
                required
                className="
                  w-full
                  border
                  border-gray-200
                  rounded-xl
                  px-4
                  py-3
                  bg-white
                  text-black
                  shadow-sm
                  outline-none
                  focus:ring-2
                  focus:ring-black
                  focus:border-black
                  transition
                "
              >
                <option value="">Seleccione un rol</option>

                <option value="ADMIN">Administrador</option>

                <option value="INSPECTOR">Inspector</option>
              </select>
            </div>

            {/* Mensaje éxito */}
            {mensaje && (
              <div className="col-span-2 bg-green-50 border border-green-200 rounded-xl p-4">
                <p className="text-sm text-green-700">{mensaje}</p>
              </div>
            )}

            {/* Mensaje error */}
            {error && (
              <div className="col-span-2 bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Botón */}
            <button
              type="submit"
              className="
                col-span-2
                bg-black
                text-white
                py-4
                rounded-xl
                font-semibold
                shadow-sm
                hover:opacity-90
                transition
              "
            >
              Crear usuario
            </button>
          </form>
        </div>
        <div className="mt-8">
          <ReusableTable
            columns={[
              {
                header: "Nombre",
                accessor: (u: any) => `${u.nombre} ${u.apellidos}`,
              },
              { header: "Correo", accessor: (u: any) => u.correo },
              { header: "Rol", accessor: (u: any) => u.rol },
            ]}
            data={usuarios}
          />
        </div>
      </main>
    </div>
  );
}
