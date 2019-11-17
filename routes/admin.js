var express = require('express');
var router = express.Router();
var admin = require('../auth/adminAuth');
var auth = require('../auth/auth');
const lab = require('../controllers/admin_controller');

/* GET home page. */
router.get('/laboratorios', auth,admin, lab.laboratorios);
router.get('/secondUsers', auth, admin, lab.secondsUsers);


module.exports = router;
