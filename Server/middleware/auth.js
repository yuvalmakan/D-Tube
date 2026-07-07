const { verifyToken } = require('../jwt')
const KEY = process.env.KEY

function auth(req, res, next){
    const authHeader = res.body.authorization

    if (!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(401).json({ message: "Access denied. No token provided"})
    }
    const token = authHeader.split(' ')[1]

    const verification = verifyToken(token)

    if (verification.valid){
        return res.status(403).json({ message: "Wrong token"})
    }

    req.user = verification.payload
    next()
}

export default auth;