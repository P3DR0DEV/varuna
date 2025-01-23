import { PrismaClient } from '@prisma/client'

const globalForPrisma = global
const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

async function seed() {}

seed().then(() => {
  console.log('[database]: Seeded!')
})
