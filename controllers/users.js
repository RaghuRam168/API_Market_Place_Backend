const express = require("express");
const loginModel = require("../Models/loginModel");
const signUpModel = require("../Models/signUpModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require('../utils/generateJWT')
const FormData = require('form-data')
const fs = require('fs')


const getUsers = asyncHandler(async (req, res) => {
  try {
    const logined_users = await loginModel.find();
    res.status(200).json(logined_users);
  } catch (e) {
    res.status(400).json({ message: e });
  }
});

const getSpecifiedUser = asyncHandler(async (req, res) => {
  const user = req.params.username;
  try {
    const data = await signUpModel.findOne({ });
    res.status(200).json(data);
  } catch (e) {
    res.status(400).json({ message: e });
  }
});

// const signup = async (req,res) => {
//   const newRegister = new signUpModel({
//     fullname:req.body.fullname,
//     email:req.body.email,
//     password:req.body.password
//   })
//   newRegister.save()
//     .then(data=>{
//         res.json(data)
//         console.log(data)
//     })
//     .catch(error =>{
//         res.json(error)
//         console.log(error)
//     })
// }



//User Registration
const registerUser = asyncHandler(async (req, res) => { 

  const { fullname, email, password } = req.body;
  const user = await signUpModel.findOne({ email: email });
  if (user) {
    res.status(400);
    throw new Error("user exixts");
  }
  const pass = await bcrypt.hash(password, 10);
  const newRegister = await signUpModel.create({fullname:fullname,email: email,password : pass}); 
  if (newRegister) {
    res.status(200).json({
      _id: newRegister._id,
      fullname: newRegister.fullname,
      email: newRegister.email,
    });
  }
   else {
    res.status(400);
    throw new Error("Error with db");
  }
});



//Login
const login = asyncHandler(async (req, res) => { 

  const {email, password } = req.body;
  const user = await signUpModel.findOne({ email: email });
  if (user) {
   const match =await bcrypt.compare(password,user.password)
   if(match){
    // const newRegister = await loginModel.create({ email:email,fullname:user.fullname});
    //  if(newRegister) {

     // const token=generateJWT(newRegister._id)

      res.status(200).json({
       // _id: newRegister._id,
        fullname: user.fullname,
        email: email,
        token:await jwt(email)
      });
    // } else {
    //   res.status(400);
    //   throw new Error("Error with db");
    // }
   }
   else{
    res.status(400);
    throw new Error("Entered wrong password");
   }
  }
  else{
    res.status(400);
    throw new Error("user not registerd");
  }
});

//delete
const deleteLogin = asyncHandler(async(req,res)=>{

  const{email} = req.body
  const user = await (loginModel.findOne({email:email}))
  if(user)
  {
    const data = await(loginModel.remove({email:email}))
    if(data){
      res.status(200).send({
        message:"Logged out successful"
      })
    }
    else{
      res.status(400)
    }
  }
  else
  {
      res.status(400)
  }
})

//module.exports.signup=signup

module.exports.deleteLogin=deleteLogin;
module.exports.registerUser = registerUser;
module.exports.getUsers = getUsers;
module.exports.getSpecifiedUser = getSpecifiedUser;
module.exports.login=login;
