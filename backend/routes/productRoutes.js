const express = require("express");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
const { createProductController, getProductController, getSingleProductController, 
    productPhotoController, deleteProductController, updateProductController, productFiltersController, 
    productCountController, productListController, searchProductController, realtedProductController, 
    productCategoryController, razorpayPaymentController, razorpayKeyIdController,
    braintreeTokenController,
    brainTreePaymentController, 
    } = require("../controllers/productController");
const formidable = require("express-formidable")
const router = express.Router()

//routes
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController)

//get all products
router.get('/get-product', getProductController);

//get single product
router.get('/get-product/:slug', getSingleProductController);
// product photo
router.get('/product-photo/:pid', productPhotoController);
//delete product delete 
router.delete('/delete-product/:pid', deleteProductController);
//update product
router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController)


//filter product
router.post('/product-filters',productFiltersController)

//product count 
router.get('/product-count', productCountController);

//product per page
router.get("/product-list/:page", productListController);

//search product
router.get('/search/:keyword', searchProductController);

//similar products
router.get('/related-product/:pid/:cid',realtedProductController)

//category wise product
router.get('/product-category/:slug',productCategoryController)


//payments routes  Braintree
//token
router.get('/braintree/token', braintreeTokenController)
//
router.post('/braintree/payment', requireSignIn, brainTreePaymentController);


//RAZORPAY
//payments routes
router.get('/razorpay/keyid', razorpayKeyIdController)
//payments
router.post('/razorpay/payment', requireSignIn, razorpayPaymentController)





module.exports = router