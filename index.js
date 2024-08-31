const express = require('express')
const dotenv = require("dotenv");
const app = express()
const router = express.Router();
const cors = require("cors");
const userRouter = require("./router/Userauth")
const productRouter = require("./router/productrouter")
const cartRouter = require("./router/cartRouter")
const cookieParser = require("cookie-parser");
// const fileupload = require("express-fileupload")

// connection database
const  connectDb = require('./db/user_conn');

dotenv.config();
const port = process.env.PORT;
 
connectDb();

// cloudinary connect
// const cloudinaryConnect = require("./db/cloudinary")
// cloudinaryConnect()

app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cookieParser());

// app.use(express.json());
app.use(cors());

app.get('/', (req, resp)=>{
    resp.send("hello world")
})

app.use((req, res, next) => {
    res.header({"Access-Control-Allow-Origin": "*"});
    next();
  })  

// app.use(
//     fileupload({
//       useTempFiles:true,
//       tempFileDir:"/tmp"
//     })
//   )

app.use('/auth', userRouter )
app.use('/product', productRouter);

app.use("/api/cw", cartRouter)

app.listen(port, ()=>{
    console.log("Listening on", port)
})