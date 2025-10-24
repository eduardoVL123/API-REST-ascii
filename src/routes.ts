// src/routes.ts

import { Router } from 'express';
import { ProdutoController } from './controllers/ProdutoController';

const router = Router();

// Instancia o controller UMA VEZ
const produtoController = new ProdutoController();

// Conecta os métodos do controller às rotas.
router.post('/produtos', produtoController.create);
router.get('/produtos', produtoController.findAll);
router.get('/produtos/:id', produtoController.findOne);
router.put('/produtos/:id', produtoController.update);
router.delete('/produtos/:id', produtoController.delete);

export { router };