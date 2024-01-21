import react,{useState} from "react"

//library
import {Outlet,useParams,useNavigate} from "react-router-dom"
import OutsideClickHandler from 'react-outside-click-handler';

//components
import {useGetCatesQuery} from "./cateApiSlice"

//icons
import {MdAdd,MdDelete,MdInfo} from "react-icons/md"

import {FaListUl,FaSearch} from "react-icons/fa"
import {BsFillGrid3X3GapFill,BsBriefcaseFill} from "react-icons/bs"
import {IoIosArrowDown,IoIosArrowUp} from "react-icons/io"
import {HiDotsVertical} from "react-icons/hi"
import {AiFillEdit} from "react-icons/ai"

const EachCategory =({
  CateId,
  setIsDroped,
  index,
  Option,
  setOption,
  
  setEditCategoryName,
  setEditCategoryOpen,
  setEditCategoryId,
  
  setdeleteCategoryName,
  setdeleteCategoryOpen,
  setdeleteCategoryId
})=>{
  
  const navigate = useNavigate()
  const {colleId} = useParams()
  const {cateId} = useParams()
  //EachCategory
  const {cate}=useGetCatesQuery("cateList",{
    selectFromResult:({data})=>({
      cate : data?.entities[CateId]
    })
  })
  
  
  const handleClick=()=>{
    navigate(`/dash/collection/${colleId}/notes/${CateId}`)
    setIsDroped(false)
  }
  
  const preEdit =()=>{
    setEditCategoryOpen(true)
    setEditCategoryName(cate.title)
    setEditCategoryId(CateId)
  }
  
  const preDelete =()=>{
    setdeleteCategoryOpen(true)
    setdeleteCategoryId(CateId)
    setdeleteCategoryName(cate.title)
  }
  
  return(
                  
                <div 
                
                className={`border-b-2 border-b-light shadow-sp w-full p-2 px-3 text-white  flex justify-between items-center hover:bg-light ${CateId === cateId && "border-l-4 border-l-red-300"} relative`}>
                
                <div className="flex gap-3 items-center justify-between">
                  
                  <p onClick={handleClick} className="font-medium w-[8.5rem] overflow-auto h-full hover:text-red-300 hover:underline">{cate.title}</p>
                </div>
                <button onClick={()=> setOption(CateId)} className="px-2 p-1">
                  <HiDotsVertical  size={23} className="text-gray-200 hover:text-red-300"/>
                  
                </button>
                {/*Options*/}
                <OutsideClickHandler onOutsideClick={()=> setOption("")}>
                  <div className={`${Option === CateId ? "w-[6rem] h-[2rem]" : "w-0 h-0" } transition-all duration-200 absolute top-[2rem] right-7 bg-light flex z-10 rounded-md backdrop-blur-2xl border-2 border-gray-700 hover:border-transparent  justify-between items-center overflow-hidden`}>
                   <span onClick={preDelete} className=" hover:bg-red-300 rounded-md h-full w-full grid place-content-center"> 
                     <MdDelete/>
                   </span>
                   <span onClick={preEdit} className=" hover:bg-red-300 rounded-md h-full w-full grid place-content-center"> 
                     <AiFillEdit/>
                   </span>
                   <span className="grid place-content-center hover:bg-red-300 rounded-md h-full w-full grid place-content-center"> 
                     <MdInfo/>
                   </span>
                  </div>
              </OutsideClickHandler>
                </div>
    
    )
}


export default EachCategory;