const express=require("express")
const mongoose=require("mongoose")
const route=require("./Routes/route")
const cors=require("cors")
const bodyparser=require("body-parser")
const app=express()
mongoose.connect('mongodb+srv://dadiprasanth24:9963753437@cluster0.gglcimt.mongodb.net/booklist',err=>{
    if(err){
        console.log("connection failed")
    }else{
        console.log("connected to database")
    }
})
app.use(cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }))
app.use("/",route)
  
const port=process.env.PORT||8080 
app.listen(port,console.log(`app is listening at ${port}`))