const mongoose = require("mongoose");

const productmodel = mongoose.Schema({
  name: {
    type: String,
  },
  title: {
    type: String,
  },
  price: {
    type: Number,
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
  photos: {
    public_id: { type: String, required: true },

    url: { type: String, required: true },
  },
  // photos:{
  //     type:String,
  // }
});

const productSchema = mongoose.model("ProductDetails", productmodel);

module.exports = productSchema;
