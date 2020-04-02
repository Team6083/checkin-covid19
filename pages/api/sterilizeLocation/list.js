import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET /api/sterilizeLocation/list
export default async function handle(req, res) {
    const result = await prisma.sterilizeLocation.findMany({ include: { sterilizeLogs: true } })
    res.json({ ok: true, result })
}