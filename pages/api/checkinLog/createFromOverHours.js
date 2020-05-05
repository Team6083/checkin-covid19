import { PrismaClient } from '@prisma/client'

import { authMiddleware, runMiddleware } from '../../../util/apiMiddlewares'

const prisma = new PrismaClient()

// POST /api/checkinLog/createFromOverHours
export default async function handle(req, res) {
    await runMiddleware(req, res, authMiddleware);

    const { studentId, name } = req.body;

    if (!studentId) {
        res.status(400).json({ ok: false, error: "missing_field" });
        return;
    }

    const user = await prisma.user.findOne({
        where: {
            studentNumber: studentId
        }
    })

    if (!user) {
        await prisma.user.create({
            data: {
                studentNumber: studentId,
                name
            }
        });
    }

    const checkinLog = (await prisma.checkinLog.findMany({
        where: {
            user: {
                studentNumber: studentId
            }
        }
    })).filter((v) => {
        return v.checkinAt.toDateString() === new Date().toDateString()
    })

    if (checkinLog.length > 0) {
        res.status(422).json({ ok: false, error: "already_checkin" });
        return
    }

    const result = await prisma.checkinLog.create({
        data: {
            user: {
                connect: { studentNumber: user.studentNumber }
            },
            checkinAt: new Date(),
            temperature: -1
        }
    })

    res.json({ ok: true, result })
}