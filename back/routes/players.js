import express from 'express';

const router = express.Router();

export default function (db) {
    router.get('/', async (req, res) => {
        try {
            const players = await db('players').select('*');
            res.json(players);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erreur lors de la récupération des joueurs' });
        }
    });

    router.post('/', async (req, res) => {
        const { table_id, name, sets, points, ranking } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'Nom du joueur sont requis' });
        }

        try {
            const newPlayer = await db('players')
                .insert({ table_id, name, sets: sets || 0, points: points || 0, ranking })
                .returning('*');

            res.status(201).json(newPlayer);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erreur lors de l’ajout du joueur' });
        }
    });

    router.put('/:id', async (req, res) => {
        const { id } = req.params;
        const { sets, points, firstServer, tableId } = req.body;

        if (firstServer && tableId) {
            await db('players').where({ table_id: tableId }).update({ first_server: false });
            await db('players').where({ id, table_id: tableId }).update({ first_server: true });
        }

        try {
            const [updatedPlayer] = await db('players')
                .where({ id })
                .update({
                    ...(sets !== undefined && sets >= 0 && { sets }),
                    ...(points !== undefined && points >= 0 && { points }),
                    ...(firstServer !== undefined && { first_server: firstServer }),
                })
                .returning('*');

            if (updatedPlayer) {
                res.json(updatedPlayer);
            } else {
                res.status(404).json({ error: 'Joueur introuvable' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erreur lors de la mise à jour du joueur' });
        }
    });

    router.delete('/:id', async (req, res) => {
        const { id } = req.params;

        try {
            const deletedRows = await db('players').where({ id }).del();

            if (deletedRows) {
                res.json({ success: true, message: 'Joueur supprimé avec succès' });
            } else {
                res.status(404).json({ error: 'Joueur introuvable' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erreur lors de la suppression du joueur' });
        }
    });

    return router;
}
