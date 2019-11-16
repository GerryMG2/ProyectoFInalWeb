var express = require('express');
var router = express.Router();
var admin = require('../auth/adminAuth')
const admin_labos = require('../controllers/api_admin_labos')

/* GET home page. */
router.get('/', admin, admin_labos.getLaboratorios);
router.post("/", admin, admin_labos.createLab);
router.put("/", admin, admin_labos.updateLab);
router.delete("/",admin,admin_labos.deleteLab);


module.exports = router;
