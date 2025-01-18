import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import knexConfig from './knexfile.js';
import knex from 'knex';
import tablesRouter from './routes/tables.js';
import playersRouter from './routes/players.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

const db = knex(knexConfig.development);

app.use(cors());
app.use(express.json());

app.use('/api/tables', tablesRouter(db, io));
app.use('/api/players', playersRouter(db));

io.on('connection', (socket) => {
    console.log('Un utilisateur s’est connecté');

    socket.on('disconnect', () => {
        console.log('Un utilisateur s’est déconnecté');
    });
});

server.listen(3000, () => {
    console.log('Backend API disponible sur http://localhost:3000');
});
