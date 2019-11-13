async function indexGet(req, res) {
  console.log("User: ");
  console.log(req.session.user);
  res.render("index", { title: "Main page", nombre: req.session.user, admin: req.session.admin });
}

module.exports.indexGet = indexGet;
