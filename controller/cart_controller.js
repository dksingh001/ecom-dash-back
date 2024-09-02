const Product = require("../models/product_model");
const User = require("../models/user_model");

// Add to cart
exports.addtoCart = async (req, resp) => {
    try {
        const { productId } = req.body; // Retrieve productId from the request body
        const userId = req.user?.id;

        if (!productId || !userId) {
            return resp.status(400).json({
                success: false,
                message: "Please provide both productId and userId"
            });
        }
           // Check if the user is already in the cart
           if (productdetails.cart.includes(userId)) {
            console.warn("User already added this product to the cart");
            return resp.status(400).json({
                success: false,
                message: "User already added this product to the cart"
            });
        }

        // Check if the product exists
        const productdetails = await Product.findById(productId);
        console.log(productdetails)
        if (!productdetails) {
            return resp.status(404).json({
                success: false,
                message: "The product does not exist with the given Id"
            });
        }

        // Add userId to the product's cart array
        productdetails.cart.push(userId);
        await productdetails.save();

        return resp.status(200).json({
            success: true,
            message: "Product added to cart successfully"
        });
    } catch (error) {
        console.log(error);
        return resp.status(500).json({
            success: false,
            message: "Error adding product to cart"
        });
    }
};

// Remove from cart
exports.removeFromCart = async (req, resp) => {
    try {
        const { productId } = req.params;
        const userId = req.user.id;

        if (!productId || !userId) {
            return resp.status(400).json({
                success: false,
                message: "Please provide both productId and userId"
            });
        }

        // Check if the product exists
        const productdetails = await Product.findById(productId);

        if (!productdetails) {
            return resp.status(404).json({
                success: false,
                message: "The product does not exist with the given Id"
            });
        }

        const indexToRemove = productdetails.cart.indexOf(userId);

        if (indexToRemove !== -1) {
            productdetails.cart.splice(indexToRemove, 1);
            await productdetails.save();

            return resp.status(200).json({
                success: true,
                message: "Product removed from cart successfully"
            });
        } else {
            return resp.status(404).json({
                success: false,
                message: "User not found in the product's cart"
            });
        }
    } catch (error) {
        console.log(error);
        return resp.status(500).json({
            success: false,
            message: "Error removing product from cart"
        });
    }
};

// Fetch cart items of a user
exports.fetchCartItem = async (req, resp) => {
    try {
        const userId = req.user.id;

        if (!userId) {
            return resp.status(400).json({
                success: false,
                message: "User ID is missing"
            });
        }

        // Fetch the user's cart from the User model
        const userCart = await User.findById(userId).select("cart");
        const cartItems = userCart.cart;

        if (!cartItems || cartItems.length === 0) {
            return resp.status(404).json({
                success: false,
                message: "No items found in the cart"
            });
        }

        // Fetch all product details by IDs
        const products = await Product.find({ _id: { $in: cartItems } });

        return resp.status(200).json({
            success: true,
            products, // Send the fetched product details
            message: "Successfully fetched the cart items"
        });
    } catch (error) {
        console.log(error);
        return resp.status(500).json({
            success: false,
            message: "Error fetching cart items"
        });
    }
};

// Fetch all cart items of a user
exports.fetchallCartItem = async (req, resp) => {
    try {
        const userId = req.user.id;

        if (!userId) {
            return resp.status(400).json({
                success: false,
                message: "User ID is missing"
            });
        }

        // Find all products that have the userId in their cart array
        const cartitems = await Product.find({ cart: userId });

        return resp.status(200).json({
            success: true,
            cartitems,
            message: "Successfully fetched all cart items"
        });
    } catch (error) {
        console.log(error);
        return resp.status(500).json({
            success: false,
            message: "Error fetching all cart items"
        });
    }
};
