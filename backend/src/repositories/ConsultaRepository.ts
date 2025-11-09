import db from "../config/database";

export interface Consulta {
  id: number;
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
            .whereRaw('(c.dia > CURRENT_DATE) OR (c.dia = CURRENT_DATE and c.horario > CURRENT_TIME)')
            .orderBy([{column: 'c.dia', order: 'asc'}, {column: 'c.horario', order: 'asc'}])
            .select(
            'c.id',
            'c.dia',
            'c.horario',
            'c.data_agendamento',
            db.raw(`
                json_build_object(
                'id', m.id,
                'crm', m.crm,
                'nome', m.nome,
                'email', m.email
                ) as medico
            `)
            );
    }

    async createConsulta(consulta: Consulta): Promise<number[]> {
        return db('consulta').insert(consulta).returning('id');
    }

    async deleteConsulta(id: number): Promise<void> {
        db('consulta').delete(id.toString());
    }

    async medicoExists(medico_id: number): Promise<boolean> {
        const medico = await db("medico").where("id", medico_id).first();
        return !!medico;
    }

    async horarioDisponivel(medico_id: number, dia: string, horario: string): Promise<boolean> {
        const consulta = await db('consulta')
            .where({ medico_id, dia, horario })
            .first();
        return !consulta;
    }

}