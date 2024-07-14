const mongoose = require("mongoose")

const usermodel = new mongoose.Schema({
    name: {
        type:String,
    },
    phone: {
        type: Number,
    },
    email: {
        type :String,
    },
    password: {
        type: String,
        trim:true,
    },
    conformpassword: {
      type:String,
      trim:true,
    },
    role:{
        type:String,
        anum:["Admin", "User"],
        default:"User"
    }
})

const userSchema =  mongoose.model("User", usermodel);

module.exports = userSchema;