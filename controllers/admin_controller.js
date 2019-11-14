async function laboratorios(req, res) {
  res.render("labo_page_admin", { title: "Laboratorios", msg: "" });
}

module.exports.laboratorios = laboratorios;