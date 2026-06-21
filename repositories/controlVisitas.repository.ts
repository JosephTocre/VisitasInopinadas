import { prisma } from "@/lib/prisma";

export class VisitaRepository {
    async crear(data: any) {
        return prisma.hechoVisita.create({
            data,
        });
    }
    async actualizar(id: number, data: any) {
        return await prisma.hechoVisita.update({
            where: {
                id_visita: id,
            },
            data,
        });
    }
}