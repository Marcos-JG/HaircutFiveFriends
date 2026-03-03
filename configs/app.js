'use strict';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import multer from 'multer';
import { dbConnection } from './db.js';
import { corsOptions } from './cors-configuration.js';
import { helmetConfiguration } from './helmet-configuration.js';
import clientRoutes from '../src/client/client.routes.js';
import barberRoutes from '../src/barber/barber.routes.js';
import favoritesRoutes from '../src/favorites/favorites.routes.js';

const BASE_PATH = '/HaircutFiveFriends/api/v1';

const middlewares = (app) => {
    app.use(express.urlencoded({ extended: false, limit: '10mb' }));
    app.use(express.json({ limit: '10mb' }))
    // parse multipart/form-data (e.g., form-data from Postman)
    const upload = multer();
    app.use(upload.any());
    app.use(cors(corsOptions));
    app.use(helmet(helmetConfiguration));
    app.use(morgan('dev'));
}

const routes = (app) => {
    app.get(`${BASE_PATH}/Health`, (request, response) => {
        response.status(200).json({
            status: 'Healthy',
            timestamp: new Date().toISOString(),
            service: 'Gestor de Barberia Admin Server',
        });

    })
    app.use(`${BASE_PATH}/clients`, clientRoutes);
    app.use(`${BASE_PATH}/barbers`, barberRoutes);
    app.use(`${BASE_PATH}/favorites`, favoritesRoutes);
    app.use((req, res) => {
        res.status(404).json({
            success: false,
            message: 'Endpoint not found',
        })
    })
}

export const initServer = async () => {
    const app = express();
    const PORT = process.env.PORT;
    app.set('trust proxy', 1);

    try {
        await dbConnection();
        middlewares(app);
        routes(app);

        app.listen(PORT, () => {
            console.log(`Gestor de Opiniones Admin server is running on port ${PORT}`);
            console.log(`Health check: http://localhost:${PORT}${BASE_PATH}/Health`);
        });

    } catch (error) {
        console.error(`Error starting admin server: ${error.message}`);
        process.exit(1);
    }
}