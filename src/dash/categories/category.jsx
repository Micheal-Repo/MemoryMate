import react,{useState} from "react"

//library 
import {Outlet,useParams} from "react-router-dom"
import OutsideClickHandler from 'react-outside-click-handler';

//icons
import {MdAdd} from "react-icons/md"
import {FaListUl,FaSearch} from "react-icons/fa"
import {BsFillGrid3X3GapFill,BsBriefcaseFill} from "react-icons/bs"
import {IoIosArrowDown,IoIosArrowUp} from "react-icons/io"
import {HiDotsVertical} from "react-icons/hi"

//components
import EachCategory from "./eachCategory"

const Category =()=>{
  const {colleId} = useParams()
  
  const [isDroped,setIsDroped] = useState(false)
  
  const handleClick=()=>{
    setIsDroped(!isDroped)
  }
  
  return(
    <div className="h-full w-full wrapper2">
    
      
 {/*First Part*/}
    {/*left*/}
      <div className=" w-full md:pt-[2rem] pt-[0.8rem] pb-[0.5rem] border-b-[2px] border-light px-2 flex justify-between items-end overflow-auto">
          <div className="flex flex-col   pr-2">
             <p className="max-md:text-[1rem] font-bold text-[1.2rem]">{colleId}</p>
          </div>
          
    {/*right*/}
          <div>

          </div>
          </div>
          
           {/*2nd Part*/}
          <div className="w-full  py-3 max-sm:py-2 relative">
            <div className="p-2 px-3 bg-light rounded-lg w-[10rem] md:w-[15rem] flex text-white justify-between items-center gap-2"
            
            >
              <p className="w-[8rem] md:w-[12rem] overflow-auto"
             onClick={handleClick} >Categories</p>
              <IoIosArrowUp 
              onClick={handleClick}
              className={`transition-all duration-200 ${isDroped && "rotate-180"}`} size={25}/>
            </div>
           
           {/*categories*/} 
           <OutsideClickHandler onOutsideClick={()=> setIsDroped(false)}>
          <div className="absolute top-[3.5rem] left-0 z-20 ">
              <div className={`shadow-md  border-gray-100 transition-all duration-200 rounded-2xl  ${isDroped ? "p-3 w-[15rem] md:w-[18rem] h-[30rem] max-md:h-[26rem]" : "w-[10rem] md:w-[15rem] h-0"} bg-dark  overflow-scroll`}>
              
               {/*search*/} 
              <div className="w-full p-2 rounded-lg bg-white flex gap-2 items-center">
                <FaSearch size={20} className="text-gray-400"/>
                <input 
                placeholder="search categories"
                className="outline-0 w-full h-full"
                />
              </div>
              
                {/*Total*/} 
              <div className="w-full py-2 font-bold text-white flex justify-between items-center">
               <p className="text-red-300">Total: 28</p>
                <p className="font-bold bg-red-300 text-dark rounded-lg px-2 py-1 hover:bg-"> 
                <MdAdd size={26}/>
               
                </p>
              </div>
              
               {/*list of Category*/} 
             <div style={{height:"calc(100% - 6rem)"}} className="scroll w-full flex flex-col  pr-1  overflow-y-scroll rounded-lg">
               
                <EachCategory cate={false}/>
                <EachCategory cate={true}/>
                
                
                
              

                
              
             </div>
          </div>
        </div>
          </OutsideClickHandler>
        </div>
      
      
        {/*3rd Part*/}
        
         <Outlet/>
        
    
    </div>
    
    )
}


export default Category;