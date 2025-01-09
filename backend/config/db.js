const mongoose = require("mongoose");
const colors =  require("colors");

require("dotenv").config();

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to mongodb database ${conn.connection.host}` .bgGreen.blue);
    }
    catch(error){
        console.log(`Error in Mongodb ${error}`.bgRed.white);
    }
};

module.exports = connectDB;


////donot use this because import/exports come under type module
//// export default connectDB;