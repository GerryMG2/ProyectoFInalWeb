async function logout(req, res){
    req.session.destroy();
    res.render("login_page", { title: "login", msg: "" });
}

module.exports.logout = logout;