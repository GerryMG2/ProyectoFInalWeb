var express = require('express');
var router = express.Router();
var auth = require('../auth/auth')
const indexG = require('../controllers/indexController');
/* GET home page. */
router.get('/main', auth , indexG.indexGet);
router.get('/', indexG.defaultPage);


module.exports = router;
