// src/config/singleton.ts
import { PrismaClient } from '@prisma/client';
import { mockDeep, mockReset } from 'jest-mock-extended';
import { prisma } from '../lib/prisma'; 

jest.mock('../lib/prisma', () => ({
  __esModule: true,
  prisma: mockDeep<PrismaClient>(),
}));

export const mockedPrisma = prisma as jest.Mocked<typeof prisma>;


beforeEach(() => {
  mockReset(mockedPrisma);
});