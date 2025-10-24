// src/services/ProdutoService.ts

import { prisma } from '../lib/prisma'; 
import { CreateProdutoDto } from '../dtos/CreateProduto.dto';
import { UpdateProdutoDto } from '../dtos/UpdateProduto.dto'; 

// A classe de serviço que agrupa toda a lógica de negócio
export class ProdutoService {
  // --- 1. CRIAR PRODUTO ---
  async create(data: CreateProdutoDto) {
    // O Prisma vai criar o produto no banco
    // Os dados já foram validados pelo DTO na camada de Controller
    const produto = await prisma.produto.create({
      data: {
        nome: data.nome,
        preco: data.preco, 
        categoria: data.categoria,
      },
    });
    return produto;
  }

  // --- 2. LISTAR TODOS OS PRODUTOS ---
  async findAll() {
    const produtos = await prisma.produto.findMany();
    return produtos;
  }

  // --- 3. BUSCAR UM PRODUTO POR ID ---
  async findOne(id: number) {
    const produto = await prisma.produto.findUnique({
      where: { id: id },
    });

    //Verificar se o produto realmente existe
    if (!produto) {
      throw new Error('Produto não encontrado');
    }

    return produto;
  }

  // --- 4. ATUALIZAR UM PRODUTO ---
  async update(id: number, data: UpdateProdutoDto) {
    // Primeiro, checamos se o produto existe
    await this.findOne(id); 

    
    // 'data' só contém os campos que o usuário enviou (graças ao DTO)
    const produtoAtualizado = await prisma.produto.update({
      where: { id: id },
      data: data,
    });
    return produtoAtualizado;
  }

  // --- 5. DELETAR UM PRODUTO ---
  async delete(id: number) {
    // Primeiro, checamos se o produto existe
    await this.findOne(id); 
    // O Prisma deleta o produto
    await prisma.produto.delete({
      where: { id: id },
    });

    
  }
}