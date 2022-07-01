import express from "express";
import {conectarDB} from "../config/db.js";
import usuarioRoutes from '../routes/usuarioRoutes.js';

export default class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 4040;
        this.usuariosPath = '/api/usuarios';
        this.databaseConnect();
    }

    async databaseConnect() {
        await conectarDB();
    }

    routes() {
        this.app.use(this.usuariosPath, usuarioRoutes)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`)
        })
    }
}