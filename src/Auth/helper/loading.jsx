import react,{useState} from "react"
import { ThreeDots} from 'react-loader-spinner'

const Lazyloading =()=>{
  
  
  return(
    <div className="w-screen h-screen absolute top-0 left-0 flex justify-center items-center z-50">
       <div className="absolute w-full h-full bg-dark top-0 left-0"></div>
  
   
   <div className="flex flex-col justify-center items-center z-30">
     <span><ThreeDots
  visible={true}
  height="80"
  width="80"
  color="rgba(200,200,200,1)"
  radius="9"
  ariaLabel="three-dots-loading"
  />
  </span>
   
   <p className="text-[1.1rem] text-gray-100 font-medium">Please wait...</p>
  
   </div>
   
    </div>
    
    )
}


export default Lazyloading;