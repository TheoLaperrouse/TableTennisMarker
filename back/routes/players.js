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
        const { table_id, name, sets, points } = req.body;

        if (!table_id || !name) {
            return res.status(400).json({ error: 'Table ID et nom du joueur sont requis' });
        }

        try {
            const [id] = await db('players')
                .insert({ table_id, name, sets: sets || 0, points: points || 0 })
                .returning('id');

            const newPlayer = await db('players').where({ id }).first();
            res.status(201).json(newPlayer);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erreur lors de l’ajout du joueur' });
        }
    });

    return router;
}
