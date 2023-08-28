const express = require("express");
const router = express.Router();
const auth =require('../middleware/auth')
const {login,dashboard} = require('../controllers/accounts')

router.route('/').get(auth,dashboard)
router.route('/login').post(login);
module.exports = router