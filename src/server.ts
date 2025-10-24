// src/server.ts


import 'reflect-metadata';
import express from 'express';
import { router } from './routes';
import swaggerUi from 'swagger-ui-express';
import swaggerSpecs = require('../swagger.config.js'); // Importa o objeto pronto



// 4. CRIA A APLICAÇÃO EXPRESS
const app = express();
const PORT = 3000;

app.use(express.json()); // Para o Express entender JSON

// 6. ROTAS DA API
app.use('/api', router);

// 7. ROTAS DA DOCUMENTAÇÃO SWAGGER
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpecs) 
);

// 8. INICIA O SERVIDOR
app.listen(PORT, () => {
  console.log(`[servidor]: Servidor rodando em http://localhost:${PORT}`);
  console.log(
    `[documentação]: Documentação disponível em http://localhost:${PORT}/api-docs`
  );
});