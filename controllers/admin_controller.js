async function laboratorios(req, res) {
  res.render("labo_page_admin", { usad: req.session.admin, title: "Laboratorios", msg: "" });
}

module.exports.laboratorios = laboratorios;

async function secondsUsers(req, res) {
  res.render("users_page_admin", { usad: req.session.admin, title: "Mod_Usuarios", msg: "" });
}

module.exports.secondsUsers = secondsUsers;
