import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET /api/checkinLog/list
export default async function handle(req, res) {
    const result = await prisma.checkinLog.findMany({})
    res.json(result)
}