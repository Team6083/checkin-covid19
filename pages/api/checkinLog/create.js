import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// POST /api/checkinLog/create
export default async function handle(req, res) {
    const { studentId, temperature } = JSON.parse(req.body);

    if (!studentId || !temperature) {
        res.status(400).json({ ok: false, error: "missing_field" });
        return;
    }

    const user = await prisma.user.findOne({
        where: {
            studentNumber: studentId
        }
    })

    if (!user) {
        res.status(422).json({ ok: false, error: "user_not_found" })
        return
    }

    const result = await prisma.checkinLog.create({
        data: {
            user: {
                connect: { studentNumber: user.studentNumber }
            },
            checkinAt: new Date(),
            temperature
        }
    })

    res.json({ ok: true, result })
}