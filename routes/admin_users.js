var express = require('express');
var router = express.Router();
var admin = require('../auth/adminAuth');
const adminUsers = require('../controllers/api_admin_users');
var auth = require('../auth/auth');


/* GET home page. */
router.get('/encargados', admin, adminUsers.getSuperUsers);
router.get('/', admin, adminUsers.getUsers);
router.put('/', admin, adminUsers.updateUser);
router.delete('/', admin, adminUsers.deleteUser);
router.post('/password',auth,adminUsers.updatePass);
router.post('/email',auth,adminUsers.updateEmail);
module.exports = router;
