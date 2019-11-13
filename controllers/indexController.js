async function indexGet(req, res) {
  console.log("User: ");
  console.log(req.session.user);
  res.render("index", { title: "Main page", nombre: req.session.user });
}

module.exports.indexGet = indexGet;
