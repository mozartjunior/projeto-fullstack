import 'reflect-metadata';
import 'dotenv/config';
import { appDataSource } from './database/appDataSource.js';
import app from './app.js';

const PORT = process.env.PORT ?? 6060;

appDataSource.initialize()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
    app.listen(PORT, () => {
      console.log(`Server is running in PORT: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Erro ao iniciar aplicação: ", error);
  });