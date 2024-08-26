// const { json } = require("express");
const Product = require("../models/product_model");
const User = require("../models/user_model")

// Add to cart
exports.addtoCart = async (req, resp)=>{
    try {
        // const {productId} = req.params;

        const { productId } = req.body; // Retrieve productId from the request body
      
        // console.log(productId)
        // console.log("req.user:", req.user);

        const userId = req.user.id;
        // console.log(userId)

        if (!productId || !userId) {
            return resp.status(403).json({
            return: false,
            message: "please send the productId"
            })
        }

        // check the valid product Id or not
        const productdetails = await Product.findById(productId)

        if (!productdetails) {
            return resp.status(404).json({
                success: false,
                message:"The product do not exist with current Id"
            })
        }
        
        await productdetails.cart.push(userId);
        await productdetails.save();

        resp.status(200).json({
            success:true,
            message:"Poduct added to cart successfully"
        });
    } catch (error) {
        console.log(error);
        return resp.status(500).json({
            success:false,
            message:"error in add to cart"
        })
    }
}

// remove the  cart
exports.removeFromCart = async (req, resp) => {
 try {
    const {productId} = req.params;

    const userId = req.user.id;

    if (!productId || !userId) {
        return resp.status(403).json({
        return: false,
        message: "please send the productId"
        })
    }

    // check the valid product Id or not
    const productdetails = await Product.findById(productId)

    if (!productdetails) {
        return resp.status(404).json({
            success: false,
            message:"The product Id do not exist with current Id"
        })
    }

    const indexToRemove = productdetails.cart ? productdetails.cart.indexOf(userId) : -1;

   if (indexToRemove !== -1) {
    productdetails.cart.splice(indexToRemove, 1);
    await productdetails.save();
    resp.status(200).json({
        success:true,
        message:"Product removed from cart successfully",
        // success:true
    });
   }else{
    resp.status(404).json({error:"User not found in the product's cart"});
   }
    
 } catch (error) {
    console.log(error);
    return resp.status(500).json({
        success:false,
        message:"error in add to cart"
    })
 }
}

// fetch cart item of user 
exports.fetchCartItem = async (req, resp) =>{
   try {
    const userId = req.user.id;

    if (!userId) {
        return resp.status(403).json({
            success:false,
            message:"user ID is missing"
        });
    }

    // Assuming you store the cart as an array of product IDs in the suer's document 
    const userCart = await User.findById(userId).select("cart"); // Replace "User" with your User model
    const cartItems  = userCart.cart;

    if (!cartItems || cartItems === 0) {
        return resp.status(404).json({
            success:false,
            message:"No items found in the cart",
        })
    }

    // Fetch all product details by IDs
     const products = await Product.find({ _id: {$in :cartItems} });
    
    resp.status(200).json({
        success: true,
        products, // Send the fetch products details 
        message: "Successfully fetch the cart items"
    });
    
   } catch (error) {
    console.log(error);
    return resp.status(500).json({
        success: false,
        message: "Error fetching cart items"
    })
   }
}

// fetch all cart items of users
exports.fetchallCartItem = async (req, resp)=>{
    try {
        const userId = req.user.id;

        if (!userId) {
            return({
                success: false,
                message:"please send the UserId"
            })
        }

        const cartitems = await Product.find({cart:userId})
        
        resp.status(200).json({
            success:true,
            cartitems,
            message:"successfully fetch the all cart items"
        })
    } catch (error) {
        console.log(error);
    return resp.status(500).json({
        error:"Internal server Error in fetch all cart items"
    })
    }
}