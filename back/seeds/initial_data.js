export const seed = async function (knex) {
    await knex('players').del();
    await knex('tables').del();

    const tableIds = await knex('tables')
        .insert([{ name: 'Table 1' }, { name: 'Table 2' }])
        .returning('id');

    await knex('players').insert([
        { name: 'Kévin Rouzet', table_id: tableIds[0].id, sets: 2, points: 4, ranking: 2251, first_server: true },
        { name: 'Martin Chauveau', table_id: tableIds[0].id, sets: 0, points: 8, ranking: 2129, first_server: false },
        { name: 'Germain Bourcier', table_id: tableIds[1].id, sets: 2, points: 5, ranking: 1875, first_server: true },
        {
            name: 'Jean-Philippe Allard',
            table_id: tableIds[1].id,
            sets: 0,
            points: 7,
            ranking: 1936,
            first_server: false,
        },
    ]);
};
