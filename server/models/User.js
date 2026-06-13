const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
    {
        firestName:{type : String, required: true},
        lastName:{type : String, required: true},
        Email:{type: String, required: true, unique: true},
        password:{type: String, required: true},
        isOnline:{type:Boolean, default: false},
        isOfline:{type:Boolean, default:false}, 
    }, {timestamps: true});

    module.exports = mongoose.model("User", userSchema);