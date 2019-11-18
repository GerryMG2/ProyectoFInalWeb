var express = require('express');
var router = express.Router();
const main_page = require('../auth/main_page')
var registerController = require("../controllers/registerController");

router.get('/', main_page ,registerController.register);

router.post('/', registerController.registerP);

module.exports=router;


