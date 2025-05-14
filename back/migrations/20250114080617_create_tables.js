export const up = async function (knex) {
    await knex.schema.createTable('teams', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
    });

    await knex.schema.createTable('tables', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
    });

    await knex.schema.createTable('players', (table) => {
        table.increments('id').primary();
        table.integer('table_id').unsigned().references('id').inTable('tables').onDelete('SET NULL').nullable();
        table.integer('team_id').unsigned().references('id').inTable('teams').onDelete('SET NULL').nullable();
        table.string('name').notNullable();
        table.integer('sets').defaultTo(0);
        table.integer('points').defaultTo(0);
        table.integer('ranking').defaultTo(500);
        table.boolean('first_server').defaultTo(false);
    });
};

export const down = async function (knex) {
    await knex.schema.dropTableIfExists('players');
    await knex.schema.dropTableIfExists('tables');
    await knex.schema.dropTableIfExists('teams');
};
