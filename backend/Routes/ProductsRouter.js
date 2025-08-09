const ensureAuthenticated = require('../Middlewares/Auth');

const router = require('express').Router();

router.get('/', ensureAuthenticated, (req, res) => {
    res.status(200).json([
        { id: 1, name: 'Laptop', price: 50000 },
        { id: 2, name: 'Mobile', price: 25000 },
    ])
});

module.exports = router;





