"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  {
    label: "Historial",
    href: "/inspector/historial",
    icon: "☰",
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");

    router.push("/");
  };

  return (
    <aside className="w-56 bg-[#eaeaea] flex flex-col px-4 py-6 shrink-0">
      <div className="mb-8">
        <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="white"
          >
            <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01L12 2z" />
          </svg>
        </div>
      </div>

      {/* Navegación */}
      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-black text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Cerrar sesión */}
      <button
        onClick={cerrarSesion}
        className="
          flex
          items-center
          gap-2
          text-sm
          font-medium
          text-gray-700
          hover:opacity-70
          transition-opacity
          px-3
          py-2
        "
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

    </aside>
  );
}