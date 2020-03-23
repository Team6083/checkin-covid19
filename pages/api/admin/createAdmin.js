import { PrismaClient } from '@prisma/client'
import crypto from 'crypto'

import { authMiddleware, runMiddleware } from '../../../util/apiMiddlewares'

const prisma = new PrismaClient()

// POST /api/checkinLog/create
export default async function handle(req, res) {
    await runMiddleware(req, res, authMiddleware);

    const { userName, password } = req.body;

    if (!userName || !password) {
        res.status(400).json({ ok: false, error: "missing_field" });
        return;
    }

    const user = await prisma.adminAccounts.findOne({
        where: {
            userName: userName
        }
    })

    if (user) {
        res.status(400).json({ ok: false, error: "already_exist" });
        return
    }

    const hash = crypto.createHash('sha256');
    const salt = crypto.randomBytes(16).toString();
    const hexHash = hash.update(password + salt).digest('hex');

    const result = await prisma.adminAccounts.create({
        data: {
            userName,
            passwordHash: hexHash,
            salt
        }
    })

    res.json({ ok: true, result })
}