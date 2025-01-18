export const up = async function (knex) {
    await knex.schema.createTable('tables', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
    });

    await knex.schema.createTable('players', (table) => {
        table.increments('id').primary();
        table.integer('table_id').unsigned().references('id').inTable('tables').onDelete('CASCADE');
        table.string('name').notNullable();
        table.integer('sets').defaultTo(0);
        table.integer('points').defaultTo(0);
        table.integer('ranking').defaultTo(500);
    });
};

export const down = async function (knex) {
    await knex.schema.dropTableIfExists('players');
    await knex.schema.dropTableIfExists('tables');
};
