// app/dashboard/page.tsx

"use client";

import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#eaeaea] flex flex-col px-8 py-6">

      <p className="text-sm font-medium text-gray-800 self-end">
        Hola, usuario
      </p>

      <div className="flex-1 w-full flex flex-col items-center justify-center gap-8">

        <div className="w-full max-w-lg bg-white rounded-lg shadow-sm px-12 py-12 flex flex-col items-center text-center">

          <div className="w-14 h-14 bg-black rounded-lg flex items-center justify-center mb-6">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01L12 2z" />
            </svg>
          </div>

          <h1 className="text-3xl font-extrabold text-black leading-tight tracking-tight">
            Sistema de Registro<br />de Visitas Inopinadas
          </h1>

          <p className="text-sm text-gray-500 mt-3">
            Control de clases universitarias mediante QR
          </p>

          <div className="w-full border-t border-gray-200 my-7" />

          <Link href="/registro" className="w-full">
            <button className="w-full bg-black text-white font-semibold text-base rounded-lg py-3 px-6 flex items-center justify-center gap-3 hover:bg-gray-900 transition-colors">
              Registrar nueva visita
              <span className="text-lg">→</span>
            </button>
          </Link>

          <div className="w-full border-t border-gray-200 my-4" />
          <Link href="/historial">
            <button className="bg-gray-100 text-gray-700 font-semibold text-sm rounded-md py-2 px-8 hover:bg-gray-200 transition-colors">
              Historial
            </button>
          </Link>

        </div>
        <p className="text-xs text-gray-400">
          Sistema seguro y eficiente para el control
        </p>
      </div>
    </main>
  );
}