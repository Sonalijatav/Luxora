const productModel = require('../models/productModel');
const categoryModel = require("../models/categoryModel");
const orderModel = require("../models/orderModel");
const fs = require('fs');       //import file system
const slugify = require("slugify")

const Razorpay = require('razorpay');
const braintree = require('braintree');
const dotenv = require("dotenv");
dotenv.config();
const cloudinary = require("cloudinary").v2

 cloudinary.config({
                cloud_name:process.env.CLOUD_NAME,
                api_key: process.env.API_KEY,
                api_secret: process.env.API_SECRET,
            
        });

//payment gateway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

// // // Payment Gateway Configuration
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID, // Razorpay Key ID from environment variables
//   key_secret: process.env.RAZORPAY_KEY_SECRET, // Razorpay Key Secret from environment variables
// });
// // // module.exports = razorpay;



const createProductController = async(req,res)=> {
   try{
    const {name,slug,description,price,category,quantity,shipping} = req.fields
    const {photo} = req.files
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)             
          .send({ error: "photo is Required and should be less then 1mb" });
    }
    // const products = new productModel({...req.fields,slug:slugify(name)});
    //  if (photo) {
    //   products.photo.data = fs.readFileSync(photo.path);
    //   products.photo.contentType = photo.type;
    // }
    // await products.save();


    // Upload to Cloudinary
    let photoUrl = null;
    if (photo) {
      const uploadResponse = await cloudinary.uploader.upload(photo.path, {
        folder: "products",
        // allowed_formats: ["jpg", "jpeg", "png", "gif", "webp", "bmp", "tiff","pdf"],  
      });
      photoUrl = uploadResponse.secure_url;
    }

    const products = new productModel({
      ...req.fields,
      slug: slugify(name),
      photo: photoUrl,
    });


    await products.save();
 



    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products,
     });
   }
   catch(error){
    console.log(error)
    res.status(500).send({
        success:false,
        error,
        message:'Error in creating product'
    })
   }
}

//get all products
const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
     res.status(200).send({
      success: true,
      countTotal: products.length,
      message: "All Products ",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting products",
      error: error.message,
    });
  }
};


//get single producr
const getSingleProductController = async(req,res) =>{
    try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getitng single product",
      error,
    });
  }
}

//product photo controller
const productPhotoController =async(req,res) =>{
   try {
    // const product = await productModel.findById(req.params.pid).select("photo");
    // if (product.photo.data) {
    //   res.set("Content-type", product.photo.contentType);
    //   return res.status(200).send(product.photo.data);
    // }

    //cloudinary
    const product = await productModel.findById(req.params.pid);
    if (!product || !product.photo) {
      return res.status(404).send({ error: "Photo not found" });
    }
    res.redirect(product.photo); // Redirect to Cloudinary URL

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
  }
}

//delete controller
 const deleteProductController = async (req, res) => {
  try {
    // await productModel.findByIdAndDelete(req.params.pid).select("-photo");

    //cloudinary
    const product = await productModel.findById(req.params.pid);
  
    // Delete photo from Cloudinary
    if (product.photo) {
      const publicId = product.photo.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`products/${publicId}`);
    }

    // Delete product from DB
    await productModel.findByIdAndDelete(req.params.pid);

    res.status(200).send({
      success: true,
      message: "Product Deleted successfully",
    });
  }
   catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};

//update product
 const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    // const products = await productModel.findByIdAndUpdate(
    //   req.params.pid,
    //   { ...req.fields, slug: slugify(name) },
    //   { new: true }
    // );
    // if (photo) {
    //   products.photo.data = fs.readFileSync(photo.path);
    //   products.photo.contentType = photo.type;
    // }
    // await products.save();
          
    //clodinary code
    const product = await productModel.findById(req.params.pid);
    if (!product) {
      return res.status(404).send({ error: "Product not found" });
    }

    // Upload new photo to Cloudinary if provided
    let photoUrl = product.photo;
    if (photo) {
      const uploadResponse = await cloudinary.uploader.upload(photo.path, {
        folder: "products",
      });
      photoUrl = uploadResponse.secure_url;
    }

    const updatedProduct = await productModel.findByIdAndUpdate(
      req.params.pid,
      {
        ...req.fields,
        slug: slugify(name),
        photo: photoUrl,
      },
      { new: true }
    );


    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updte product",
    });
  }
};

// filters
const productFiltersController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error While Filtering Products",
      error,
    });
  }
};
// product count
const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  }
};

// product list base on page
const productListController = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }
};

// search product
const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const resutls = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(resutls);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Search Product API",
      error,
    });
  }
};

// similar products
const realtedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while geting related product",
      error,
    });
  }
};

// get product by catgory
 const productCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const products = await productModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error While Getting products",
    });
  }
};

//Braintree controllers
//payment gateway api
//token
const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
    
  } catch (error) {
    console.log(error);
  }
};

//payment
const brainTreePaymentController = async (req, res) => {
  try {
    const { nonce, cart } = req.body;
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new orderModel({
            products: cart,
            payment: result,
            buyer: req.user._id,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};




// // Get Razorpay Key ID (for frontend)
const razorpayKeyIdController = async (req, res) => {
  try {
    console.log("Razorpay Key ID:", process.env.RAZORPAY_KEY_ID);
    res.json({ key_id: process.env.RAZORPAY_KEY_ID });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error in getting key id');
  }
};

const razorpayPaymentController = async (req, res) => {
  try {
    const { payment_id, order_id, cart } = req.body;
    let total = 0;
    console.log("......................print details of ", payment_id,order_id,cart);
    
    // Calculate the total price from the cart
    cart.forEach((item) => {
      total += item.price;
      console.log("......................print details of ", payment_id,order_id,cart);
    });

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: total * 100, // Razorpay expects the amount in paise (100 paise = ₹1)
      currency: 'INR', // Currency is set to INR by default
      receipt: 'order_receipt_' + new Date().getTime(), // Optional: unique receipt ID
    });
    
    console.log("hii.......Razorpay Order Response:", order);

    
    // Return the order details to the client
    if (!payment_id && !order_id) {
      return res.status(200).json({
        success: true,
        message: "Razorpay order created successfully.",
        order,
      });
    }
    console.log("Reached here 1")
    // Verify and capture the payment if payment_id and order_id are provided
    if (payment_id && order_id) {
      const paymentCapture = await razorpay.payments.fetch(payment_id);

      // Verify payment status
      if (paymentCapture.status === 'captured' ) {
        // Save the transaction to the database
        console.log("Reached here 2")
        await new orderModel({
          products: cart,
          payment: paymentCapture,
          buyer: req.user._id, // Get the buyer from the authenticated user
          orderId: order_id,
        }).save();
        
        return res.json({ ok: true, paymentDetails: paymentCapture });
      } else {
        return res.status(400).send('Payment capture failed');
      }
    }
  } catch (error) {
    console.error("Error in Razorpay Payment Controller:", error);

    // Send error response
    return res.status(500).json({
      success: false,
      message: "Payment process failed",
      error: error.message,
    });
  }
};


module.exports = {createProductController , getProductController, getSingleProductController,
   productPhotoController,deleteProductController,updateProductController, productFiltersController,
   productCountController,productListController, searchProductController,realtedProductController,
   productCategoryController, 
   razorpayKeyIdController, razorpayPaymentController,
   braintreeTokenController,brainTreePaymentController
   
  }