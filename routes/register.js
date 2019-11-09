
var express = require('express');
var router = express.Router();

var registerController = require("../controllers/registerController");

router.get('/',registerController.register);

router.post('/', registerController.registerP);

module.exports=router;


