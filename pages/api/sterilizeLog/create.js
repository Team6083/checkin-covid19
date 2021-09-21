import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// POST /api/sterilizeLog/create
export default async function handle(req, res) {
    // await runMiddleware(req, res, authMiddleware);

    const { studentId, locationIds } = req.body;

    if (!studentId || !locationIds || locationIds.length <= 0) {
        res.status(400).json({ ok: false, error: "missing_field" });
        return;
    }

    const user = await prisma.user.findFirst({
        where: {
            studentNumber: studentId
        }
    })

    if (!user) {
        res.status(422).json({ ok: false, error: "user_not_found" });
        return
    }

    const locationConnect = [];

    locationIds.forEach((v) => locationConnect.push({ id: v }));

    const result = await prisma.sterilizeLog.create({
        data: {
            timestamp: new Date(),
            user: {
                connect: {
                    studentNumber: studentId
                }
            },
            location: {
                connect: locationConnect
            }
        }
    })

    res.json({ ok: true, result })
}