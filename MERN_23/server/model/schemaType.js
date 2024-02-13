const Mongoose  = require("mongoose");
const bcrypt = require('bcryptjs')
const jswebtoken = require('jsonwebtoken')

const schemaType = new Mongoose.Schema({
  name : {type : String, required : true},
  email : {type : String, required : true},
  phone : {type : Number, required : true},
  work : {type : String, required : true},
  password : {type : String, required : true},
  confirmPassword : {type : String, required : true},

  //-- add token object
  tokens : [
    {
      token : {type : String, required : true}
    }
  ]
})

//:: --- securing password ---
//-- Plain text to Hash
schemaType.pre('save', async function(next){
  if(this.isModified('password')){
    this.password = await bcrypt.hash(this.password, 12)
    this.confirmPassword = await bcrypt.hash(this.confirmPassword, 12)
  }
  next()
})

//:: --- json web token ---
schemaType.methods.authTokenFunction = async function(){
  try {
    //-- Create a secret key in config.env file lenght must be 32
    //? _id : this._id belongs to email : email
    let createToken = jswebtoken.sign({
      _id : this._id
    }, process.env.SECRET_KEY)

    // Initliaz toke in schema object
    this.tokens = this.tokens.concat({token : createToken})
    await this.save();
    return createToken;
  } catch (error) {
    console.log(error);
  }
}

//-- Creating Collection, Name of Registration
const UserRegistration = Mongoose.model('RegistrationData', schemaType);
module.exports = UserRegistration;