import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('consulta', (table) => {
    table.increments('id').primary();
    table.date('dia').notNullable();
    table.time('horario').notNullable();
    table
      .timestamp('data_agendamento', { useTz: true })
      .defaultTo(knex.fn.now());
    table
      .integer('medico_id')
      .notNullable()
      .references('id')
      .inTable('medico')
      .onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('consulta');
}

