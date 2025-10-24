// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true, // Garante que os mocks sejam limpos entre os testes
  
  // Aponta para um arquivo que vamos criar para simular o Prisma
  setupFilesAfterEnv: ['<rootDir>/src/config/singleton.ts'],
};