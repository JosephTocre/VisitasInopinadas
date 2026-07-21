"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();

  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");

  const iniciarSesion = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");

    try {
      const respuesta = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correo,
          contrasena,
        }),
      });

      const data = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(
          data.mensaje || "Credenciales inválidas"
        );
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "usuario",
        JSON.stringify(data.usuario)
      );

      if (data.usuario.rol === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/inspector");
      }
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Error al iniciar sesión"
      );
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg bg-white border border-gray-200 rounded-md shadow-sm p-10">

        <div className="flex justify-center mb-8">
          <Image
            src="/utplogo.png"
            alt="Logo"
            width={300}
            height={200}
            className="object-contain"
          />
        </div>

        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-800 leading-tight mt-1">
            Iniciar sesión
          </h1>
        </div>

        <form
          onSubmit={iniciarSesion}
          className="mt-10 space-y-6"
        >
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Correo electrónico
            </label>

            <input
              type="email"
              value={correo}
              onChange={(e) =>
                setCorreo(e.target.value)
              }
              placeholder="ejemplo@minedu.gob.pe"
              className="
                w-full
                border
                border-gray-300
                rounded-2xl
                px-4
                py-4
                outline-none
                text-black
                placeholder:text-gray-400
                focus:ring-2
                focus:ring-black
                transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Contraseña
            </label>

            <input
              type="password"
              value={contrasena}
              onChange={(e) =>
                setContrasena(e.target.value)
              }
              placeholder="Ingrese su contraseña"
              className="
                w-full
                border
                border-gray-300
                rounded-2xl
                px-4
                py-4
                outline-none
                text-black
                placeholder:text-gray-400
                focus:ring-2
                focus:ring-black
                transition"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm">
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
              transition"
          >
            Ingresar →
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            Sistema seguro y eficiente para el control
          </p>
        </div>

      </div>
    </main>
  );
}