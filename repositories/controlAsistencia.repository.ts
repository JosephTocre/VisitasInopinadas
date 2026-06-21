import { prisma } from "@/lib/prisma";

export class ControlAsistenciaRepository {

    async obtenerPorVisita(visitaId: number) {
        return prisma.controlEstudiante.findUnique({
            where: { visitaId },
        });
    }

    async crear(data: any) {
        return prisma.controlEstudiante.create({
            data,
        });
    }

    async actualizarPorVisita(visitaId: number, data: any) {
        return prisma.controlEstudiante.update({
            where: { visitaId },
            data,
        });
    }

    async upsert(visitaId: number, data: any) {
        return prisma.controlEstudiante.upsert({
            where: { visitaId },
            create: data,
            update: data,
        });
    }
}