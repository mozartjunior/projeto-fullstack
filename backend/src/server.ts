import 'reflect-metadata';
import express from 'express';
import 'dotenv/config';
import { appDataSource } from './database/appDataSource.js';
// import routes from './routes/index.js';
// import { errorHandler } from './middlewares/errorHandler.js';

const app = express();
const PORT = process.env.PORT ?? 5432;

app.use(express.json());
// app.use(routes);
// app.use(errorHandler);

appDataSource.initialize()
        .then(() => {
            console.log('banco conectado')
            app.listen(PORT, () => {
            console.log(`Server is running in PORT: ${PORT}`)
        })
        })
        .catch((error) => {
            console.log(error)
        })