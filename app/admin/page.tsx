"use client";

import AdminSidebar from "@/components/AdminSidebar";

export default function AdminPage() {
    return (
        <div className="flex min-h-screen">

            <AdminSidebar />

            <div className="w-px bg-gray-300" />

            <main className="flex-1 flex flex-col px-8 py-6">

                {/* Saludo */}
                <div className="flex justify-end">
                    <p className="text-sm font-medium text-gray-800">
                        Hola admin
                    </p>
                </div>

                {/* Título */}
                <div className="text-center mt-10 mb-10">
                    <h1 className="text-5xl font-extrabold text-black mb-4">
                        Panel de Administración
                    </h1>

                    <p className="text-gray-600">
                        Bienvenido al sistema de visitas inopinadas y control académico.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {/* Usuarios */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition">
                        <svg className="w-8 h-8 mb-3 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" />
                        </svg>

                        <h2 className="text-lg font-semibold mb-2">
                            Gestión de usuarios
                        </h2>

                        <p className="text-sm text-gray-600">
                            Administra los usuarios del sistema y registra nuevos inspectores.
                        </p>
                    </div>

                    {/* Visitas */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition">
                        <svg className="w-8 h-8 mb-3 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M9 12h6m2 8H7a2 2 0 01-2-2V6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v10a2 2 0 01-2 2z" />
                        </svg>

                        <h2 className="text-lg font-semibold mb-2">
                            Supervisión de visitas
                        </h2>

                        <p className="text-sm text-gray-600">
                            Revisión general de todas las visitas registradas en el sistema.
                        </p>
                    </div>

                    {/* Auditoría */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition">
                        <svg className="w-8 h-8 mb-3 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M11 5h6M11 9h6M11 13h6M7 5h.01M7 9h.01M7 13h.01M7 17h.01" />
                        </svg>

                        <h2 className="text-lg font-semibold mb-2">
                            Auditoría de registros
                        </h2>

                        <p className="text-sm text-gray-600">
                            Consulta controles: docente, material, sílabo y guía.
                        </p>
                    </div>

                    {/* Reportes */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition">
                        <svg className="w-8 h-8 mb-3 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M3 3v18h18" />
                        </svg>

                        <h2 className="text-lg font-semibold mb-2">
                            Reportes generales
                        </h2>

                        <p className="text-sm text-gray-600">
                            Visualización consolidada del estado de visitas realizadas.
                        </p>
                    </div>

                    {/* Configuración */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition">
                        <svg className="w-8 h-8 mb-3 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M12 8v4l3 3M12 2a10 10 0 100 20 10 10 0 000-20z" />
                        </svg>

                        <h2 className="text-lg font-semibold mb-2">
                            Configuración del sistema
                        </h2>

                        <p className="text-sm text-gray-600">
                            Parámetros generales y reglas del sistema.
                        </p>
                    </div>

                    {/* Historial */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition">
                        <svg className="w-8 h-8 mb-3 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M12 8v4l3 3M12 6a9 9 0 100 18 9 9 0 000-18z" />
                        </svg>

                        <h2 className="text-lg font-semibold mb-2">
                            Historial global
                        </h2>

                        <p className="text-sm text-gray-600">
                            Acceso completo a todas las visitas registradas.
                        </p>
                    </div>

                </div>

            </main>
        </div>
    );
}