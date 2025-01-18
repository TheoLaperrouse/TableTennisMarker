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

app.use('/api/tables', tablesRouter(db));
app.use('/api/players', playersRouter(db));

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('joinTable', (tableId) => {
        socket.join(`table_${tableId}`);
        console.log(`User joined table ${tableId}`);
    });

    socket.on('leaveTable', (tableId) => {
        socket.leave(`table_${tableId}`);
        console.log(`User left table ${tableId}`);
    });

    socket.on('updateScore', async (data) => {
        const { tableId, playerId, type, value } = data;
        try {
            await db('players').where({ id: playerId }).increment(type, value);
            io.to(`table_${tableId}`).emit('scoreUpdated', { playerId, type, value });
        } catch (error) {
            console.error('Error updating score:', error);
        }
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(3000, () => {
    console.log('Backend API disponible sur http://localhost:3000');
});
