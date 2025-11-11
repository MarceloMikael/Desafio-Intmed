import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('medico', (table) => {
    table.increments('id').primary();
    table.string('nome', 255).notNullable();
    table.string('crm', 50).notNullable().unique();
    table.string('email', 255).notNullable();
    table
      .integer('especialidade_id')
      .notNullable()
      .references('id')
      .inTable('especialidade')
      .onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('medico');
}

