var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var labSchema = new Schema(
    {
      building:{type: String},
      code:{type:String},
      name:{type: String},
      capacity:{type: Number},
      inCharge:{type: String},
    }
);
module.exports = mongoose.model("lab", labSchema);
