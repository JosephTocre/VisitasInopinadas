-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('ADMIN', 'INSPECTOR');

-- CreateTable
CREATE TABLE "Usuario" (
    "id_usuario" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "contrasena" TEXT NOT NULL,
    "rol" "Rol" NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateTable
CREATE TABLE "HechoVisita" (
    "id_visita" SERIAL NOT NULL,
    "sede" TEXT NOT NULL,
    "curso" TEXT NOT NULL,
    "campo_formativo" TEXT NOT NULL,
    "requerimientos" TEXT,
    "fecha" TIMESTAMP(3) NOT NULL,
    "turno" TEXT NOT NULL,
    "hora_practica_teoria" TEXT NOT NULL,
    "n_semana" INTEGER NOT NULL,
    "hora_inicio" TIMESTAMP(3) NOT NULL,
    "hora_termino" TIMESTAMP(3) NOT NULL,
    "ciclo" TEXT NOT NULL,
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "HechoVisita_pkey" PRIMARY KEY ("id_visita")
);

-- CreateTable
CREATE TABLE "ControlDocente" (
    "id_control_docente" SERIAL NOT NULL,
    "nombre_docente" TEXT NOT NULL,
    "apellido_docente" TEXT NOT NULL,
    "actividad" TEXT NOT NULL,
    "presente" BOOLEAN NOT NULL,
    "horario_programado" BOOLEAN NOT NULL,
    "interaccion" BOOLEAN NOT NULL,
    "observaciones" TEXT,
    "visitaId" INTEGER NOT NULL,

    CONSTRAINT "ControlDocente_pkey" PRIMARY KEY ("id_control_docente")
);

-- CreateTable
CREATE TABLE "ControlMaterial" (
    "id_control_material" SERIAL NOT NULL,
    "cumple" BOOLEAN NOT NULL,
    "observaciones" TEXT,
    "visitaId" INTEGER NOT NULL,

    CONSTRAINT "ControlMaterial_pkey" PRIMARY KEY ("id_control_material")
);

-- CreateTable
CREATE TABLE "ControlSilabo" (
    "id_control_silabo" SERIAL NOT NULL,
    "coincidencia_actual" BOOLEAN NOT NULL,
    "coincidencia_anterior" BOOLEAN NOT NULL,
    "ingreso_avance" BOOLEAN NOT NULL,
    "observaciones" TEXT,
    "visitaId" INTEGER NOT NULL,

    CONSTRAINT "ControlSilabo_pkey" PRIMARY KEY ("id_control_silabo")
);

-- CreateTable
CREATE TABLE "ControlEstudiante" (
    "id_control_estudiante" SERIAL NOT NULL,
    "control_ambiente" BOOLEAN NOT NULL,
    "observaciones_ambiente" TEXT,
    "control_intranet" BOOLEAN NOT NULL,
    "observaciones_intranet" TEXT,
    "observaciones" TEXT,
    "visitaId" INTEGER NOT NULL,

    CONSTRAINT "ControlEstudiante_pkey" PRIMARY KEY ("id_control_estudiante")
);

-- CreateTable
CREATE TABLE "ControlGuia" (
    "id_control_guia" SERIAL NOT NULL,
    "tema_programado" TEXT NOT NULL,
    "logro" TEXT NOT NULL,
    "rubrica" TEXT NOT NULL,
    "observaciones" TEXT,
    "visitaId" INTEGER NOT NULL,

    CONSTRAINT "ControlGuia_pkey" PRIMARY KEY ("id_control_guia")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_correo_key" ON "Usuario"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "ControlDocente_visitaId_key" ON "ControlDocente"("visitaId");

-- CreateIndex
CREATE UNIQUE INDEX "ControlMaterial_visitaId_key" ON "ControlMaterial"("visitaId");

-- CreateIndex
CREATE UNIQUE INDEX "ControlSilabo_visitaId_key" ON "ControlSilabo"("visitaId");

-- CreateIndex
CREATE UNIQUE INDEX "ControlEstudiante_visitaId_key" ON "ControlEstudiante"("visitaId");

-- CreateIndex
CREATE UNIQUE INDEX "ControlGuia_visitaId_key" ON "ControlGuia"("visitaId");

-- AddForeignKey
ALTER TABLE "HechoVisita" ADD CONSTRAINT "HechoVisita_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ControlDocente" ADD CONSTRAINT "ControlDocente_visitaId_fkey" FOREIGN KEY ("visitaId") REFERENCES "HechoVisita"("id_visita") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ControlMaterial" ADD CONSTRAINT "ControlMaterial_visitaId_fkey" FOREIGN KEY ("visitaId") REFERENCES "HechoVisita"("id_visita") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ControlSilabo" ADD CONSTRAINT "ControlSilabo_visitaId_fkey" FOREIGN KEY ("visitaId") REFERENCES "HechoVisita"("id_visita") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ControlEstudiante" ADD CONSTRAINT "ControlEstudiante_visitaId_fkey" FOREIGN KEY ("visitaId") REFERENCES "HechoVisita"("id_visita") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ControlGuia" ADD CONSTRAINT "ControlGuia_visitaId_fkey" FOREIGN KEY ("visitaId") REFERENCES "HechoVisita"("id_visita") ON DELETE RESTRICT ON UPDATE CASCADE;
