
const jwt = require("jsonwebtoken")
const { JWT_SECRET_KEY } = require("../config/index")

class JwtService {
    generateToken(user = {}) {
        const { _id } = user
        const token = jwt.sign({ _id }, JWT_SECRET_KEY)
        return token
    }

    verifyToken(token = null) {
        const { _id } = jwt.verify(token, JWT_SECRET_KEY)
        return _id
    }

    getTokenFormHeaders(headers) {
        const authorizationHeader = headers['authorization'];
        if (!authorizationHeader || !authorizationHeader.startsWith('Bearer')) {
            throw new CustomError(401, `Unauthorized or No token provided`)
        }
        const token = authorizationHeader.split(' ')[1]
        return token
    }

}

module.exports = new JwtService()