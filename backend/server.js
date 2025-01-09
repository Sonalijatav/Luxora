const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const authRoute = require("./routes/authRoute");
const cors = require("cors");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require('./routes/productRoutes');
//rest obj
const app = express();

//db config
connectDB();

//middlewares
app.use(cors());
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use('/api/v1/auth',authRoute);
app.use('/api/v1/category',categoryRoutes);
app.use('/api/v1/product',productRoutes);


//rest api
app.get("/",(req,res) =>{
    res.send("<h1>Welcome to ecommerce app</h1>");
});

//PORT
require("dotenv").config();
const PORT = process.env.PORT || 3000;


//run listen
app.listen(PORT, ()=>{
    console.log(`Server is runnig on ${process.env.DEV_MODE} mode on port ${PORT}` .bgMagenta.white);
})
