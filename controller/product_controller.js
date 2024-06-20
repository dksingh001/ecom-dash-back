const Product = require("../models/product_model");
const { uploadTocloudinary } = require("../utils/imagesUploder");
const Subcategory = require("../models/productSubCategory");

exports.createProduct = async (req, resp) => {
  try {
    console.log('Headers:', req.headers);
    console.log('Request body:', req.body);
    console.log('File:', req.file);

    if (!req.file) {
      return resp.status(400).json({ error: 'No file uploaded' });
    }

    const { name, title, price, ratings, color, size, offer, SubcategoryId } =
      req.body;

      
    const photos = req.file.path;

    // const thumbnail = req.files.thumbnail;
    

    // const userId = req.user.id;

    // if ( !name || !title || !price || !ratings || !color || !size ||!offer || !thumbnail || !SubcategoryId) {
    //   return resp.status(403).json({
    //     success: false,
    //     messages: "all feild is required",
    //   });
    // }

    //   see the category is valid or not

    // const SubCategoryDetails = await Product.findOne({
    //   _id: SubcategoryId,
    // });

    // if (!SubCategoryDetails) {
    //   return resp.status(404).json({
    //     success: false,
    //     messages: "sub category details are not found",
    //   });
    // }

    // upload to cloudinary



    // const images = await uploadTocloudinary(
    //   thumbnail,
    //   process.env.CLOUDINARY_URL,
    //   1000,
    //   1000
    // );


    const productItem = await Product({
      name,
      title,
      price,
      ratings,
      color,
      size,
      offer,
      photos,
      // thumbnail: images.secure_url,
      // postedBy: userId,
      // subcategory: SubCategoryDetails._id,
    });

    // add course entry in Category => because us Category ke inside sare course aa jaye

    // await Subcategory.findByIdAndUpdate(
    //   { _id: SubCategoryDetails._id },
    //   {
    //     $push: {
    //       products: product._id,
    //     },
    //   },
    //   { new: true }
    // );
    await productItem.save();
    return resp.status(200).json({
      success: true,
      messages: "successfully created the product",
      productItem,
    });
    console.log(productItem);
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      success: false,
      message: "internal server error in creating product",
    });
  }
};

exports.getproduct = async(req, resp) =>{
  try {
     const allproduct = await Product.find()
     return resp.status(200).json({
        success: true,
        allproduct,
     });
  } catch (error) {
    console.log(error)
    resp.status(500).json({
      success:false,
      messages:"Internal server error"
    });
  }
};