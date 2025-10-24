# Desafio Backend - ASCII Soluções em Tecnologia

API REST desenvolvida para o desafio de backend da ASCII. O objetivo foi criar um CRUD completo para gerenciar produtos, seguindo as melhores práticas de arquitetura de software, incluindo separação de camadas, validação de dados, documentação e testes unitários.

## ✨ Recursos Implementados

Este projeto cumpre todos os requisitos obrigatórios e diferenciais propostos:

-   **API REST:** CRUD completo para `Produtos`.
-   **Arquitetura em Camadas:** Projeto estruturado em `Controllers`, `Services` e `DTOs`.
-   **Banco de Dados:** Integração com PostgreSQL utilizando o ORM **Prisma**.
-   **Validação de Dados:** Uso de DTOs (`class-validator` e `class-transformer`) para garantir que os dados de entrada sejam válidos.
-   **Documentação:** API documentada com **Swagger (OpenAPI)**.
-   **Testes:** Testes unitários para a camada de serviço (`ProdutoService`) utilizing **Jest**.

## 🛠️ Tecnologias Utilizadas

-   Node.js
-   TypeScript
-   Express.js
-   Prisma (ORM)
-   PostgreSQL
-   Swagger (para documentação)
-   Jest (para testes unitários)

## 🚀 Como Rodar o Projeto Localmente

Siga os passos abaixo para executar a aplicação na sua máquina.

### Pré-requisitos

-   [Node.js](https://nodejs.org/en/) (v18 ou superior)
-   [npm](https://www.npmjs.com/) (geralmente instalado com o Node.js)
-   [Git](https://git-scm.com/)
-   Uma instância do **PostgreSQL** rodando localmente.

### Passo a Passo

1.  **Clone o repositório:**
    ```bash
    # Substitua pela URL do seu repositório público no GitHub
    git clone [https://github.com/seu-usuario/desafio-backend-ascii.git](https://github.com/seu-usuario/desafio-backend-ascii.git)
    ```

2.  **Entre na pasta do projeto:**
    ```bash
    cd desafio-backend-ascii
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Configure o Banco de Dados (.env):**
    Crie um arquivo chamado `.env` na raiz do projeto. Você pode copiar o conteúdo do seu arquivo `.env` local, que deve se parecer com isto:

    ```env
    # Certifique-se de que o usuário, senha, porta e nome do banco correspondem à sua configuração local do PostgreSQL.
    DATABASE_URL="postgresql://postgres:root@localhost:5432/desafio_ascii?schema=public"
    ```
    *Importante: Você precisa criar manualmente o banco de dados `desafio_ascii` no seu PostgreSQL para que o próximo passo funcione.*

5.  **Rode as Migrations do Prisma:**
    Este comando irá ler o arquivo `prisma/schema.prisma` e criar as tabelas necessárias no seu banco de dados.
    ```bash
    npx prisma migrate dev
    ```

6.  **Gere o Cliente Prisma:**
    (A migration geralmente faz isso, mas é uma boa prática rodar para garantir)
    ```bash
    npx prisma generate
    ```

7.  **Inicie o Servidor:**
    ```bash
    npx nodemon
    ```

8.  **Pronto!**
    O servidor estará rodando. O terminal deve exibir:
    ```
    [servidor]: Servidor rodando em http://localhost:3000
    [documentação]: Documentação disponível em http://localhost:3000/api-docs
    ```


## 🧪 Executando os Testes Unitários

Para verificar a integridade da lógica de negócio na camada de serviço, execute:

```bash
npm test
Você verá o resultado dos testes passando no terminal, similar a: Tests: 6 passed, 6 total
```
## 📖 Documentação da API (Swagger)
Com o servidor rodando (npx nodemon), você pode acessar a documentação interativa da API no seu navegador:

http://localhost:3000/api-docs

Nesta página, você pode ver todos os endpoints, seus parâmetros, o que eles esperam de entrada (body) e quais são as respostas possíveis. Você também pode usar o botão "Try it out" para testar a API diretamente do navegado
