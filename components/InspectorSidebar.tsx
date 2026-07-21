"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

const navItems = [
  {
    label: "Historial",
    href: "/inspector/historial",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M3 12h18" />
        <path d="M3 6h18" />
        <path d="M3 18h18" />
      </svg>
    ),
  },
];

export default function InspectorSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");

    router.push("/");
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col px-4 py-6 shrink-0 h-screen sticky top-0">
      {/* Logo */}
      <div className="mb-10">
        <div className="flex items-center gap-3">
          <Image
            src="/utplogo.png"
            alt="Logo"
            width={100}
            height={80}
            className="object-contain"
          />

          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider">
              Panel
            </p>

            <h2 className="font-semibold text-black">Inspector</h2>
          </div>
        </div>
      </div>

      {/* Navegación */}
      <nav className="flex flex-col gap-2 flex-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-black text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100 hover:text-black"
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-2 bottom-2 w-1 bg-white rounded-r-full" />
              )}

              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Separador */}
      <div className="border-t border-gray-200 my-4" />

      {/* Logout */}
      <button
        onClick={cerrarSesion}
        className="
          flex
          items-center
          gap-3
          w-full
          px-4
          py-3
          rounded-xl
          text-sm
          font-medium
          text-gray-600
          hover:bg-red-50
          hover:text-red-600
          transition-all
        "
      >
        <svg
          width="18"
          height="18"
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
    </aside>
  );
}