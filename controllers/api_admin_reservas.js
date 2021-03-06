const LabsReservas = require("../services/labsReservations");
const ReservasServicio = new LabsReservas();



async function getReservasA(req, res) {
    try {
        
        ReservasServicio.getEventos(
            (validar, docs) => {
                if(validar) {
                    res.status(200).json(docs);
                } else {
                    res.status(500).json({});
                }
            }
        );
    } catch (error) {
        res.status(500).json({});
    }
}
module.exports.getEventos = getReservasA;


async function getReserva(req, res) {
    try {
        console.log("params", req.query.filtros);
        ReservasServicio.get(
            req.query.filtros,
            parseInt(req.query.page),parseInt(req.query.size), JSON.parse(req.query.orden),
            (validar, docs, pags) => {
                if(validar) {
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
module.exports.getRes = getReserva;
  
async function createReserva(req, res) {
    try {
        console.log("Req.body: ");
        console.log(req.body);
        var reserva = {
            userId: req.session.user,
            LabId: req.body.LabId,
            LabIdR: req.body.LabIdR,
            eventos: req.body.eventos,
            description: req.body.description
        };
        ReservasServicio.create(reserva, validar => {
            if(validar) {
                res.status(201).json({ result: "success", msg: "Reseva creada"});
            } else {
                res.status(500).json({ result: "error", msg: "No se pudo crear reserva"});
            }
        })
    } catch (error) {
        console.log("Error: ");
        console.log(error);
        res.status(500).json({ result: "error", msg: "No se pudo crear"});
    }
}
module.exports.createRes = createReserva;
  
async function updateReserva(req, res) {
    try {
        console.log("Req.body: ");
        console.log(req.body);
        var reserva = {
            _id: req.body._id,
            userId: req.body.userId,
            LabId: req.body.LabId,
            status: req.body.status,
            description: req.body.description, 
            eventos: req.body.eventos
        };
        
        ReservasServicio.update(reserva, validar => {
            if(validar) {
                res.status(201).json({ result: "success", msg: "Reserva actualizada"});
            } else {
                console.log("Dio falso")
                res.status(500).json({ result: "error", msg: "No se pudo actualizar"});
            }
        });
    } catch (error) {
        console.log("Error: ");
        console.log(error);
        res.status(500).json({ result: "error", msg: "No se pudo actualizar"});
    }
}  
module.exports.updateRes = updateReserva;
  
async function deleteReserva(req, res) {
    try {
        ReservasServicio.delete(req.body._id, validar => {
            if(validar){
                res.status(201).json({ result: "success", msg: "Reserva eliminada"});
            } else {
                res.status(500).json({ result: "error", msg: " No se pudo eliminar"});
            }
        });
    } catch (error) {
        console.log("Error: ");
        console.log(error);
        res.status(500).json({ result: "error", msg: "No se pudo eliminar"});
    }
}
module.exports.deleteRes = deleteReserva;
  