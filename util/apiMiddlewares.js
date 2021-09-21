import { JWT, JWK } from 'jose'

const key = JWK.asKey({
    kty: 'oct',
    k: process.env.JWK_KEY
})

export const runMiddleware = (req, res, fn) => {
    return new Promise((resolve, reject) => {
        fn(req, res, result => {
            if (result instanceof Error) {
                return reject(result)
            }

            return resolve(result)
        })
    })
}

export const authMiddleware = (req, res, next) => {
    const { token } = req.headers;

    if (token) {
        try {
            JWT.verify(token, key);
            next();
        } catch (e) {
            res.status(403).json({ error: e.message });
        }
    } else {
        res.status(401).json({ ok: false, error: "no_auth" });
    }
}