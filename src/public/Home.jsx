import react,{useState} from "react"
import {Link} from "react-router-dom"

const Home =()=>{
  
  
  return(
    <div className="bg-dark w-screen h-screen grid place-content-center">
    
      <Link to="auth/login" className="px-4 py-2 rounded-md text-[1.2rem] font-bold bg-primary text-white">Login</Link>
    </div>
    
    )
}


export default Home;