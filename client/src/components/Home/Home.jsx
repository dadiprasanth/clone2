import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

import SendHome from './SendHome'
export default function Home(props) {
  const{token,setToken}=props
  //console.log("home",token)
  const[data,setdata]=useState([{title:"",author:"",description:""}])
 
  useEffect(()=>{
    fetch("https://booklistback.vercel.app/book",{
      method:"GET",
      headers:{
        "Accept":"application/json",
        "Content-Type":"application/json",
        "Authorization":token
      }
    }).then(x=>x.json()).then(y=>setdata(y.data))
  },[])

  return (

    <SendHome data={data} setdata={setdata} token={token} setToken={setToken}/>
  )
}
