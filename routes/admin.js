var express = require('express');
var router = express.Router();
var auth = require('../auth/auth')
const lab = require('../controllers/admin_controller')

/* GET home page. */
router.get('/laboratorios', auth, lab.laboratorios);


module.exports = router;
