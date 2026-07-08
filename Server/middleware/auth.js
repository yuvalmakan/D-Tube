const { verifyToken } = require('../jwt')
const KEY = process.env.KEY ?? "19e0cd6a0b6b895d25a1ab8ddb058fe21e1643871b1af23f1e527255c8b28a188e4342a838bcb432b47a8c7639d367ea36b35482c7ee8892c521ac56950d3ed0";

function auth(req, res, next){
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(401).json({ message: "Access denied. No token provided"})
    }
    const token = authHeader.split(' ')[1]

    const verification = verifyToken(token, KEY)

    if (!verification.valid){
        return res.status(403).json({ message: "Wrong token"})
    }

    req.user = verification.payload
    next()
}

module.exports = auth;