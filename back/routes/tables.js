import express from 'express';

const router = express.Router();

export default function (db, io) {
    router.get('/', async (req, res) => {
        try {
            const tables = await db('tables').select('*');
            const players = await db('players').select('*');

            const data = tables.map((table) => ({
                ...table,
                players: players.filter((player) => player.table_id === table.id),
            }));

            res.json(data);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erreur lors de la récupération des tables' });
        }
    });

    router.post('/', async (req, res) => {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'Le nom de la table est requis' });
        }

        try {
            const [id] = await db('tables').insert({ name }).returning('id');
            const newTable = await db('tables').where({ id }).first();
            res.status(201).json(newTable);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erreur lors de l’ajout de la table' });
        }
    });

    router.post('/:id', async (req, res) => {
        const tableId = parseInt(req.params.id);
        const { players } = req.body;

        try {
            const table = await db('tables').where({ id: tableId }).first();

            if (!table) {
                return res.status(404).json({ error: 'Table non trouvée' });
            }

            await db('players').where({ table_id: tableId }).del();

            const newPlayers = players.map((player) => ({
                table_id: tableId,
                name: player.name || '',
                sets: player.sets || 0,
                points: player.points || 0,
            }));

            await db('players').insert(newPlayers);

            const updatedTables = await db('tables').select('*');
            const updatedPlayers = await db('players').select('*');
            const data = updatedTables.map((table) => ({
                ...table,
                players: updatedPlayers.filter((player) => player.table_id === table.id),
            }));

            io.emit('update', data);

            res.json({ success: true, table: { ...table, players: newPlayers } });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erreur lors de la mise à jour de la table' });
        }
    });

    return router;
}
