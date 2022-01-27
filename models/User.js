const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema ({
  name:{
    type:String,
    required:[true , "Name Field is Required"]
  },
  email:{
      type:String,
      required:[true, "Email is required"],
        validate: {
          validator: (v)=>validator.isEmail(v),
          message:   "Email is not valid"
        },
      unique:true
  },
  password:{
      type:String,
      require:true,
  }
})

userSchema.pre("save", async function(){
  return this.password = await bcrypt.hash(this.password,2);
})
userSchema.methods.comparePassword = async function(pass){
  return await bcrypt.compare(pass,this.password)
}

module.exports = mongoose.model("User",userSchema)



