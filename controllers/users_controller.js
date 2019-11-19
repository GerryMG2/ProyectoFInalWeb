async function reservas(req, res) {
  res.render("reserva_page", { title: "Reservas", msg: "" });
}

module.exports.reservas = reservas;

