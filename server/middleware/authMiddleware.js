const jwt = require('jsonwebtoken');

module.exports = function (reg, res, next) {
    if (reg.method === "OPTIONS") {
        next()
    }
    try {
        const token = reg.headers.authorization.split( ' ')[1];
        if (!token) {
            return res.status(401).json({message: "Не авторизован"})
        }
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        reg.user = decode;
        next()
    } catch (e) {
        return res.status(401).json({message: "Не авторизован"})
    }
};
