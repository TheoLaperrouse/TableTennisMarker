import express from 'express';

const router = express.Router();

export default function (db) {
    router.post('/', async (req, res) => {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ error: "Le nom de l'équipe est requis" });
        }

        try {
            const team = await db('teams').insert({ name }).returning('*');
            res.status(201).json(team);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erreur lors de la création de l'équipe" });
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
