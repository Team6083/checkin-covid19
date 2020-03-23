import { PrismaClient } from '@prisma/client'

import { authMiddleware, runMiddleware } from '../../../util/apiMiddlewares'

const prisma = new PrismaClient()

// POST /api/user/create
export default async function handle(req, res) {
    await runMiddleware(req, res, authMiddleware);

    const { studentId, name } = JSON.parse(req.body);

    if (!studentId || !name) {
        res.status(400).json({ ok: false, error: "missing_field" });
        return;
    }

    const result = await prisma.user.create({
        data: {
            studentNumber: studentId,
            name
        }
    })

    res.json({ ok: true, result });
}