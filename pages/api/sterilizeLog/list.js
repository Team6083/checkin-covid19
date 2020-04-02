import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET /api/sterilizeLog/list
export default async function handle(req, res) {
    const result = await prisma.sterilizeLog.findMany({ include: { user: true, location: true } })
    res.json({ ok: true, result })
}