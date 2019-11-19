var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var reservationSchema = new Schema(
    {
      // codigo del usuario
      userId: { type: String, required: true },

      // codigo del laboratorio
      LabId: { type: String, required: true },
      // fecha que se hizo la reserva
      date: { type: Date, default: Date.now },
      // dias de reserva [Lunes, martes, jueves] Ejemplo

      eventos: [{inicio: {type: Date}, fin: {type: Date} }],
      status:{type:String, default: "Sin verificacion"},
      description: {type: String}
    }
);
module.exports = mongoose.model("reservation", reservationSchema);
