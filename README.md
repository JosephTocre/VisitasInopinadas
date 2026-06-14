# Sistema de Registro de Visitas Inopinadas

Sistema web para el registro y control de visitas inopinadas a clases universitarias. Permite la gestión de usuarios con roles diferenciados (Administrador e Inspector), registro de visitas y generación de reportes.

## Tecnologías Utilizadas
Next.js
React
TypeScript
Tailwind CSS
Prisma ORM
PostgreSQL (Supabase)
JWT (Autenticación)
Bcrypt (Cifrado de contraseñas)

## Instalación del Proyecto
1. Clonar el repositorio
git clone <URL_DEL_REPOSITORIO>
cd visitas-inopinadas
2. Instalar dependencias
npm install
3. Crear archivo .env

En la raíz del proyecto crear un archivo llamado .env con las siguientes variables:

DATABASE_URL="..."
DIRECT_URL="..."
JWT_SECRET="..."

4. Generar Prisma Client
npx prisma generate
5. Sincronizar esquema con la base de datos
npx prisma db push
6. Ejecutar el proyecto
npm run dev

Abrir en el navegador:
http://localhost:3000

## Usuarios registrados en Supabase
Administrador
Correo: admin@visitas.com
Contraseña: [123456]
Rol: ADMIN
Inspector
Correo: inspector@visitas.com
Contraseña: [Inspector123]
Rol: INSPECTOR

## Arquitectura de Roles

| Rol | Accesos |
|------|----------|
| **ADMIN** | Registro de usuarios, historial de visitas, reportes y estadísticas. |
| **INSPECTOR** | Registro de nuevas visitas y consulta del historial de visitas. |

## Permisos

| Módulo | ADMIN | INSPECTOR |
|---------|:-----:|:---------:|
| Iniciar sesión | ✅ | ✅ |
| Registrar visitas | ❌ | ✅ |
| Historial | ✅ | ✅ |
| Reportes | ✅ | ❌ |
| Registrar usuarios | ✅ | ❌ |