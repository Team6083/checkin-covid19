import { PrismaClient } from '@prisma/client'

import { authMiddleware, runMiddleware } from '../../../util/apiMiddlewares'

const prisma = new PrismaClient()

// GET /api/admin/revokeToken
export default async function handle(req, res) {
    await runMiddleware(req, res, authMiddleware);

    const { jti } = req.query;

    const result = await prisma.token.delete({ where: { jti } });
    res.json({ ok: true, result })
}