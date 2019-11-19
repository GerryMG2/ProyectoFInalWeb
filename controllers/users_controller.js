async function reservas(req, res) {
  res.render("form_reserva", { title: "Reservas", msg: "" });
}

module.exports.reservas = reservas;

