
async function indexGet(req, res) {
    console.log(req.query.nombre)
    res.render('index', { title: 'Main page', nombre: req.query.nombre });
  }

  module.exports.indexGet = indexGet;
