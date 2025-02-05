const express = require('express');
const router = express.Router();
const User = require('../models/user');
const {body,validationResult} =require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtsecret = "MynameisDipeshAndmyChannel" //random for jwtsecret token 
const mongoDB = require('../db');

router.post("/createuser",[
  body('email').isEmail(),
  body('password','Incorrect Password').isLength({min:6})]
  ,async(req,res)=>{
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array()});
    }

    const salt = await bcrypt.genSalt(10);
    const secPassword= await bcrypt.hash(req.body.password,salt);
  try {
    await User.create({
      name:req.body.name,
      password:secPassword,
      email:req.body.email,
      location:req.body.location
    });
    res.json({success:true});
  } catch (error) {
    console.log(error);
    res.json({success:false});
  }
})


mongoDB();
router.post("/loginuser",
  [body('email').isEmail(),
  body('password','Incorrect Password').isLength({min:6})]
  ,async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array()});
    }

    let email = req.body.email;
  try {
    let userData =await User.findOne({email});

    if(!userData){
      return res.status(400).json({errors:"Try logging with correct Details"})
    }

    const passCompare = await bcrypt.compare(req.body.password,userData.password);
    if(!passCompare){
      return res.status(400).json({errors:"Try logging with correct Details"})
    }

    const data ={
      user:{
        id:userData.id
      }
    }

    const authToken = jwt.sign(data,jwtsecret)
    res.json({success:true,authToken:authToken});
  } catch (error) {
    console.log(error);
    res.json({success:false});
  }
})

module.exports = router;