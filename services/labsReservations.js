const dbLabs = require('../models/laboratorio');
const dbUser = require('../models/user');
const dbReserv = require('../models/reservas');

class labsReservations {
    constructor() {
        this.dbU = dbUser;
        this.dbL = dbLabs;
        this.dbR = dbReserv
    }

    static intercept(eventoA, eventoB) {
        console.log("evento a",eventoA);
        console.log("evento b",eventoB);
        eventoA.fin = new Date(eventoA.fin);
        eventoA.inicio = new Date(eventoA.inicio);
        eventoB.inicio = new Date(eventoB.inicio);
        eventoB.fin = new Date(eventoB.fin)
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
        if (rangoA + rangoB < rangoTotal) {
            return true;
        }
        else {
            return false;
        }

    }

    async validateEvents(reserva, cb) {
        this.dbR.find({ status: "aprobada", LabId: reserva.LabId }, function (err, docs) {
            if (err) {
                cb(false);
            } else {
                let eventoAprobados = docs.map((u) => {
                    return u.eventos;
                })
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

                if (error == 0) {
                    cb(true)
                } else {
                    cb(false)
                }


            }
        });
    }

    async create(reserva, cb) {
        //TODO method to create reservations
        try {

            this.validateEvents(reserva, (validar) => {
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
            cb(false)
        }


    }

    async update(reserva, cb) {
        try {

            this.validateEvents(reserva.eventos, (validar) => {
                if (validar) {
                    var query = {
                        "_id": reserva._id
                    }
                    this.dbR.findOneAndRemove(query, reserva, (err, result) => {
                        if (err) {
                            console.log("Error: ", err);
                            cb(false);
                        } else {
                            console.log("Document: ");
                            console.log(result);
                            cb(true);
                        }
                    });

                } else {
                    cb(false);
                }
            });


        } catch (error) {
            console.log("Error: ", error);
            cb(false)
        }
    }

    async get(filtros, pags,  cb) {
        try {
            let filtrosMade = {};
            if (filtros == "") {
            } else {
              filtrosMade = {
                status: /filtros/
              };
            }

            this.dbR
        .find(filtrosMade, function (err, docs) {
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
        }).skip(10 * (pags - 1)).limit(10);



        } catch (error) {
            console.log("error: ", error);
        }
    }

    async delete(_id, cb) {
        //TODO: method to delete reservations
        try {
            this.dbR.remove({ _id: _id }, function (error) {
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