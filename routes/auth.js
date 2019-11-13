var express = require('express');
var router = express.Router();

const authController = require('../controllers/authController');
const main_page = require('../auth/main_page')

/* GET home page. */



router.get('/', main_page,authController.loginGet);

router.post('/',authController.loginPost );



module.exports = router;


