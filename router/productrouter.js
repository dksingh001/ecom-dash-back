const express = require("express")
const router = express.Router()
const upload = require("../utils/imagesUploder")
const {createProduct,  getproduct, getProductbyId, updateProduct ,deleteProduct} = require('../controller/product_controller')

router.post("/create", upload.single('image'), createProduct)

router.get("/getproduct", getproduct)

router.get("/getproductbyId/:productId", getProductbyId)

router.put("/updateproduct/:productId", upload.single('image') ,updateProduct)

router.delete("/deleteproduct/:productId", deleteProduct)


module.exports= router;