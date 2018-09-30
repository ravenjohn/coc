const express = require('express');
const multisys = require('./controllers/multisys');
const router = express.Router();


router.post('/register', multisys.register);

module.exports = router;
