async function laboratorios(req, res) {
  res.render("labo_page_admin", { title: "Registro", msg: "" });
}

module.exports.laboratorios = laboratorios;