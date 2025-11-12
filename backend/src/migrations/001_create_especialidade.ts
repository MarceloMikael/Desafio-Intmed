import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('especialidade', (table) => {
    table.increments('id').primary();
    table.string('nome', 100).notNullable().unique();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('especialidade');
}

