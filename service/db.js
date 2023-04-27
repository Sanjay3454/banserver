const mongoose=require("mongoose")

//connetcion string 

mongoose.connect("mongodb://127.0.0.1:27017/bankServer",{useNewUrlParser:true})


//model 
//schema means fields and values
const User=mongoose.model("user",
{


    
        username: String,
        acno: Number,
        password: String,
        balance: Number,
        transaction: []
      




}


)

module.exports={
    User
}