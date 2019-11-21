async function indexGet(req, res) {
  console.log("User: ");
  console.log(req.session.user);
  res.render("index", { title: "Main page", nombre: req.session.user, usad: req.session.admin });
}

module.exports.indexGet = indexGet;


async function defaultPage(req,res){
  res.redirect("/main");
}

module.exports.defaultPage = defaultPage;
