const { hashPassword, comparePassword } = require("../helpers/authHelper");
const userModel = require("../models/userModel");
const orderModel = require("../models/orderModel");
const JWT = require("jsonwebtoken");
const registerController = async(req,res) => {
    try{
       const{name, email, phone,password, address,answer} = req.body
       //validation
       if(!name){
        return res.send({message:'Name is Required'})
       }
       if(!email){
        return res.send({message:'Email is Required'})
       }
       if(!password){
        return res.send({message:'Password is Required'})
       }
       if(!phone){
        return res.send({message:'Phone is Required'})
       }
       if(!address){
        return res.send({message:'Address is Required'})
       }
       if(!answer){
        return res.send({message:'Answer is Required'})
       }
       
       //existing user
       const existingUser = await userModel.findOne({email})
       //checking existing user
       if(existingUser){
        return res.status(200).send({
            success:false,
            message:'Already registered please login',
        })
       }

       //new registration 
       const hashedPassword = await hashPassword(password)
       //save alldetail of new user
       const user = await new userModel({name, email, phone, address,password:hashedPassword, answer}).save();
      //  console.log(user);
       res.status(201).send({
        success:true,
        message: 'User Registered Successfully',
        user,
       })


    }
    catch(message){
      console.log(message);
      res.status(500).send({
        success:false,
        message: 'Error in registration',
        message,
      })
    }
};


//POST LOGIN
const loginController = async (req,res) =>{
     try{
       const {email, password} = req.body
       //validation
       if(!email || !password){
        return res.status(404).send({
          success: false,
          message :'Invalid email or password'
        })
       }
       //check user
       const user = await userModel.findOne({email})
       if(!user){
        return res.status(404).send({
          success:false,
          message:'Email is not registered'
        })
       }
       //email ,pass shi h toh fir match krenge jo db m pada h usse db m encrypt h  usko decrypt bhi krenge
       const match = await comparePassword(password, user.password)
       if(!match){
        return res.status(200).send({
          success:false,
          message:'Invalid password'
        })
       }

       //token
       const token = await 
         JWT.sign({_id: user._id}, 
         process.env.JWT_SECRET,{expiresIn: "7d",
        });
        res.status(200).send({
          success:true,
          message:'login successfully',
          user:{
            _id:user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
            role:user.role,
          },
          token
        })
     }
     catch(message){
      console.log(message)
      res.status(500).send({
        success:false,
        message:'Error in login',
        message
      })
     }
};
//forgotPasswordController

 const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Emai is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "answer is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
    }
    //check
    const user = await userModel.findOne({ email, answer });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email Or Answer",
      });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

//test controller
const testController = (req,res) =>{
   try{
     res.send("Protected Route");
   }
   catch(message){
    console.log(message);
    res.send({message});
   }
};
//update profile controller
const updateProfileController = async(req,res) =>{
   try{
     const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({ error: "Passsword is required and 6 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
   }
   catch(error){
    console.log(error);
    res.status(400).send({
      success: false,
      message: 'Error while updating profile',
      error
    })
   }
};

//orders
 const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};
//orders
const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      // .sort({ createdAt: "-1" });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};

//order status
 const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updateing Order",
      error,
    });
  }
};


module.exports = {registerController, loginController,
  forgotPasswordController ,testController, 
  updateProfileController, getOrdersController,getAllOrdersController, orderStatusController };