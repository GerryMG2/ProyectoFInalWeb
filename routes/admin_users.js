var express = require('express');
var router = express.Router();
var admin = require('../auth/adminAuth')
const adminUsers = require('../controllers/api_admin_users');

/* GET home page. */
router.get('/encargados', admin, adminUsers.getSuperUsers);
router.get('/', admin, adminUsers.getUsers);
router.put('/', admin, adminUsers.updateUser);
router.delete('/', admin, adminUsers.deleteUser);

module.exports = router;
