var express = require('express');
var router = express.Router();
var auth = require('../auth/auth')
const admin_labos = require('../controllers/api_admin_labos')

/* GET home page. */
router.get('/', auth, admin_labos.getLaboratorios);
router.post("/", auth, admin_labos.createLab);
router.put("/", auth, admin_labos.updateLab);
router.delete("/",auth,admin_labos.deleteLab);


module.exports = router;
