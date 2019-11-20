async function reservas(req, res) {
  res.render("reserva_page", { usad: req.session.superUser, title: "Reservas", msg: "", usad: req.session.admin });
}

module.exports.reservas = reservas;

