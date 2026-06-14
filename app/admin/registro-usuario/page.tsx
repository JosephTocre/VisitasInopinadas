"use client";

import { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";

export default function RegistroUsuarioPage() {
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [rol, setRol] = useState("");

  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const registrarUsuario = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setMensaje("");
    setError("");

    try {
      const respuesta = await fetch(
        "/api/auth/register",
        {
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
        }
      );

      const data = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(
          data.mensaje || "Error al registrar usuario"
        );
      }

      setMensaje("Usuario registrado correctamente");

      setNombre("");
      setApellidos("");
      setCorreo("");
      setContrasena("");
      setRol("");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Error inesperado"
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex">

      <AdminSidebar />

      <div className="w-px bg-gray-300" />

      <main className="flex-1 flex flex-col px-8 py-6">

        <div className="flex justify-end">
          <p className="text-sm font-medium text-gray-800">
            Hola admin
          </p>
        </div>

        <div className="flex-1 flex items-center justify-center">

          <div className="w-full max-w-md border border-gray-300 rounded-3xl p-10 bg-[#f5f5f5]">

            <h1 className="text-5xl font-extrabold text-center text-black leading-tight mb-10">
              Registrar nuevo
              <br />
              usuario
            </h1>

            <form
              onSubmit={registrarUsuario}
              className="space-y-5"
            >
              <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) =>
                  setNombre(e.target.value)
                }
                required
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-2xl
                  px-5
                  py-4
                  bg-transparent
                  text-black
                  outline-none
                  focus:ring-2
                  focus:ring-black
                "
              />

              <input
                type="text"
                placeholder="Apellido"
                value={apellidos}
                onChange={(e) =>
                  setApellidos(e.target.value)
                }
                required
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-2xl
                  px-5
                  py-4
                  bg-transparent
                  text-black
                  outline-none
                  focus:ring-2
                  focus:ring-black
                "
              />

              <input
                type="email"
                placeholder="Correo"
                value={correo}
                onChange={(e) =>
                  setCorreo(e.target.value)
                }
                required
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-2xl
                  px-5
                  py-4
                  bg-transparent
                  text-black
                  outline-none
                  focus:ring-2
                  focus:ring-black
                "
              />

              <input
                type="password"
                placeholder="Contraseña"
                value={contrasena}
                onChange={(e) =>
                  setContrasena(e.target.value)
                }
                required
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-2xl
                  px-5
                  py-4
                  bg-transparent
                  text-black
                  outline-none
                  focus:ring-2
                  focus:ring-black
                "
              />

              <select
                value={rol}
                onChange={(e) =>
                  setRol(e.target.value)
                }
                required
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-2xl
                  px-5
                  py-4
                  bg-transparent
                  text-black
                  outline-none
                  focus:ring-2
                  focus:ring-black
                "
              >
                <option value="">
                  Seleccione un rol
                </option>
                <option value="ADMIN">
                  Administrador
                </option>
                <option value="INSPECTOR">
                  Inspector
                </option>
              </select>

              {mensaje && (
                <p className="text-green-600 text-sm text-center">
                  {mensaje}
                </p>
              )}

              {error && (
                <p className="text-red-600 text-sm text-center">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="
                  w-full
                  bg-black
                  text-white
                  py-4
                  rounded-2xl
                  font-semibold
                  hover:opacity-90
                  transition
                "
              >
                Crear cuenta →
              </button>
            </form>

            <p className="text-center text-xs text-gray-500 mt-5">
              Sistema seguro y eficiente para el control
            </p>

          </div>

        </div>

      </main>

    </div>
  );
}