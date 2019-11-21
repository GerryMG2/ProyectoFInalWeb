var express = require('express');
var router = express.Router();
var auth = require('../auth/auth');
var admin = require('../auth/adminAuth');
const indexG = require('../controllers/api_admin_reservas');
/* GET home page. */
router.post('/', auth , indexG.createRes);
router.get('/eventos', auth, indexG.getEventos);
router.get('/', admin, indexG.getRes);
router.put('/', admin, indexG.updateRes);
router.delete('/', admin,indexG.deleteRes);


module.exports = router;