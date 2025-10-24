// swagger.config.js
// Usando module.exports para ser compatível com o import no server.ts
module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'API do Desafio ASCII - Produtos',
    version: '1.0.0',
    description: 'API REST para o desafio backend, documentada com Swagger.',
  },
  servers: [
    {
      url: 'http://localhost:3000/api', // Nosso servidor base
    },
  ],
  // 1. Definimos a Tag
  tags: [
    {
      name: 'Produtos',
      description: 'API para gerenciamento de produtos',
    },
  ],
  // 2. Definimos os Caminhos (Paths)
  paths: {
    // Rota /produtos
    '/produtos': {
      get: {
        summary: 'Lista todos os produtos',
        tags: ['Produtos'],
        responses: {
          '200': {
            description: 'A lista de produtos.',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Produto' },
                },
              },
            },
          },
        },
      },
      post: {
        summary: 'Cria um novo produto',
        tags: ['Produtos'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Produto' },
              example: {
                nome: 'Mouse Gamer',
                preco: 129.99,
                categoria: 'Periféricos',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Produto criado com sucesso.',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Produto' },
              },
            },
          },
          '400': { description: 'Dados inválidos (erro de validação).' },
        },
      },
    },
    // Rota /produtos/{id}
    '/produtos/{id}': {
      get: {
        summary: 'Busca um produto pelo ID',
        tags: ['Produtos'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            schema: { type: 'integer' },
            required: true,
            description: 'O ID do produto',
          },
        ],
        responses: {
          '200': {
            description: 'Os dados do produto.',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Produto' },
              },
            },
          },
          '404': {
            description: 'Produto não encontrado.',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
              },
            },
          },
        },
      },
      put: {
        summary: 'Atualiza um produto pelo ID',
        tags: ['Produtos'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            schema: { type: 'integer' },
            required: true,
            description: 'O ID do produto',
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Produto' },
              example: {
                nome: 'Mouse Gamer Pro',
                preco: 149.99,
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Produto atualizado com sucesso.',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Produto' },
              },
            },
          },
          '404': {
            description: 'Produto não encontrado.',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
              },
            },
          },
        },
      },
      delete: {
        summary: 'Deleta um produto pelo ID',
        tags: ['Produtos'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            schema: { type: 'integer' },
            required: true,
            description: 'O ID do produto',
          },
        ],
        responses: {
          '204': { description: 'Produto deletado com sucesso (Sem conteúdo).' },
          '404': {
            description: 'Produto não encontrado.',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
              },
            },
          },
        },
      },
    },
  },
  // 3. Definimos os Modelos (Schemas)
  components: {
    schemas: {
      Produto: {
        type: 'object',
        required: ['nome', 'preco', 'categoria'],
        properties: {
          id: {
            type: 'integer',
            description: 'O ID auto-gerado do produto.',
          },
          nome: { type: 'string', description: 'O nome do produto.' },
          preco: {
            type: 'number',
            format: 'float',
            description: 'O preço do produto.',
          },
          categoria: {
            type: 'string',
            description: 'A categoria do produto.',
          },
        },
        example: {
          id: 1,
          nome: 'Teclado Mecânico',
          preco: 399.9,
          categoria: 'Periféricos',
        },
      },
      Error: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            description: 'A mensagem de erro.',
          },
        },
        example: { message: 'Produto não encontrado' },
      },
    },
  },
};