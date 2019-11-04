var mongoose = require("mongoose");

var Schema = mongoose.schema;

var reservationSchema = new Schema(
    {
      userId:ObjectId,
      LabId:ObjectId,
      date: { type: Date, default: Date.now },
      dayReserv:[String],
      typeReserv: {type: String},
      hourReserv:{type: Date},
      status:{type:String},
      inCharge:[ObjectId],

    }
);
module.exports = mongoose.model("reservation", reservationSchema);
