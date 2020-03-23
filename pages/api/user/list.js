import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET /api/user/list
export default async function handle(req, res) {
    const result = await prisma.user.findMany({})
    res.json(result)
}