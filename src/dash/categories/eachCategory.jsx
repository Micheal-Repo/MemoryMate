import react,{useState} from "react"

//library
import {Outlet,useParams,useNavigate} from "react-router-dom"

//icons
import {MdAdd} from "react-icons/md"
import {FaListUl,FaSearch} from "react-icons/fa"
import {BsFillGrid3X3GapFill,BsBriefcaseFill} from "react-icons/bs"
import {IoIosArrowDown,IoIosArrowUp} from "react-icons/io"
import {HiDotsVertical} from "react-icons/hi"

const EachCategory =({cate})=>{
  const navigate = useNavigate()
  
  const handleClick=()=>{
    navigate(`/dash/collection/1234/notes/${cate}`)
  }
  
  return(
                  
                <div 
                onClick={handleClick}
                className="border-b-2 border-b-vlight shadow-sp w-full p-2 px-3 text-white  flex justify-between items-center hover:bg-vlight border-l-4 border-l-red-300">
                <div className="flex gap-3 items-center">
                  <BsBriefcaseFill className="text-gray-200"/>
                  <p className="font-medium w-[8.8rem] overflow-auto">Welcome</p>
                </div>
                
                  <HiDotsVertical size={23} className="text-gray-200"/>
                </div>
    
    )
}


export default EachCategory;