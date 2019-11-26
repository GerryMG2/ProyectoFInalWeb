const labServices = require("../services/labService");
const labService = new labServices();

async function getLaboratorios(req, res) {
  try {
    console.log("params", req.query.filtros);
    labService.get(
      req.query.filtros,
      parseInt(req.query.page),parseInt(req.query.size), JSON.parse(req.query.orden),
      (validar, docs, pags) => {
        if (validar) {
          var respuesta = {
            docs: docs,
            paginas: parseInt(pags)
          };
          res.status(200).json(respuesta);
        } else {
          res.status(500).json({ docs: {}, paginas: 0 });
        }
      }
    );
  } catch (error) {
    res.status(500).json({ docs: {}, paginas: 0 });
  }
}

module.exports.getLaboratorios = getLaboratorios;

async function getLab(req, res) {
  try {
    labService.getLab((validar, labos)=>{
      if(validar){
        res.status(200).json(labos);
      } else {
        res.status(500).json({});
      }
    });
  } catch (error) {
      console.log("Error: ");
      console.log(error);
      res.status(500).json({});
  }
}

module.exports.getLab = getLab;

async function createLaboratorios(req, res) {
  try {
    console.log("Req.body: ");
    console.log(req.body);
    var labs = {
      building: req.body.building,
      code: req.body.code,
      name: req.body.name,
      capacity: req.body.capacity,
      inCharge: req.body.inCharge
    };
    labService.create(labs, validar => {
      if (validar) {
        res.status(201).json({ result: "success", msg: "Laboratorio creado" });
      } else {
        res.status(500).json({ result: "error", msg: "No se pudo crear" });
      }
    });
  } catch (error) {
    console.log("Error: ");
    console.log(error);
    res.status(500).json({ result: "error", msg: "No se pudo crear" });
  }
}

module.exports.createLab = createLaboratorios;

async function updateLaboratorio(req, res) {
  try {
    console.log("Req.body: ");
    console.log(req.body);
    var labs = {
      building: req.body.building,
      code: req.body.code,
      name: req.body.name,
      capacity: req.body.capacity,
      inCharge: req.body.inCharge
    };

    labService.update(labs, validar => {
      if (validar) {
        res.status(201).json({ result: "success", msg: "Laboratorio actualizado" });
      } else {
        res.status(500).json({ result: "error", msg: "No se pudo crear" });
      }
    });
  } catch (error) {
    console.log("Error: ");
    console.log(error);
    res.status(500).json({ result: "error", msg: "No se pudo crear" });
  }
}

module.exports.updateLab = updateLaboratorio;

async function deleteLaboratorio(req, res) {
  try {
    labService.delete(req.body._id, validar => {
      if (validar) {
        res.status(201).json({ result: "success", msg: "Laboratorio eliminado" });
      } else {
        res.status(500).json({ result: "error", msg: "No se pudo eliminar" });
      }
    });
  } catch (error) {
    console.log("Error: ");
    console.log(error);
    res.status(500).json({ result: "error", msg: "No se pudo eliminar" });
  }
}

module.exports.deleteLab = deleteLaboratorio;
