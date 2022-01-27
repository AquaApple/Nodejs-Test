const User = require("../models/User");
const JWT = require("jsonwebtoken");

const register =  async (req , res)=>{
  try{
    const createdUser = await User.create(req.body)
      res.send(createdUser)
  }catch(err){
    res.status(400).send(err.message);
   }
  }

  const login =  async (req , res)=>{
    try{
      const logUser = await User.findOne({email:req.body.email})
      if(!logUser){
        
        return res.status(401).send("Cant Find user");
        
      }
      //Compare user password
      const isMatch = await logUser.comparePassword(req.body.password);
      if(!isMatch)
      {
        return res.status(401).send("Wrong Password")
      }
      const Token = JWT.sign({id:logUser._id,email:logUser.email,name:"Yasser"},"1",{expiresIn:"30d"})
        res.send({logUser,Token})
      }catch(err){
      res.status(400).send(err.message);
     }
    }
    
    const dashboard =  (req,res)=>{

      res.send({msg:"Welcome You're Authenticated",data:req.user})
    }

  
   module.exports = { register,login,dashboard }