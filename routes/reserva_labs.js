var express = require('express');
var router = express.Router();
const page_reserva = require('../auth/auth');
var reservaController = require("../controllers/users_controller");

router.get('/', page_reserva, reservaController.reservas);

module.exports = router;