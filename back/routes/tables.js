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
            const newTable = await db('tables').insert({ name }).returning('*');
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

            const newPlayers = await db('players')
                .whereIn('id', players)
                .update({
                    sets: 0,
                    points: 0,
                    table_id: tableId,
                })
                .returning('*');

            io.emit('update', data);

            res.json({ table, newPlayers });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erreur lors de la mise à jour de la table' });
        }
    });

    router.delete('/:id', async (req, res) => {
        const { id } = req.params;

        try {
            await db('teams').where('id', id).del();
            res.status(204).end();
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erreur lors de la suppression de l'équipe" });
        }
    });

    return router;
}
