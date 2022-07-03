import express from 'express';
import { conectarDB } from '../config/db.js';
import usuarioRoutes from '../routes/usuarioRoutes.js';
import cors from 'cors';

export default class Server {
  constructor() {
    this.app = express();
    this.port = 4000;
    this.usuariosPath = '/api/usuarios';
    this.databaseConnect();
    this.initCors();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json());
  }

  initCors() {
    this.app.use(cors());
  }

  async databaseConnect() {
    await conectarDB();
  }

  routes() {
    this.app.use(this.usuariosPath, usuarioRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port}`);
    });
  }
}
