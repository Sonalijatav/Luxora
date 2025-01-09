const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  description:{
    type:String,
    required:true,
  },
  price:{
    type:Number,
    required:true,
  },
  category:{
    type:mongoose.ObjectId,    //category model se get kia
    ref: 'Category',
    required:true,
  },
  quantity:{
    type:Number,
    required:true,
  },
  photo:{
    data:Buffer,        //baad m cloudinary pr upload krna tb string type hoga
    contentType:String,
  },
  shipping:{
    type:Boolean,
  }
},{timestamps:true});

module.exports =  mongoose.model("Products", productSchema);