
var express = require('express');
var router = express.Router();
var auth = require('../auth/auth')

router.get('/',controllerAuth.register);

router.post('/', controllerAuth.registerP);

module.exports=router;


