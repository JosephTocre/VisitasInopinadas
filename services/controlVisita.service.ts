import { VisitaRepository } from "@/repositories/visita.repository";

export class ControlVisitaService {
    private repo = new VisitaRepository();

    async crearVisita(data: any) {
        return await this.repo.crear({
            sede: data.sede,
            lugar: data.lugarVisita,
            curso: data.curso,
            campo_formativo: data.campoFormativo,
            n_semana: Number(data.semana),
            turno: data.turno,
            hora_practica_teoria: data.tipoHora,
            fecha: new Date(),
            hora_inicio: new Date(data.hora_inicio),
            hora_termino: new Date(),
            ciclo: data.ciclo,
            usuarioId: data.id_inspector,
        });
    }
    async actualizarVisita(id: number, data: any) {
        return await this.repo.actualizar(id, {
            sede: data.sede,
            lugar: data.lugarVisita,
            curso: data.curso,
            campo_formativo: data.campoFormativo,
            n_semana: Number(data.semana),
            turno: data.turno,
            hora_practica_teoria: data.tipoHora,
            ciclo: data.ciclo,
        });
    }
}