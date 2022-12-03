const mongoose=require("mongoose")
const schema=mongoose.Schema
const Blogpost=new schema({
    email:{type:String,required:true,unique:true},
    password:{type:String}
})
const users=mongoose.model("booklistusers",Blogpost)
module.exports=users