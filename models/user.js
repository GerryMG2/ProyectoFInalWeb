var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var userSchema = new Schema(
    {
        name: {type: String, required: true},
        code: {type: String, unique: true},
        email: {type: String, unique: true}, 
        password: {type: String, required: true},
        superUser:{type: Boolean, default: false},

    }
);

module.exports = mongoose.model("user", userSchema);

