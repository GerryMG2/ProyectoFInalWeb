var mongoose = require("mongoose");

var Schema = mongoose.schema;

var labSchema = new Schema(
    {
      building:{type: String},
      code:{type:String},
      name:{type: String},
      capacity:{type: number},

    }
);
module.exports = mongoose.model("lab", labSchema);
