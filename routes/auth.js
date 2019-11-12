var express = require('express');
var router = express.Router();

const authController = require('../controllers/authController')


/* GET home page. */



router.get('/',authController.loginGet);

router.post('/',authController.loginPost );



module.exports = router;


