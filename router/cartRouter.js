const express = require("express")
const router = express.Router();

const {auth, isUser} = require("../middleware/auth")

// Cart Section route
const {addtoCart, removeFromCart, fetchallCartItem} = require("../controller/cart_controller")


router.get("/fetchallcartItem",auth, isUser, fetchallCartItem)

router.post("/addtocart/:productId",auth, isUser, addtoCart)

router.delete('/removefromcart/:productId', auth, isUser, removeFromCart)

// wishlist section route

const {addtoWishlist, removetowishlist, removeAllWishlist ,fetchAllWishlistItem} = require("../controller/wishlist_controller")

router.post('/addtowishlist/:productId',auth, isUser, addtoWishlist);

router.delete("/removefromwishlist/:productId",auth, isUser, removetowishlist);

router.get('/fetchallwishlistItem',auth, isUser, fetchAllWishlistItem);

router.delete("/removeallwishlist",auth, isUser, removeAllWishlist);


module.exports = router;