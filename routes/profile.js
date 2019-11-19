var express = require('express');
var router = express.Router();
var auth = require('../auth/auth')
const profileG = require('../controllers/profile_controller');
/* GET home page. */
router.get('/', auth , profileG.profileGet);


module.exports = router;
