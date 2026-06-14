"use client";

import AdminSidebar from "@/components/AdminSidebar";

export default function RegistroUsuarioPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f5] flex">

      <AdminSidebar />

      <div className="w-px bg-gray-300" />

      <main className="flex-1 flex flex-col px-8 py-6">

        {/* Saludo */}
        <div className="flex justify-end">
          <p className="text-sm font-medium text-gray-800">
            Hola admin
          </p>
        </div>

        {/* Contenido */}
        <div className="flex-1 flex items-center justify-center">

          <div className="w-full max-w-md border border-gray-300 rounded-3xl p-10 bg-[#f5f5f5]">

            <h1 className="text-5xl font-extrabold text-center text-black leading-tight mb-10">
              Registrar nuevo
              <br />
              usuario
            </h1>

            <form className="space-y-5">

              <input
                type="text"
                placeholder="Nombre"
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
                <option value="">Seleccione un rol</option>
                <option value="ADMIN">Administrador</option>
                <option value="INSPECTOR">Inspector</option>
              </select>

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