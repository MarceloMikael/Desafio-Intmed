import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('agenda', (table) => {
    table.increments('id').primary();
    table
      .integer('medico_id')
      .notNullable()
      .references('id')
      .inTable('medico')
      .onDelete('CASCADE');
    table.date('dia').notNullable();
    table.specificType('horarios', 'TEXT[]').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('agenda');
}

