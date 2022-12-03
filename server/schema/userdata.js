const mongoose=require("mongoose")
const schema=mongoose.Schema
const Blogpost=new schema({
    id:{type:String,required:true},
    title:{type:String,required:true},
    author:{type:String,required:true},
    isbn:{type:String},
    publisher:{type:String},
    publishedDate:{type:String},
    description:{type:String,required:true}
})
const users=mongoose.model("booklistdata",Blogpost)
module.exports=users