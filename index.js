import Server from './src/models/Server.js';
import dotenv from 'dotenv';

dotenv.config();

const server = new Server();
server.listen();
