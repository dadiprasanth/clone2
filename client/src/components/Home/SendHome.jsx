import React from 'react'
import { useState } from 'react'
import Bookholder from './Bookholder'
import { useNavigate } from 'react-router-dom'
export default function SendHome(props) {
    const nav=useNavigate()
    const{data,setdata,token,setToken}=props
    const[upbook,setupbook]=useState(false)
    const[sepecfic,setspecific]=useState({})
    const[addform,setaddform]=useState({})
    const[add,setadd]=useState(false)
    const[edit,setedit]=useState(false)
    const[editform,seteditform]=useState({})
    const addbookhadel=(e)=>{
      e.preventDefault()
       
        fetch("https://booklistback.vercel.app/book",{
          method:"POST",
          headers:{
            "Accept":"application/json",
            "Content-Type":"application/json",
            "Authorization":token
          },
          body:JSON.stringify(addform)
        }).then(x=>x.json()).then(y=>{
          console.log(y)
          if(y.status=="sucess"){
            alert("book added")
            console.log(data)
            setdata([...data,y.book])
            setadd(false)
    
          }
        })
      }
      const addbook=()=>{
        
        if(add){
          return(
            <div className="hidden" >
              <button onClick={()=>setadd(!add)}>Show Book list</button>
              <form onSubmit={addbookhadel}>
                <h1>Add a new book</h1>
                <h3>Create a new book</h3>
                <input type="text" placeholder='Title of the book' required onChange={e=>setaddform({...addform,title:e.target.value})} />
                <input type="text" placeholder='ISBN' onChange={e=>setaddform({...addform,isbn:e.target.value})} />
                <input type="text" placeholder='Author' required onChange={e=>setaddform({...addform,author:e.target.value})} />
                <input type="text" placeholder='Describe this book' required onChange={e=>setaddform({...addform,description:e.target.value})}/>
                <input type="text" placeholder='Published_date' onChange={e=>setaddform({...addform,publishedDate:e.target.value})}/>
                <input type="text" placeholder='Publisher of this book' onChange={e=>setaddform({...addform,publisher:e.target.value})}/>
                <button type="submit">Submit</button>
              </form>
            </div>
          )
        }
      }
      const deletebook=()=>{
        fetch(`https://booklistback.vercel.app/book/${sepecfic._id}`,{
          method:"DELETE",
          headers:{
            "Accept":"application/json",
            "Content-Type":"application/json",
            "Authorization":token
          }
        }).then(x=>x.json()).then(y=>{
          if(y.status=="sucess"){
            let arr=data
            for(let i=0;i<arr.length;i++){
              if(arr[i]._id==sepecfic._id){
                arr=arr.slice(0,i).concat(arr.slice(i+1,arr.length))
                setdata(arr)
                setupbook(!upbook)
                break
              }
            }
          }
        })
      }
      const put=(e)=>{
        e.preventDefault()
        console.log(editform)
        fetch(`https://booklistback.vercel.app/book/${sepecfic._id}`,{
          method:"DELETE",
          headers:{
            "Accept":"application/json",
            "Content-Type":"application/json",
            "Authorization":token
          },
          body:JSON.stringify(editform)
        }).then(x=>x.json()).then(y=>{
          if(y.status="sucess"){
            for(let i in editform){
              sepecfic[i]=editform[i]
            }
            alert("data updated")
            setedit(!edit)
          }
        })
        
      }
      const editbook=()=>{
        return(
          <div className="hidden" >
            <button onClick={()=>setedit(!edit)}>Show Book list</button>
            <form onSubmit={put}>
              <h1>Edit book</h1>
              <h3>update book info</h3>
              <input type="text" placeholder='Title of the book'  onChange={e=>seteditform({...editform,title:e.target.value})} />
              <input type="text" placeholder='ISBN' onChange={e=>seteditform({...editform,isbn:e.target.value})} />
              <input type="text" placeholder='Author' onChange={e=>seteditform({...editform,author:e.target.value})} />
              <input type="text" placeholder='Describe this book'  onChange={e=>seteditform({...editform,description:e.target.value})}/>
              <input type="text" placeholder='Published_date' onChange={e=>seteditform({...editform,publishedDate:e.target.value})}/>
              <input type="text" placeholder='Publisher of this book'onChange={e=>seteditform({...editform,publisher:e.target.value})}/>
              <button type="submit">Update book</button>
            </form>
          </div>
        )
      }
      const updatebook=()=>{
        return(
          <div className="hidden" >
             <button onClick={()=>setupbook(!upbook)}>Show Book list</button>
             <h1>Book's records</h1>
             <h3>View Book's info</h3>
             <div>
              <span>1</span><span>Title</span><span>{sepecfic.title}</span>
             </div>
             <div>
              <span>2</span><span>Author</span><span>{sepecfic.author}</span>
             </div>
             <div>
              <span>3</span><span>ISBN</span><span>{sepecfic.isbn}</span>
             </div>
             <div>
              <span>4</span><span>Publisher</span><span>{sepecfic.publisher}</span>
             </div>
             <div>
              <span>5</span><span>PublishedDate</span><span>{sepecfic.publishedDate}</span>
             </div>
             <div>
              <span>6</span><span>Description</span><span>{sepecfic.description}</span>
             </div>
             <div className='hiddeb-bth'>
             <button onClick={()=>{  setupbook(!upbook);setedit(!edit)}}>Update book</button>
             <button onClick={()=>deletebook()}>Delete Book</button>
             </div>
             
          </div>
          
        )
      }
  return (
    <div className='home'>
      
    <h1>BookList</h1>
    <div className='add-button'>
     
    
     <button onClick={()=>setadd(!add)}>+Add New Book</button>
     <button onClick={()=>{
      nav("/")
      setToken("")
      
     }}>Logout</button>
    </div>
    <Bookholder data={data} setupbook={setupbook} setspecific={setspecific}/>
    {add?addbook():<></>}
    {upbook?updatebook():<></>}
    {edit?editbook():<></>}
  </div>
  )
}
