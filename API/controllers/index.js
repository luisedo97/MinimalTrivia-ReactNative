const express = require('express');
let router = express.Router();

router.use('/session', require('./session'));
router.use('/register', require('./register'));
//router.use('/search', require('./search'));

module.exports = router;