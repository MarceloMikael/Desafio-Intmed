import db from "../config/database";
import { Agenda } from "./AgendaRepository";

export interface Consulta {
  id?: number;
  dia: string;
  horario: string;
  data_agendamento: string;
  medico_id: number;
}


export class ConsultaRepository {

    constructor() {}

    async getAll(): Promise<Consulta[]> {
        return db('consulta as c')
            .join('medico as m', 'c.medico_id', 'm.id')
            .join('especialidade as e', 'm.especialidade_id', 'e.id')
            .whereRaw('(c.dia > CURRENT_DATE) OR (c.dia = CURRENT_DATE and c.horario > CURRENT_TIME)')
            .orderBy([{column: 'c.dia', order: 'asc'}, {column: 'c.horario', order: 'asc'}])
            .select(
            'c.id',
            db.raw(`TO_CHAR(c.dia, 'DD/MM/YYYY') as dia`),
            'c.horario',
            'c.data_agendamento',
            db.raw(`
                json_build_object(
                'id', m.id,
                'crm', m.crm,
                'nome', m.nome,
                'email', m.email,
                'especialidade', json_build_object(
                    'id', e.id,
                    'nome', e.nome
                )
                ) as medico
            `)
            );
    }

    async createConsulta(consulta: Consulta): Promise<Agenda[]> {
        return db('consulta').insert(consulta);
    }

    async findById(id: number): Promise<Consulta> {
        return db('consulta').where('id', id).first();
    }

    async deleteConsulta(id: number): Promise<void> {
        await db('consulta').where('id', id).del();
    }

    async medicoExists(medico_id: number): Promise<boolean> {
        const medico = await db("medico").where("id", medico_id).first();
        return !!medico;
    }

    async horarioDisponivel(medico_id: number, dia: string, horario: string): Promise<boolean> {
        const agenda = await db('agenda')
            .where({ medico_id, dia })
            .first();

        if (!agenda) return false;

        const horarios: string[] = Array.isArray(agenda.horarios)
            ? agenda.horarios
            : JSON.parse(agenda.horarios);

        return horarios.includes(horario);
    }

}