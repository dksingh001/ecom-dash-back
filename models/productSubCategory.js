const mongoose = require("mongoose")

const subcategorySchema = new mongoose.Schema({
    title:{
        type:String,
        required:true, 
    },
    images:{
        type:String
    },
    product:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
    }],
})

module.exports = mongoose.model("subcategory", subcategorySchema);