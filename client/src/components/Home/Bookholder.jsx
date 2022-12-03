import React from 'react'
import Book from './Book'
export default function Bookholder(props) {
    const{data,setupbook,setspecific}=props
  return (
    <div className='bookholder'>
        {data.map(x=>{
            return(<Book data={x} setupbook={setupbook} setspecific={setspecific}/>)
        })}
    </div>
  )
}
