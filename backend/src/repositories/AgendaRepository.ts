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

    async getByMedicoId(medico_id: number): Promise<Agenda[] | undefined> {
        return db('agenda')
            .where('agenda.medico_id', medico_id)
            .select('*')
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

    async getById(id: number): Promise<Agenda[]> {
        return db('agenda').where('id', id).select('*');
    }

    async removerHorarioDaAgenda(medico_id: number, dia: string, horario: string): Promise<void> {
        const agenda = await db('agenda')
            .where({ medico_id, dia })
            .first();

        if (!agenda) return;

        const horarios = Array.isArray(agenda.horarios)
            ? agenda.horarios
            : JSON.parse(agenda.horarios);
            
        const novosHorarios = horarios.filter((h: string) => h !== horario);

        await db('agenda')
            .where({ medico_id, dia })
            .update({
                horarios: `{${novosHorarios.join(',')}}`,
            })
    }

    async adicionarHorarioNaAgenda(
        medico_id: number,
        dia: string,
        horario: string
        ): Promise<void> {
        const agenda = await db('agenda')
            .where({ medico_id, dia })
            .first();

        const horarios: string[] = Array.isArray(agenda.horarios)
            ? agenda.horarios
            : agenda.horarios.replace(/[{}]/g, '').split(',').filter(Boolean);

        horarios.push(horario)
        horarios.sort()

        const postgresArray = `{${horarios.join(',')}}`;

        await db('agenda')
            .where({ medico_id, dia })
            .update({ horarios: postgresArray });
    }


}