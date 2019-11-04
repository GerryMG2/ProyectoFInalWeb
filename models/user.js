var mongoose = require("mongoose");

var Schema = mongoose.schema;

var userSchema = new Schema(
    {
        name: {type: String, required: true},
        code: {type: String, required: true},
        email: {type: String, required: true}, 
        password: {type: String, required: true},
        superUser:{type: Boolean, default:false},

    }
);

module.exports = mongoose.model("user", userSchema);

