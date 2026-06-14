"use client";

import AdminSidebar from "@/components/AdminSidebar";

export default function AdminPage() {
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

          <div className="text-center">
            <h1 className="text-5xl font-extrabold text-black mb-4">
              Panel de Administración
            </h1>

            <p className="text-gray-600">
              Bienvenido al sistema de visitas inopinadas.
            </p>
          </div>

        </div>

      </main>

    </div>
  );
}