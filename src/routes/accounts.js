const express = require("express");
const router = express.Router();
const auth =require('../middleware/auth')
const {login,dashboard,register} = require('../controllers/accounts')


router.route('/').get(auth,dashboard)
router.route('/login').post(login);
router.route('/register').post(register);
module.exports = router