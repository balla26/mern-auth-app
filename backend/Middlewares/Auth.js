const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req, res, next) => {
    const auth = req.headers['authorization'];
    if(!auth) {
        return res.status(400).json({
            message: 'Unauthorized access, JWT token is required',
        })
    } try {
        const decoded = jwt.verify(auth, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(400).json({
            message: 'JWT token is expired or invalid',
        })
    }
}

module.exports = ensureAuthenticated;