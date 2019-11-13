var express = require('express');
var router = express.Router();
var auth = require('../auth/auth')
const admin_labos = require('../controllers/api_admin_labos')

/* GET home page. */
router.get('/', auth, admin_labos.admin_laboratorios);


module.exports = router;
