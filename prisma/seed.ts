import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 1. Crear un usuario necesario para la relación
  const usuario = await prisma.usuario.create({
    data: {
      nombre: "Admin",
      apellidos: "Test",
      correo: "admin@test.com",
      contrasena: "password", // En un caso real, esto debe estar hasheado
      rol: "ADMIN",
    },
  });

  // 2. Crear la visita con sus controles relacionados
  const visita = await prisma.hechoVisita.create({
    data: {
      sede: "Lima Norte",
      curso: "Programación Web",
      campo_formativo: "Tecnología",
      fecha: new Date(),
      turno: "Mañana",
      hora_practica_teoria: "Teoría",
      n_semana: 1,
      hora_inicio: new Date(),
      hora_termino: new Date(new Date().getTime() + 60 * 60 * 1000),
      ciclo: "2026-1",
      usuarioId: usuario.id_usuario,
      controlDocente: {
        create: {
          nombre_docente: "Juan",
          apellido_docente: "Perez",
          actividad: "Clase introductoria",
          presente: true,
          horario_programado: true,
          interaccion: true,
          observaciones: "Ninguna",
        },
      },
    },
  });

  console.log("Visita creada:", visita);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
