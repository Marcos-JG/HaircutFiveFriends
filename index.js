import express from 'express';
import dotenv from 'dotenv';
import invoiceRoutes from './src/invoice/invoice.routes.js';

dotenv.config();

const app = express(); // 👈 MUY IMPORTANTE LOS ()

app.use(express.json());

app.use('/api/invoice', invoiceRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
























//import dotenv from 'dotenv';
//import { initServer } from './configs/app.js';
//import invoiceRoutes from './src/invoice/invoice.routes.js';
//import statisticsRoutes from './src/statistics/statistics.routes.js';

//dotenv.config();

//const app = initServer(); // 👈 importante

//app.use('/api/invoice', invoiceRoutes);
//app.use('/api/statistics', statisticsRoutes);

//dotenv.config();

//initServer();
