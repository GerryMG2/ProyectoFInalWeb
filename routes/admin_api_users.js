var express = require('express');
var router = express.Router();
var auth = require('../auth/auth')
const adminUserApi = require('../controllers/api_admin_users');
/* GET home page. */
router.get('/encargados', auth , adminUserApi.getSuperUsers);


module.exports = router;
