import React from 'react'
import Login from './auth/Login'
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Register from './auth/Register'
import Home from './Home/Home'
import Book from './Home/Book'
import { useState } from 'react'
export default function BookList() {
  const[token,setToken]=useState()
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login setToken={setToken}/>}/>
      {/* <Route path="/" element={<button onClick={()=>console.log("hiii")}>hii</button>}/> */}
      <Route path="/register" element={<Register />}/> 
      <Route path="/home" element={<Home token={token} setToken={setToken}/>}/>
    </Routes>
    </BrowserRouter>
  )
}
