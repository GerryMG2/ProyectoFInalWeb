const dbLabs = require("../models/laboratorio");
const dbUser = require("../models/user");
const dbReserv = require("../models/reservas");

class labsReservations {
  constructor() {
    this.dbU = dbUser;
    this.dbL = dbLabs;
    this.dbR = dbReserv;
  }

  static intercept(eventoA, eventoB) {
    console.log("evento a", eventoA);
    console.log("evento b", eventoB);
    eventoA.fin = new Date(eventoA.fin);
    eventoA.inicio = new Date(eventoA.inicio);
    eventoB.inicio = new Date(eventoB.inicio);
    eventoB.fin = new Date(eventoB.fin);
    let rangoA = eventoA.fin.getTime() - eventoA.inicio.getTime();
    let rangoB = eventoB.fin.getTime() - eventoB.inicio.getTime();
    let mayor = eventoB.fin.getTime();
    if (eventoA.fin.getTime() >= eventoB.fin.getTime()) {
      mayor = eventoA.fin.getTime();
    }
    let menor = eventoA.inicio.getTime();
    if (eventoB.inicio.getTime() <= eventoA.inicio.getTime()) {
      menor = eventoB.inicio.getTime();
    }

    let rangoTotal = mayor - menor;
    console.log("rango total:", rangoTotal);
    console.log("rangoA", rangoA);
    console.log("rangoB", rangoB);
    console.log("mayor", mayor);
    console.log("menor", menor);
    if (rangoA + rangoB < rangoTotal) {
      return false;
    } else {
      return true;
    }
  }

  static getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  async getEventos(cb) {
    try {
      this.dbR
        .find({ status: "aprobada" }, function(err, docs) {
          if (err) {
            console.log("Paginas: ");
            console.log("Error: ");
            console.log(err);
            cb(false, {});
          } else {
            console.log(docs)
            let lista = docs.map(e => {
              let color = labsReservations.getRandomColor();
              return e.eventos.map(l => {
                console.log(e);
                try {
                  return {
                    title: e.LabIdR.name,
                    start: l.inicio,
                    end: l.fin,
                    color: color,
                    overlap: false,
                    resourceId: e.LabId
                  };
                } catch (error) {
                  console.log("error: ", error)
                  return {
                    title: "Laboratorio Eliminado",
                    start: l.inicio,
                    end: l.fin,
                    color: color,
                    overlap: false,
                    resourceId: "00000"
                  };
                }
            
                
              });
            });

            let eventos = [].concat.apply([], lista);

            console.log(eventos);

            cb(true, eventos);
          }
        })
        .populate({ path: "LabIdR", model: "lab" });
    } catch (error) {
      console.log("error: ", error);
      cb(false, {});
    }
  }

  static validateItself(eventos) {
    console.log(eventos);
    let ocurr = 0;
    for (let index = 0; index < eventos.length - 1; index++) {
      for (let j = index + 1; j < eventos.length; j++) {
        if (labsReservations.intercept(eventos[index], eventos[j])) {
          ocurr++;
        }
      }
    }

    if (ocurr > 0) {
      return false;
    } else {
      return true;
    }
  }

  async validateEvents(reserva, cb) {
    this.dbR.find({ status: "aprobada", LabId: reserva.LabId }, function(
      err,
      docs
    ) {
      if (err) {
        cb(false);
      } else {
        let eventoAprobados = docs.map(u => {
          return u.eventos;
        });
        let eventosAprobados = [].concat.apply([], eventoAprobados);
        console.log("Eventos Aprobados: ", eventosAprobados);
        let error = 0;
        eventosAprobados.forEach(eveA => {
          reserva.eventos.forEach(eve => {
            if (labsReservations.intercept(eve, eveA)) {
              error++;
            }
          });
        });
        console.log(error);
        console.log(reserva.eventos);

        if (!labsReservations.validateItself(reserva.eventos)) {
          error++;
        }

        console.log(error);

        if (error == 0) {
          cb(true);
        } else {
          cb(false);
        }
      }
    });
  }

