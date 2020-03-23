import { PrismaClient } from '@prisma/client'

import { authMiddleware, runMiddleware } from '../../../util/apiMiddlewares'

const prisma = new PrismaClient()

// GET /api/checkinLog/list
export default async function handle(req, res) {
    // await runMiddleware(req, res, authMiddleware);

    const result = (await prisma.checkinLog.findMany({ include: { user: true } })).filter((v) => {
        return v.checkinAt.toDateString() === new Date().toDateString()
    })

    res.json({ ok: true, today: result })
}