// src/services/ProdutoService.spec.ts
import { ProdutoService } from './ProdutoService';
import { mockedPrisma } from '../config/singleton'; 
import { CreateProdutoDto } from '../dtos/CreateProduto.dto';
import { UpdateProdutoDto } from '../dtos/UpdateProduto.dto';


describe('ProdutoService', () => {
  let produtoService: ProdutoService;

  // Cria uma nova instância do serviço antes de cada teste
  beforeEach(() => {
    produtoService = new ProdutoService();
  });

  // --- Teste 1: findAll
  it('deve listar todos os produtos', async () => {
 
    const mockProdutos = [
      {
        id: 1,
        nome: 'Produto Teste 1',
        preco: 10.0,
        categoria: 'Teste',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    (mockedPrisma.produto.findMany as jest.Mock).mockResolvedValue(mockProdutos);

  
    const produtos = await produtoService.findAll();

    
    expect(produtos).toEqual(mockProdutos);
    expect(mockedPrisma.produto.findMany).toHaveBeenCalledTimes(1);
  });

  // --- Teste 2: create ---
  it('deve criar um novo produto', async () => {
    
    const createDto: CreateProdutoDto = {
      nome: 'Produto Novo',
      preco: 50.0,
      categoria: 'Novo',
    };
    
    const mockProdutoCriado = {
      id: 2,
      ...createDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    (mockedPrisma.produto.create as jest.Mock).mockResolvedValue(mockProdutoCriado);

   
    const produto = await produtoService.create(createDto);

    
    expect(produto).toEqual(mockProdutoCriado);
    expect(mockedPrisma.produto.create).toHaveBeenCalledWith({
      data: createDto,
    });
  });

  // --- Teste 3: findOne 
  it('deve encontrar um produto pelo id', async () => {
   
    const mockProduto = {
      id: 1,
      nome: 'Produto Teste 1',
      preco: 10.0,
      categoria: 'Teste',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    (mockedPrisma.produto.findUnique as jest.Mock).mockResolvedValue(mockProduto);

  
    const produto = await produtoService.findOne(1);

    
    expect(produto).toEqual(mockProduto);
    expect(mockedPrisma.produto.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });

  // --- Teste 4: findOne 
  it('deve lançar um erro se o produto não for encontrado', async () => {
    
    (mockedPrisma.produto.findUnique as jest.Mock).mockResolvedValue(null);

   
    await expect(produtoService.findOne(99)).rejects.toThrow(
      'Produto não encontrado',
    );
  });

  // --- Teste 5: update ---
  it('deve atualizar um produto', async () => {
  
    const updateDto: UpdateProdutoDto = { preco: 15.0 };
    const mockProdutoOriginal = {
      id: 1,
      nome: 'Produto Teste 1',
      preco: 10.0,
      categoria: 'Teste',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const mockProdutoAtualizado = {
      ...mockProdutoOriginal,
      ...updateDto,
      updatedAt: new Date(),
    };

    
    (mockedPrisma.produto.findUnique as jest.Mock).mockResolvedValue(mockProdutoOriginal);
    // Mockamos a chamada 'update'
    (mockedPrisma.produto.update as jest.Mock).mockResolvedValue(mockProdutoAtualizado);

   
    const produto = await produtoService.update(1, updateDto);

    
    expect(produto).toEqual(mockProdutoAtualizado);
    expect(mockedPrisma.produto.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(mockedPrisma.produto.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: updateDto,
    });
  });

  // --- Teste 6: delete ---
  it('deve deletar um produto', async () => {
    
    const mockProduto = {
      id: 1,
      nome: 'Produto Teste 1',
      preco: 10.0,
      categoria: 'Teste',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    (mockedPrisma.produto.findUnique as jest.Mock).mockResolvedValue(mockProduto);
    // Mockamos a chamada 'delete' (ela não precisa retornar nada específico)
    (mockedPrisma.produto.delete as jest.Mock).mockResolvedValue(mockProduto);

    // Act
    await produtoService.delete(1);

    
    // Verificamos se ambas as funções do Prisma foram chamadas
    expect(mockedPrisma.produto.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(mockedPrisma.produto.delete).toHaveBeenCalledWith({ where: { id: 1 } });
  });
});