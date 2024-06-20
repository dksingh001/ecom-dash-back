const express = require("express")
const router = express.Router()
const upload = require("../utils/imagesUploder")
const {createProduct,  getproduct} = require('../controller/product_controller')

router.post("/create", upload.any('file'), createProduct )

router.get("/getproduct", getproduct)


module.exports= router;