import { PrismaClient } from '@prisma/client'

import { authMiddleware, runMiddleware } from '../../../util/apiMiddlewares'

const prisma = new PrismaClient()

// GET /api/admin/token
export default async function handle(req, res) {
    await runMiddleware(req, res, authMiddleware);

    const { userName } = req.query;

    const result = await prisma.token.findMany({ where: { iss: { userName } } })
    res.json({ ok: true, tokens: result })
}