const express = require("express")
const router = express.Router();

const {auth, isUser} = require("../middleware/auth")

// Cart Section route
const {addtoCart, removeFromCart, fetchallCartItem} = require("../controller/cart_controller")


router.get("/fetchallcartItem", fetchallCartItem)

router.post("/addtocart/:productId", isUser, addtoCart)

router.post('/removefromcart/:productId', removeFromCart)

// wishlist section route

const {addtoWishlist, removetowishlist, removeAllWishlist ,fetchAllWishlistItem} = require("../controller/wishlist_controller")

router.post('/addtowishlist/:productId', addtoWishlist);

router.delete("/removefromwishlist/:productId", removetowishlist);

router.get('/fetchallwishlistItem', fetchAllWishlistItem);

router.delete("/removeallwishlist", removeAllWishlist);


module.exports = router;