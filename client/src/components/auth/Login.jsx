import React from 'react'
import { useState } from 'react'
import {Link,useNavigate} from "react-router-dom"
export default function Login(props) {
  const{setToken}=props
  const nav=useNavigate()
    const[form,setform]=useState({})
    const handler=(e)=>{
        e.preventDefault()
        console.log(form)
        fetch("https://booklistback.vercel.app/login",{
          method:"POST",
          headers:{
            "Accept":"application/json",
            "Content-Type":"application/json"
          },
          body:JSON.stringify(form)
        }).then(x=>x.json()).then(y=>{
          if(y.status=="sucess"){
            console.log(y)
            setToken(y.token)
            nav("/home")
          }else{
            alert(y.message)
          }
        })
    }
  return (
    <div className='aut-conatiner'>
        <form onSubmit={handler}>
            <h1>Login</h1>
            <label >username</label>
            <input  required type="email" placeholder='abc@email.com' onChange={e=>setform({...form,email:e.target.value})} />
            <label >password</label>
            <input  type="password" required onChange={e=>setform({...form,password:e.target.value})} />
            <button type="submit">Login</button>
            Didn't have an account?<Link to="/register">SignUP</Link>
        </form>
    </div>
  )
}
