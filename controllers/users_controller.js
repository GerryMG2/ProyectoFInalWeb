async function reservas(req, res) {
  res.render("index", { title: "Reservas", msg: "" });
}

module.exports.reservas = reservas;

