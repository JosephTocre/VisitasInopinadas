import { ControlAsistenciaRepository } from "@/repositories/controlAsistencia.repository";

export class ControlAsistenciaService {
    private repo = new ControlAsistenciaRepository();

    async registrarControlAsistencia(datos: any) {

        const payload = {
            control_ambiente: datos.ambienteCumple === "cumple",
            control_intranet: datos.intranetCumple === "cumple",
            observaciones_ambiente: datos.observacionAmbiente,
            observaciones_intranet: datos.observacionIntranet,
            observaciones: datos.observacionesGenerales,
            visitaId: Number(datos.visitaId),
        };

        return this.repo.upsert(payload.visitaId, payload);
    }

    async obtenerPorVisita(visitaId: number) {
        return this.repo.obtenerPorVisita(visitaId);
    }
}