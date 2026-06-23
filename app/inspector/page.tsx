"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function InspectorPage() {
  const router = useRouter();

  const usuarioGuardado =
    typeof window !== "undefined" ? localStorage.getItem("usuario") : null;

  const nombreUsuario = usuarioGuardado
    ? JSON.parse(usuarioGuardado).nombre
    : "Usuario";

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");

    router.push("/");
  };

  return (
    <main className="min-h-screen bg-[#f5f5f5] flex flex-col p-8">
      {/* Header */}
<div className="w-full flex items-center justify-between mb-6">

  {/* Saludo */}
  <div className="flex items-center gap-4">

    {/* Icono mano saludando */}
    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-blue-600 animate-bounce"
      >
        <path
          d="M12 2v6m0 0l2-2m-2 2l-2-2M6 10v2c0 2 2 4 6 4s6-2 6-4v-2"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M6 10V8a2 2 0 012-2h1v4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>

    {/* Texto saludo */}
    <div>
      <p className="text-sm text-gray-500">
        Bienvenido de nuevo
      </p>

      <h2 className="text-xl font-bold text-black leading-tight">
        {nombreUsuario}
      </h2>
    </div>
  </div>

  {/* Botón cerrar sesión */}
  <button
    onClick={cerrarSesion}
    className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black transition-colors"
  >
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
    Cerrar sesión
  </button>

</div>

      {/* Contenido */}
      <div className="flex-1 w-full flex flex-col items-center justify-center gap-8">
        <div className="w-full max-w-lg bg-white rounded-lg shadow-sm px-12 py-12 flex flex-col items-center text-center">
          <div className="w-14 h-14 bg-black rounded-lg flex items-center justify-center mb-6">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
              className="animate-pulse"
            >
              <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01L12 2z" />
            </svg>
          </div>

          <h1 className="text-3xl font-extrabold text-black leading-tight tracking-tight">
            Sistema de Registro
            <br />
            de Visitas Inopinadas
          </h1>

          <p className="text-sm text-gray-500 mt-10">
            Control de clases universitarias mediante QR
          </p>

          <div className="w-full  my-7" />

          <Link href="/inspector/registro" className="w-full">
            <button className="w-full bg-black text-white font-semibold text-base rounded-lg py-3 px-6 flex items-center justify-center gap-3 hover:bg-gray-900 transition-colors">
              Registrar nueva visita
              <span className="text-lg">→</span>
            </button>
          </Link>

          <div className="w-full border-t border-gray-200 my-6" />

          <Link href="/inspector/historial">
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