  async create(reserva, cb) {
    //TODO method to create reservations
    try {
      this.validateEvents(reserva, validar => {
        if (validar) {
          const newReserva = new this.dbR(reserva);
          newReserva.save((err, result) => {
            if (err) {
              console.log("Error: ", err);
              cb(false);
            } else {
              console.log("Result: ", result);
              cb(true);
            }
          });
        } else {
          cb(false);
        }
      });
    } catch (error) {
      console.log("Error: ", error);
      cb(false);
    }
  }

  async update(reserva, cb) {
    try {
      if (reserva.status != "aprobada") {
        var query = {
          _id: reserva._id
        };
        this.dbR.findOneAndUpdate(query, reserva, (err, result) => {
          if (err) {
            console.log("Error: ", err);
            console.log("Primer falso");
            cb(false);
          } else {
            console.log("Document: ");
            console.log(result);
            cb(true);
          }
        });
      } else {
        this.dbR.find({ _id: reserva._id }, (err, docs) => {
          if (err) {
            console.log("err: ", err);
            console.log("Segundo falso");
            cb(false);
          } else {
            console.log(docs[0].status);
            if (docs[0].status == "aprobada") {
              console.log("Ya estaba aprobada")
              var query = {
                _id: reserva._id
              };
              this.dbR.findOneAndUpdate(query, reserva, (err, result2) => {
                if (err) {
                  console.log("Error: ", err);
                  console.log("Tercer falso");
                  cb(false);
                } else {
                  console.log("Document: ");
                  console.log(result2);
                  cb(true);
                }
              });
            } else {
              console.log("No estaba aprobada")
              this.validateEvents(reserva, validar => {
                if (validar) {
                  var query = {
                    _id: reserva._id
                  };
                  this.dbR.findOneAndUpdate(query, reserva, (err, result3) => {
                    if (err) {
                      console.log("Error: ", err);
                      console.log("Cuarto Falso falso");
                      cb(false);
                    } else {
                      console.log("Document: ");
                      console.log(result3);
                      cb(true);
                    }
                  });
                } else {
                  console.log("Quinto falso");
                  cb(false);
                }
              });
            }
          }
        });
      }
    } catch (error) {
      console.log("Error: ", error);
      console.log("Sexto falso");
      cb(false);
    }
  }

  async get(filtros, pags, size, orden, cb) {
    try {
      let filtrosMade = {};
      if (filtros == "") {
      } else {
        console.log(filtros)
        filtrosMade = {
          $or: [
            { status: { $regex: ".*" + filtros + ".*" } },
            { LabId: { $regex: ".*" + filtros + ".*" } },
            { userId: { $regex: ".*" + filtros + ".*" } }
          ]
        };
      }

      this.dbR
        .find(filtrosMade, function(err, docs) {
          if (err) {
            console.log("Paginas: ");
            console.log("Error: ");
            console.log(err);
            cb(false, {}, 0);
          } else {
            dbReserv.find(filtrosMade, (err, docs2) => {
              if (!err) {
                var paginas = docs2.length;
                paginas = Math.ceil(paginas / 10);
                cb(true, docs, paginas);
              } else {
                cb(false, {}, 0);
              }
            });
          }
        })
        .skip(size * (pags - 1))
        .limit(size)
        .sort(orden);
    } catch (error) {
      console.log("error: ", error);
    }
  }

  async delete(_id, cb) {
    //TODO: method to delete reservations
    try {
      this.dbR.remove({ _id: _id }, function(error) {
        if (error) {
          console.log("Error ");
          console.log(error);
          cb(false);
        } else {
          cb(true);
        }
      });
    } catch (error) {
      console.log("Error en delete: ");
      console.log(error);
      cb(false);
    }
  }
}

module.exports = labsReservations;
