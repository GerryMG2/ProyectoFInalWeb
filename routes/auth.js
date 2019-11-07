var express = require('express');
var router = express.Router();

var userServiceR = require("../services/userService");
const authController = require('../controllers/authController')


/* GET home page. */



router.get('/',authController.loginGet );

router.post('/',authController.loginPost );



module.exports = router;


