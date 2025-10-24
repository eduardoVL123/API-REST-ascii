// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';

// para que toda a aplicação compartilhe a mesma conexão.
export const prisma = new PrismaClient();