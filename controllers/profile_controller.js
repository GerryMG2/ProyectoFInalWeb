const servicio = require('../services/userService');
const userService = new servicio();


async function profileGet(req, res) {
    userService.getByCode(req.session.user, (validar, user) => {
        if (validar) {
            console.log("User: ");
            console.log(user[0].name);
            res.render("user_page", { title: "User page", nombre: user[0].name, correo: user[0].email, admin: req.session.admin });

        } else{
            console.log("User: ");
            console.log(req.session.user);
            res.render("error", { title: "Error page", nombre: req.session.user, admin: req.session.admin });
        }
    });

}

module.exports.profileGet = profileGet;
