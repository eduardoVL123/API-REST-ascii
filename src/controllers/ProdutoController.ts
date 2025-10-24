// src/controllers/ProdutoController.ts

import { Request, Response } from 'express'; // Tipos do Express
import { ProdutoService } from '../services/ProdutoService'; 
import { CreateProdutoDto } from '../dtos/CreateProduto.dto';
import { UpdateProdutoDto } from '../dtos/UpdateProduto.dto';

import { validate } from 'class-validator'; 
import { plainToClass } from 'class-transformer'; 

export class ProdutoController {
  private produtoService: ProdutoService;

  constructor() {
    this.produtoService = new ProdutoService();
  }

  // --- 1. CRIAR PRODUTO ---
  // (POST /api/produtos)
  create = async (req: Request, res: Response): Promise<Response> => {
    // 1. Converte o 'body' (JSON) para a nossa classe DTO
    const createDto = plainToClass(CreateProdutoDto, req.body);

    // 2. Valida o DTO
    const errors = await validate(createDto);
    if (errors.length > 0) {
      // Se houver erros, retorna 400 (Bad Request) com os erros
      return res.status(400).json(errors);
    }

    try {
      // 3. Chama o serviço para criar
      const produto = await this.produtoService.create(createDto);
      // 201 (Created) é o status correto para POST
      return res.status(201).json(produto);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  };

  // --- 2. LISTAR TODOS OS PRODUTOS ---
  // (GET /api/produtos)
  findAll = async (req: Request, res: Response): Promise<Response> => {
    try {
      const produtos = await this.produtoService.findAll();
      return res.status(200).json(produtos);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  };

  // --- 3. BUSCAR UM PRODUTO POR ID ---
  // (GET /api/produtos/{id})
  findOne = async (req: Request, res: Response): Promise<Response> => {
    // 'req.params.id' é SEMPRE uma string. Convertemos para número.
    const id = parseInt(req.params.id, 10);

    try {
      const produto = await this.produtoService.findOne(id);
      return res.status(200).json(produto);
    } catch (error: any) {
      // Se o serviço disparou 'Produto não encontrado', retornamos 404
      if (error.message === 'Produto não encontrado') {
        return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ message: error.message });
    }
  };

  // --- 4. ATUALIZAR UM PRODUTO ---
  // (PUT /api/produtos/{id})
  update = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id, 10);
    const updateDto = plainToClass(UpdateProdutoDto, req.body);

    // Validamos o DTO de atualização (só valida campos que foram enviados)
    const errors = await validate(updateDto);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    try {
      const produto = await this.produtoService.update(id, updateDto);
      return res.status(200).json(produto);
    } catch (error: any) {
      if (error.message === 'Produto não encontrado') {
        return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ message: error.message });
    }
  };

  // --- 5. DELETAR UM PRODUTO ---
  // (DELETE /api/produtos/{id})
  delete = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id, 10);

    try {
      await this.produtoService.delete(id);
      // 204 (No Content) é o status correto para DELETE
      return res.status(204).send();
    } catch (error: any) {
      if (error.message === 'Produto não encontrado') {
        return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ message: error.message });
    }
  };
}