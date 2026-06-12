// app/register/page.tsx

"use client";

import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-[#f5f5f5] flex items-center justify-center px-4">

      <div className="w-full max-w-lg bg-white border border-gray-200 rounded-md shadow-sm p-10">

        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center text-white text-3xl">
            ★
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-4xl font-extrabold leading-tight text-black">
            Registrar nuevo usuario
          </h1>
        </div>

        <form className="mt-10 space-y-6">

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Nombres</label>

            <input
              type="text"
              placeholder="Ingrese su nombre"
              className="
                w-full
                border
                border-gray-300
                rounded-md
                px-4
                py-4
                outline-none
                text-black
                placeholder:text-gray-400
                focus:ring-2
                focus:ring-black
                transition"/>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Apellidos</label>

            <input
              type="text"
              placeholder="Ingrese su apellido"
              className="
                w-full
                border
                border-gray-300
                rounded-md
                px-4
                py-4
                outline-none
                text-black
                placeholder:text-gray-400
                focus:ring-2
                focus:ring-black
                transition"/>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Correo electrónico
            </label>

            <input
              type="email"
              placeholder="ejemplo@minedu.gob.pe"
              className="
                w-full
                border
                border-gray-300
                rounded-md
                px-4
                py-4
                outline-none
                text-black
                placeholder:text-gray-400
                focus:ring-2
                focus:ring-black
                transition"/>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Contraseña
            </label>

            <input
              type="password"
              placeholder="Ingrese una contraseña"
              className="
                w-full
                border
                border-gray-300
                rounded-md
                px-4
                py-4
                outline-none
                text-black
                placeholder:text-gray-400
                focus:ring-2
                focus:ring-black
                transition"/>
          </div>

          <button
            type="submit"
            className="
              w-full
              bg-black
              text-white
              py-4
              rounded-md
              font-semibold
              hover:opacity-90
              transition">
            Crear cuenta →
          </button>

        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            ¿Ya tienes cuenta?{" "}
            <Link
              href="/"
              className="font-semibold text-black hover:underline">
              Iniciar sesión
            </Link>
          </p>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            Sistema seguro y eficiente para el control de visitas
          </p>
        </div>

      </div>

    </main>
  );
}