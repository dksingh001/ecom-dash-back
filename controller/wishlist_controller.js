const product = require("../models/product_model");
const User = require("../models/user_model")

exports.addtoWishlist = async (req, resp) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    if (!productId) {
      return resp.status(403).json({
        success: "false",
        message: "Please send to required data",
      });
    }

    const productDetails = await product.findById(productId);

    if (!productDetails) {
      return resp.status(404).json({
        success: false,
        message: "Please send the valid product ID",
      });
    }
    await productDetails.wishlist.push(userId);
    await productDetails.save();

    resp.status(200).json({
      success: true,
      message: "Product added to wishlist successfully",
    });
  } catch (error) {
    console.log(error);
    return resp.status(500).json({
      success: false,
      message: "Unable to add to wishlist",
    });
  }
};

//remove form wishlist
exports.removetowishlist = async (req, resp) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id;

    if (!product || !userId) {
      return resp.status(403).json({
        success: false,
        message: "please enter the productId",
      });
    }

    const productDetails = await product.findById(productId);

    if (!productDetails) {
      return resp.status(404).json({
        success: false,
        message: "The product do not exit with this id",
      });
    }

    const indexremove = productDetails.wishlist
      ? productDetails.wishlist.indexOf(userId)
      : -1;

    if (indexremove !== -1) {
      productDetails.wishlist.splice(indexremove, 1);
      await productDetails.save();
      resp.status(200).json({
        success:true,
        message: "Product removed from wishlist successfully",
      });
    } else {
      resp.status(404).json({ error: "User not found in the product cart" });
    }
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      success: false,
      message: " error in remove wishlist, Internal server error",
    });
  }
};

// fetch all wishlist of login user
exports.fetchAllWishlistItem = async (req, resp) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(403).json({
        success: false,
        message: "Please send the userId",
      });
    }

    const wishlist = await product.find({ wishlist: userId });

    resp.status(200).json({ wishlist });
  } catch (error) {
    console.log(error);
    resp
      .status(500)
      .json({ error: "Internal server error in fetch all wishlist items" });
  }
};

exports.removeAllWishlist = async(req, resp)=>{
    try {
        const userId = req.user.id;

        const products = await product.find({wishlist: userId});

        // Iterating through each product and remove the user from the wishlist 
        const updatePromise = products.map(async(props)=>{
         props.wishlist = props.wishlist.filter(
            (wishlistUserId)=>wishlistUserId.toString() !== userId.toString()
        );
        })
        await Promise.all(updatePromise)

        await User.updateOne({_id:userId}, {$set:{wishlist:[]}});

        return resp.status(200).json({
            success:true,
            message:"wishlist remove all successfully",
        })
    } catch (error) {
        console.log(error);
        return resp.json({
            success:false,
            message:"error in remove from all wishlist"
        })
    }
}

