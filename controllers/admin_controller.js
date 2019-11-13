async function laboratorios(req, res) {
  res.render("admin_labo_page", { title: "Registro", msg: "" });
}

module.exports.laboratorios = laboratorios;