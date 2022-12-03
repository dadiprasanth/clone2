import React from 'react'

export default function Book(props) {
    const{data,setupbook,setspecific}=props
  return (
    <div className='book' onClick={()=>{setspecific(data);setupbook(e=>!e)}}>
        <div className='book-img'>
            <img src="book.webp"/>
        </div>
        <div className='title'>Title:{data.title}</div>
        <div>Author:{data.author}</div>
        <div>Description:{data.description}</div>
        
    </div>
  )
}
