import react,{useState} from "react"
import noIternet from "/no-internet.svg"

const NoInternet =()=>{
  

  
  const handleReload =()=>{
    window.location.reload()
  }
  return(
    <div className="text-black  flex flex-col justify-center items-center w-full h-full gap-4">
      
      <img className="w-[8rem]" src={noIternet}/>
       <p  className="text-[1.2rem]" >No internet connection</p>
       
       <button onClick={handleReload} className="bg-light text-white font-medium py-1 px-6 rounded-lg mt-4">reload</button>
    </div>
    
    )
}


export default NoInternet;