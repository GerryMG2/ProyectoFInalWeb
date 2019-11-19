var express = require('express');
var router = express.Router();
var auth = require('../auth/auth')
const indexG = require('../controllers/api_admin_reservas');
/* GET home page. */
router.post('/', auth , indexG.createRes);

module.exports = router;
