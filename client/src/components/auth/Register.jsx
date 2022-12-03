import React from 'react'
import {Link,useNavigate} from "react-router-dom"
import { useState } from 'react'
export default function Register() {
  const nav=useNavigate()
  const[form,setform]=useState({})
  const handler=(e)=>{
    e.preventDefault()
    console.log(form)
    if(form.password!=form.conpassword){
      alert("password miss match")
    }else{
      fetch("https://booklistback.vercel.app/register",{
        method:"POST",
        headers:{
          "Accept":"application/json",
          "Content-Type":"application/json"
        },
        body:JSON.stringify({email:form.email,password:form.password})
      }).then(x=>x.json()).then(y=>{
        if(y.status=="sucess"){
          
          nav("/")
        }
        alert(y.message)
      })
    }
}
  return (
    <div className='aut-conatiner'>
        <form onSubmit={handler}>
            <h1>Register</h1>
            <label >username</label>
            <input  required type="email" placeholder='abc@email.com' onChange={e=>setform({...form,email:e.target.value})} />
            <label >password</label>
            <input  type="password" required onChange={e=>setform({...form,password:e.target.value})} />
            <label >conform password</label>
            <input  type="password" required onChange={e=>setform({...form,conpassword:e.target.value})} />
            <button type="submit">Register</button>
            Do have an account?<Link to="/">SignIn</Link>
        </form>
    </div>
  )
}
