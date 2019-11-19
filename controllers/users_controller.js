async function reservas(req, res) {
  res.render("reserva_page", { usad: req.session.superUser, title: "Reservas", msg: "" });
}

module.exports.reservas = reservas;

