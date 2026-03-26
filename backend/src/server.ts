import 'reflect-metadata';
import app from './app.js';
import express from 'express';
import 'dotenv/config';
import { appDataSource } from './database/appDataSource.js';
import equipamentoRoutes from './routes/equipamento.routes.js'
// import routes from './routes/index.js';
// import { errorHandler } from './middlewares/errorHandler.js';

// const app = express();
const PORT = process.env.PORT ?? 6060;

app.use(express.json());
app.use(equipamentoRoutes);
// app.use(errorHandler);

appDataSource.initialize()
        .then(() => {
            console.log('Conexão com o banco de dados estabelecida com sucesso!');
            
            app.listen(PORT, () => {
            console.log(`Server is running in PORT: ${PORT}`)
            });
        })
        .catch((error) => {
            console.log("Erro ao inciar aplicacao: ", error)
        })