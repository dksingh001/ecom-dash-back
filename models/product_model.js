const mongoose = require("mongoose")

const productmodel = mongoose.Schema({
    name:{
        type:String,
    },
    title:{
        type:String,
    },
    price:{
        type:Number,
    },
    ratings:{
        type:String,
    },
    color:{
        type:String,
    },
    size:{
        type:String,
    },
    offer:{
        type:String,
    },
    photos:{
        type:String,
    }
})

const productSchema = mongoose.model("ProductDetails", productmodel)

module.exports = productSchema;