const mongoose = require("mongoose");

const productmodel = mongoose.Schema({
  name: {
    type: String,
  },
  title: {
    type: String,
  },
  price: {  
    type:Number,
  },
  ratings: {
    type: String,
  },
  color: {
    type: String,
  },
  size: {
    type: String,
  },
  offer: {
    type: String,
  },
  // photos: {
  //   public_id: { type: String, required: true },

  //   url: { type: String, required: true },
  // },
  image:{
      type:String,
  },
  cart:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  }],
  createdAt:[{
    type:Date,
    default:Date.now(),
  }],
  wishlist:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  }]
});

const productSchema = mongoose.model("ProductDetails", productmodel);

module.exports = productSchema;
