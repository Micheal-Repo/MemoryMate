import react,{useState} from "react"
import Icon from "../../assests/memory.jpg"
import {MdClose,MdMenu} from "react-icons/md"
import {FaSearch} from "react-icons/fa"

const Nav =({setIsOpen,isOpen})=>{
  const handleClick =()=>{
    setIsOpen(!isOpen)
  }
  
  return(
    <div className="wrapper bg-dark text-white absolute left-0 top-0 w-[100%] py-5 flex justify-between items-center z-10">
    
  
    <div className="flex gap-1 items-center">
        <div className="w-[2.5rem] h-[2.5rem] border-[1px] border-gray-500 shadow rounded-full overflow-hidden relative">
          <img src={Icon} className="w-full h-full rounded-full"/>
          <div className="absolute top-0 left-0 w-full h-full text-center font-bold flex justify-center items-center  opacity-50 text-2xl rounded-full">
            M
          </div>
        </div>
        
        <div className="text-[1rem] font-medium ">
         MemoryMate
        </div>
    </div>
    
    
    <div className="flex gap-2 justify-center items-center">
     <FaSearch size={22}/>
     
     { isOpen ?
     <MdClose size={30} className="md:hidden" onClick={handleClick}/>
     :
     <MdMenu size={30} className="md:hidden" onClick={handleClick}/>
     }
    </div>
    
    </div>
    
    )
}


export default Nav;