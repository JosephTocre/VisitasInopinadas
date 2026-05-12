// app/page.tsx

"use client";

import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#f5f5f5] flex items-center justify-center px-4">

      <div className="w-full max-w-lg bg-white border border-gray-200 rounded-md shadow-sm p-10">

        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center text-white text-3xl">
            ★
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-800 leading-tight mt-1">
            Iniciar sesión
          </h1>
        </div>

        <form className="mt-10 space-y-6">

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
                rounded-2xl
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
                transition"/>
          </div>

          <Link href="/inicio">
            <button
              type="button"
              className="
                w-full
                bg-black
                text-white
                py-4
                rounded-2xl
                font-semibold
                hover:opacity-90
                transition">
              Ingresar →
            </button>
          </Link>
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