import { VisitaRepository } from "@/repositories/visita.repository";

interface VisitaDTO {
  sede: string;
  lugarVisita: string;
  curso: number | string;
  campoFormativo: string;
  semana: number | string;
  turno: string;
  tipoHora: string;
  ciclo: string;
  id_inspector: number;
  hora_inicio: string;
}

export class ControlVisitaService {
  private repo = new VisitaRepository();

  async crearVisita(data: VisitaDTO) {
    return await this.repo.crear({
      sede: {
        connect: {
          nombre: data.sede,
        },
      },

      curso: {
        connect: {
          id_curso: Number(data.curso),
        },
      },

      usuario: {
        connect: {
          id_usuario: data.id_inspector,
        },
      },

      lugar: data.lugarVisita,
      campo_formativo: data.campoFormativo,
      n_semana: Number(data.semana),
      turno: data.turno,
      hora_practica_teoria: data.tipoHora,
      fecha: new Date(),
      hora_inicio: new Date(data.hora_inicio),
      hora_termino: new Date(),
      ciclo: data.ciclo,
    });
  }

  async actualizarVisita(id: number, data: VisitaDTO) {
    return await this.repo.actualizar(id, {
      sede: {
        connect: {
          nombre: data.sede,
        },
      },

      curso: {
        connect: {
          id_curso: Number(data.curso),
        },
      },

      lugar: data.lugarVisita,
      campo_formativo: data.campoFormativo,
      n_semana: Number(data.semana),
      turno: data.turno,
      hora_practica_teoria: data.tipoHora,
      ciclo: data.ciclo,
    });
  }
}