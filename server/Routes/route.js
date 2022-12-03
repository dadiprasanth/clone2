const express=require("express")
const users=require("../schema/users")
const userdata=require("../schema/userdata")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const route=express.Router()
const secret="sugar"
module.exports=route
route.get("/",async(req,res)=>{

    res.status(200).json({
        message:"sucess"
    })
})
route.post("/login",async(req,res)=>{
   
    try{
        //check email id
        const check=await users.findOne({email:req.body.email})
        if(check){
            //checking password
            bcrypt.compare(req.body.password, check.password,async function(err, result) {
                // result == true
                if(err){
                    return res.status(400).json({
                        status:"error",
                        message:err
                    })
                }
                else{
                if(!result){
                    return res.status(400).json({
                        status:"error",
                        message:"password and userid not matched"
                    })
                }else{
                    // creating token
                    const token=jwt.sign({
                        exp: Math.floor(Date.now() / 1000) + (60 * 60),
                        data: check._id
                      }, secret);
                      return res.status(200).json({
                        status:"sucess",
                        message:"user is autenticated",
                        token
                      })
                }
                }
            });
        }else{
            return res.status(400).json({
                message:"user is not registered",
                status:"error"
            })
        }


    }catch(e){
        return res.status(400).json({
            message:e.message,
            status:"error"
        })
    }
})
route.post("/register",async(req,res)=>{
    console.log(req.body)
    try{
        const check=await users.findOne({email:req.body.email})
        if(!check){
        //     email,
        // password
        bcrypt.hash(req.body.password, 10, async function(err, hash) {
            // Store hash in your password DB.
            if(err){
                return res.status(400).json({
                    message:err,
                    status:"error"
                })
            }else{
                await users.create({email:req.body.email,password:hash})
                return res.status(200).json({
                    message:"created new account for user",
                    status:"sucess"
                })
            }
        });


        }else{
            return res.status(400).json({
                status:"error",
                message:"user is already registered"
            })
        }
        

    }catch(e){
        return res.status(400).json({
            message:e.message,
            status:"error"
        })
    }
})
route.post("/book",async(req,res)=>{
    try{
        //check token
        jwt.verify(req.headers.authorization, secret,async function(err, decoded) {
            if(err){
                return res.status(400).json({
                    status:"error",
                    message:err
                })
            }else{
                const check=await users.findOne({_id:decoded.data})
                if(check){
                    //valif user
                    const book=await userdata.create({id:decoded.data,...req.body})
                    return res.status(200).json({
                        status:"sucess",
                        message:"added book sucessfully",
                        book
                    })
                }else{
                    return res.status(400).json({
                        status:"error",
                        message:"token miss matched"
                    })
                }
            }
          });

    }catch(e){
        return res.status(400).json({
            message:e.message,
            status:"error"
        })
    }
})
route.get("/book",async(req,res)=>{
    try{
        //check token
        jwt.verify(req.headers.authorization, secret,async function(err, decoded) {
            if(err){
                return res.status(400).json({
                    status:"error",
                    message:err
                })
            }else{
                const check=await users.findOne({_id:decoded.data})
                if(check){
                    //valif user
                    const data=await userdata.find({id:check._id})
                    return res.status(200).json({
                        status:"sucess",
                        message:"added book sucessfully",
                        data
                    })
                }else{
                    return res.status(400).json({
                        status:"error",
                        message:"token miss matched"
                    })
                }
            }
          });

    }catch(e){
        return res.status(400).json({
            message:e.message,
            status:"error"
        })
    }
})
route.put("/book/:id",async(req,res)=>{
    try{
        //check token
        jwt.verify(req.headers.authorization, secret,async function(err, decoded) {
            if(err){
                return res.status(400).json({
                    status:"error",
                    message:err
                })
            }else{
                const check=await users.findOne({_id:decoded.data})
                if(check){
                    //valif user
                    const data=await userdata.updateOne({_id:req.params.id},req.body)
                    return res.status(200).json({
                        status:"sucess",
                        message:" book updated sucessfully",
                        data
                    })
                }else{
                    return res.status(400).json({
                        status:"error",
                        message:"token miss matched"
                    })
                }
            }
          });

    }catch(e){
        return res.status(400).json({
            message:e.message,
            status:"error"
        })
    }
})
route.delete("/book/:id",async(req,res)=>{
    try{
        //check token
        jwt.verify(req.headers.authorization, secret,async function(err, decoded) {
            if(err){
                return res.status(400).json({
                    status:"error",
                    message:err
                })
            }else{
                const check=await users.findOne({_id:decoded.data})
                if(check){
                    //valif user
                    const data=await userdata.deleteOne({_id:req.params.id})
                    return res.status(200).json({
                        status:"sucess",
                        message:" book deleted sucessfully",
                        data
                    })
                }else{
                    return res.status(400).json({
                        status:"error",
                        message:"token miss matched"
                    })
                }
            }
          });

    }catch(e){
        return res.status(400).json({
            message:e.message,
            status:"error"
        })
    }
})
