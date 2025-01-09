const express = require("express");
const { registerController, loginController, testController, forgotPasswordController, updateProfileController, getOrdersController, getAllOrdersController, orderStatusController } = require("../controllers/authController");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");

//router object
const router = express.Router();

//routing
//REGISTER||METHOD POST
router.post('/register', registerController)

//LOGIN||METHOD POST
router.post('/login',loginController )

//FORGOT PASSWORD || POST
router.post('/forgot-password',forgotPasswordController);

//test route
router.get('/test',requireSignIn,isAdmin, testController);

//protected route for user
router.get("/user-auth", requireSignIn, (req,res) =>{
  res.status(200).send({ok : true});
})

//protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//update profile
router.put('/profile', requireSignIn, updateProfileController)


//orders
router.get('/orders', requireSignIn, getOrdersController)

//orders
router.get('/all-orders', requireSignIn,isAdmin, getAllOrdersController)

//order update bby admin
router.put('/order-status/:orderId', requireSignIn,isAdmin, orderStatusController)


module.exports = router