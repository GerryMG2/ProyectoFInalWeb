
function register(req,res){
    res.render('register_page', { title: 'Registro' });
}

module.exports.register = register;

function postregister (req, res) {
    const query = querystring.stringify({
      "nombre": req.body.name,
    });
    res.redirect('/main?' + query);
  
  }

  module.exports.registerP = postregister;
