const express = require('express')
const dotenv = require("dotenv");
const app = express()
const router = express.Router();
const cors = require("cors");
const userRouter = require("./router/Userauth")
const cookieParser = require("cookie-parser");

app.use(cookieParser());


dotenv.config();
const port = process.env.PORT;
 
// connection database
const  connectDb = require('./db/user_conn');
connectDb();

// cloudinary connect
const cloudinaryConnect = require("./db/cloudinary")
cloudinaryConnect()


app.use(express.json());
app.use(cors());

app.get('/', (req, resp)=>{
    resp.send("hello world")
})


app.use('/auth', userRouter )

app.listen(port, ()=>{
    console.log("Listening on", port)
})