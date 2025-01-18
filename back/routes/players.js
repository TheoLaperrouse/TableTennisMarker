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
