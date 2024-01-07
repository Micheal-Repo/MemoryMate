import react,{useState} from "react"
//icons
import {CgClose} from "react-icons/cg"



const Pop =({isOpen, onClose, children})=>{
  
  let content 
  
 
    content = (
    
    <div className={`transition-all  ${isOpen ? "duration-100 scale-100" :"scale-0 duration-1000"} fixed top-0 left-0 w-screen h-screen z-50 flex justify-center items-center`}>
        <div className={`transition-all  w-full h-full absolute top-0 left-0 bg-black ${!isOpen ? "duration-400 opacity-0" : "opacity-[0.7] duration-200"} `}>
        </div>
        
        <div className={`${isOpen ? "scale-100 duration-600" : "scale-0 duration-200"} transition-all duration-300 z-20 bg-white rounded-md  shadow-lg p-2`}>
        
        <div className="w-full text-right  flex items-end justify-end">
           <span 
           onClick={onClose}
           className="p-2 rounded-lg shadow-lg bg-gray-200 hover:bg-light hover:text-white mb-2">
             <CgClose size={25}/>
           </span>
        </div>
        
        
       {children}
       
        
      </div>
      
      
    </div>
    
    )

return content
}


export default Pop;