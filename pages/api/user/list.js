import { PrismaClient } from '@prisma/client'

import { authMiddleware, runMiddleware } from '../../../util/apiMiddlewares'

const prisma = new PrismaClient()

// GET /api/user/list
export default async function handle(req, res) {
    await runMiddleware(req, res, authMiddleware);

    const result = await prisma.user.findMany({})
    res.json(result)
}