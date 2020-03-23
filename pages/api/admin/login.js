import { PrismaClient } from '@prisma/client'

import { JWT, JWK } from 'jose'
import crypto from 'crypto'
import UUIDGen from '../../../util/uuid'

const key = JWK.asKey({
    kty: 'oct',
    k: process.env.JWK_KEY
})

const prisma = new PrismaClient()

// POST /api/admin/login
export default async function handle(req, res) {
    const { userName, password } = req.body;

    const user = await prisma.adminAccounts.findOne({ where: { userName } });

    if (!user) {
        res.status(401).json({ ok: false, error: "user_not_found" });
        return
    }

    const hash = crypto.createHash('sha256');
    const hexHash = hash.update(password + user.salt).digest('hex');
    if (user.passwordHash !== hexHash) {
        res.status(401).json({ ok: false, error: "incorrect_password" });
        return
    }

    const token = JWT.sign({ userName: user.userName, id: user.id, scopes: "web" }, key, {
        issuer: `${user.id}`,
        expiresIn: '1 day',
        jti: UUIDGen(),
        header: {
            typ: 'JWT'
        }
    });

    const decoded = JWT.decode(token);

    await prisma.token.create({
        data: {
            jti: decoded.jti,
            iss: {
                connect: {
                    id: user.id
                }
            },
            iat: new Date(decoded.iat * 1000),
            exp: new Date(decoded.exp * 1000),
            scopes: decoded.scopes
        }
    })

    res.json({ ok: true, token });
}