import react,{useState} from "react"
import avatar from "/profile.png"
import "../../Css/dash.css"
//library 
import {Link,useNavigate,useParams} from "react-router-dom"
import OutsideClickHandler from 'react-outside-click-handler';
import {useSelector} from "react-redux"
import Spinner from 'react-spinner-material';


//components
import {useGetCollesQuery,selectColleIds} from "../collections/colleApiSlice"

import {selectUserInfo} from "../../features/Slice"
//icon
import {IoIosArrowDown,IoIosArrowUp} from "react-icons/io"


const SideNav =({setIsOpen,isOpen})=>{
  
  const userInfo = useSelector(selectUserInfo)
  
  
  const {colleId} = useParams() 
  
  const colleIds = useSelector(selectColleIds)
  
    const {
    data,
  }=useGetCollesQuery("colleList",{
    //pollingInterval:15000,
    //refetchOnFocus:true,
    //refetchOnMountOrArgChange:true
  })
    
  
  let content;
  if(data){
    const {ids, entities} = data;
    
    if(ids?.length){
      
   content = ids.map(id=> <List id={id} setIsOpen={setIsOpen}/>)
  
  }}
    
  

  const [isDroped,setIsDroped] = useState(false)
  const navigate = useNavigate()
  
  const handleClick=()=>{
    setIsDroped(!isDroped)
  }
  
  const handleCollection=()=>{
    navigate("/dash")
  }
  

  
  return(
    <>
    
    <div className={` md:hidden w-screen h-screen ${isOpen ? "opacity-[0.6] left-0":"opacity-0 left-[-100%]"} bg-black  absolute top-0 left-0 z-40`}>
    </div>
      <OutsideClickHandler onOutsideClick={()=> setIsOpen(false)}>
    <div className={` sideNav overflow-auto w-[15rem] transition-all duration-200 ${ !isOpen ? "max-md:translate-x-[-100%]" : "max-md:translate-x-[0]"}  md:w-[20rem] bg-dark px-2 py-4  shadow relative max-md:absolute max-md:left-0 max-md:top-0 z-40 max-md:h-screen`}>
    
    {/*profile*/}
      <div className="border-b-[2px] border-light flex flex-col gap-3 text-center flex justify-center items-center p-4 pb-6">
      
        <div className="w-[10rem] h-[10rem] rounded-full border-4 shadow border-white outline-0 ">
          <img src={avatar} className="w-full outline-0 h-full rounded-full"
          />
        </div>
        
        <div className="flex flex-col text-center justify-center items-center">
          <p className="text-[1.3rem] font-bold text-red-400 ">{userInfo.username}</p>
          <p className="text-gray-200 font-medium">{
          userInfo.email.split("").length < 19 ? userInfo.email :
          `${userInfo.email.split("@")[0].slice(0,10)}...@gmail.com`
          }</p>
        </div>
        
        <Link className="w-full p-2 bg-light text-white text-center rounded-3xl hover:scale-110 duration-200 drop-shadow-lg">view profile</Link>
        
      </div>
    
    {/*collection*/}
    <div className="w-full  flex flex-col ">
    
    <div className="flex justify-between items-center text-white py-3 px-4 hover:bg-light">
      <p className="hover:text-red-400 hover:underline-offset-2 hover:underline font-bold text-[1.2rem] text-white "
      onClick={handleCollection}>Collections </p>
      <IoIosArrowUp size={23} onClick={handleClick} 
      className={` transistion-all duration-200 ${isDroped && "rotate-180"}`} />
    </div>
      
      <div className={`w-full pl-2  transition-all duration-200 text-white ${!isDroped ? "h-0" : "max-md:h-[12rem] h-[14rem]"} overflow-auto flex flex-col`}>
      
       {content}
   
      </div>
      
    </div>
  
    </div>
      </OutsideClickHandler>
      </>
    )
}


export default SideNav;


const List =({id,setIsOpen})=>{
  const {colleId} = useParams() 
  
  const {colle} = useGetCollesQuery("colleList",{
      selectFromResult:({data})=>({
        colle: data?.entities[id]
      })
    })
    
  return(
    
      <Link onClick={()=> setIsOpen(false)} to={`/dash/collection/${colle.id}`} className={`w-[100%] pl-4  ${ colleId === colle.id && "border-l-red-400 border-l-4" } p-2 border-b-[2px] border-light  hover:text-red-400 hover:underline`}>
      {
        colle.title.split("").length < 18
        ? colle.title :
        `${colle.title.slice(0,18)}...`
      }
        </Link>
    
    
    )
}