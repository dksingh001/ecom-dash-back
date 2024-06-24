const express = require('express')
const dotenv = require("dotenv");
const app = express()
const router = express.Router();
const cors = require("cors");
const userRouter = require("./router/Userauth")
const productRouter = require("./router/productrouter")
const cookieParser = require("cookie-parser");
// const fileupload = require("express-fileupload")

app.use(cookieParser());


dotenv.config();
const port = process.env.PORT;
 
// connection database
const  connectDb = require('./db/user_conn');
connectDb();

// cloudinary connect
// const cloudinaryConnect = require("./db/cloudinary")
// cloudinaryConnect()

app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// app.use(express.json());
app.use(cors());

app.get('/', (req, resp)=>{
    resp.send("hello world")
})


// app.use(
//     fileupload({
//       useTempFiles:true,
//       tempFileDir:"/tmp"
//     })
//   )

app.use('/auth', userRouter )
app.use('/product', productRouter);

app.listen(port, ()=>{
    console.log("Listening on", port)
})