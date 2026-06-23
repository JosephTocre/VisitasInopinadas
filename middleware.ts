import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Verificar si la ruta empieza con /admin o /inspector
  if (
    request.nextUrl.pathname.startsWith("/admin") ||
    request.nextUrl.pathname.startsWith("/inspector")
  ) {
    const token =
      request.cookies.get("token")?.value ||
      request.headers.get("authorization");

    // Si no hay token, redirigir al login
    if (!token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

// Configurar en qué rutas se ejecutará el middleware
export const config = {
  matcher: ["/admin/:path*", "/inspector/:path*"],
};
