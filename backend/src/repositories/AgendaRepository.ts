import db from "../config/database";

export interface Agenda {
  id?: number;
  medico_id: number;
  dia: string; 
  horarios: string[]; 
}

export class AgendaRepository {

    async getAll(): Promise<Agenda[]> {
        return db("agenda as a")
        .join("medico as m", "a.medico_id", "m.id")
        .whereRaw("(a.dia > CURRENT_DATE OR (a.dia = CURRENT_DATE AND NOT a.horarios = '{}'))")
        .orderBy("a.dia", "asc")
        .select(
            "a.id",
            "a.dia",
            "a.horarios",
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
    
    async getFiltered({
        medicos, 
        crms, 
        data_inicio, 
        data_final
    }:{
        medicos?: number[], 
        crms?: number[],
        data_inicio?: string,
        data_final?: string
    }) {
        const query = db('agenda as a')
            .join('medico as m', 'a.medico_id,', 'm.id')
            .select(
                'a.id',
                'a.dia',
                'a.horarios',
                db.raw(`
                    json_build_object(
                        'id', m.id,
                        'crm', m.crm,
                        'nome', m.nome,
                        'email', m.email
                    ) as medico
                `)
            )

        if (medicos?.length) query.whereIn("m.id", medicos);
        if (crms?.length) query.whereIn("m.crm", crms);
        if (data_inicio) query.where("a.dia", ">=", data_inicio);
        if (data_final) query.where("a.dia", "<=", data_final);

        query.orderBy("a.dia", "asc");

        return query
    }

    async createAgenda(agenda: Agenda): Promise<number[]> {
        return db('agenda')
        .insert({
            medico_id: agenda.medico_id,
            dia: agenda.dia,
            horarios: db.raw(`ARRAY[${agenda.horarios.map(() => '?').join(',')}]::time[]`, agenda.horarios)
        })
        .returning("id");
    }

    async findByMedicoAndDia(medico_id: number, dia: string): Promise<Agenda | undefined> {
        return db('agenda')
        .where({ medico_id, dia })
        .first();
    }

    async medicoExists(medico_id: number): Promise<boolean> {
        const result = await db("medico").where("id", medico_id).first();
        return !!result;
    }

    async hasConsultas(agenda_id: number): Promise<boolean> {
        const consulta = await db("consulta").where("agenda_id", agenda_id).first();
        return !!consulta;
    }

    async deleteAgenda(id: number): Promise<number> {
        return db('agenda').where("id", id).delete();
    }

}