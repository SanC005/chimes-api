const express = require("express");
const router = express.Router();

const {login,dashboard} = require('../controllers/accounts')

router.route('/').get(dashboard)
router.route('/login').post(login);
module.exports = router