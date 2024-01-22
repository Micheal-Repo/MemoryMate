import react,{useState,useEffect} from "react"
import Icon from "/memory.jpg"
//icon
import {MdClose,MdMenu} from "react-icons/md"
import {FaSearch} from "react-icons/fa"
import {HiDotsVertical} from "react-icons/hi"
//library 
import OutsideClickHandler from 'react-outside-click-handler';
import {useLogoutMutation} from "../../Auth/api/authApiSlice2"
import {Link,useNavigate} from "react-router-dom"
import Spinner from 'react-spinner-material';

const Nav =({setIsOpen,isOpen})=>{
  
  const navigate = useNavigate()
  
  const handleClick =()=>{
    setIsOpen(!isOpen)
  }
  
  const [optionOpen,setOptionOpen] = useState(false)
  
  //  handleLogOut
const [logoutOpen,setLogoutOpen] = useState(false)

  const [logout,{
    data:logData,
    isLoading :islogLoading,
    isSuccess :islogSuccess,
    isError :isLogError,
    error:logError
  }] = useLogoutMutation()
  
  const handleLogOut = async()=>{
    setLogoutOpen(true)
   await logout()
  }
  
  let logContent;
  if(islogLoading){
    logContent = <div className="flex flex-col items-center gap-2">

    <div className="p-2 bg-light shadow-sp rounded-full w-fit">
      <Spinner radius={30} color={"#fff"} stroke={4} visible={true} />
    </div>
     <p className="font-medium text-gray-200 italic">logging out ...</p>
    </div>
  }
  
    
  if(islogSuccess){
    if(logData?.success){
      logContent = <p className="font-medium text-gray-200 italic">{logData?.message}</p>
      
      setTimeout(()=>{
      localStorage.removeItem("loggedIn")

      },1000)
 
    }
    }
    
  useEffect(()=>{
    if(logData?.success){
      setTimeout(()=>{
         navigate("/auth/login",{replace:true})
      },1000)
    }
  
  },[islogSuccess || navigate])
  
 if(isLogError){
    if(logError?.data?.myError){
      logContent = <p className="font-medium text-gray-200 italic">{logError?.data?.message}</p>
      
    }else if(logError?.status === "FETCH_ERROR"){
       
    logContent = <div className="w-fit flex flex-col gap-2 justify-center items-center">
         <p className="font-medium text-gray-200 italic">No Internet connection</p>
         <p onClick={handleLogOut} className="px-4 rounded-md py-1  bg-light shadow-sp text-red-400 font-medium ">retry</p>
      </div>
       
      
    }else{
      
       logContent = <div className="w-fit flex flex-col gap-2">
         <p className="font-medium text-gray-200 italic">Something went wrong</p>
         <p onClick={handleLogOut} className="px-4 rounded-md py-1  bg-light shadow-sp text-red-400 font-medium ">retry</p>
      </div>
     
    }
    
 }
  
  return(
    <>
     <div className={`${logoutOpen ? "scale-100" : "scale-0"} absolute top-0 left-0 w-full h-full bg-black opacity-[0.7] z-50`}>
     </div>
      <div className={`${logoutOpen ? "scale-100" : "scale-0" } transition-all duration-200 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] max-sm:w-[20rem] w-[22rem]  bg-dark rounded-lg z-50 shadow-2xl p-4 grid place-content-center text-white`}>

         {logContent}
      </div>
  
    <div className="wrapper bg-dark text-white absolute left-0 top-0 w-[100%] py-5 flex justify-between items-center z-10">
    <div className="flex gap-2 items-center">
         { isOpen ?
     <MdClose size={25} className="md:hidden" onClick={handleClick}/>
     :
     <MdMenu size={25} className="md:hidden" onClick={handleClick}/>
     }
  
    <div onClick={()=> navigate("/")} className="flex gap-1 items-center ">
        <div className="w-[2.5rem] h-[2.5rem] border-[1px] border-gray-500 shadow rounded-full overflow-hidden relative">
          <img src={Icon} className="w-full h-full rounded-full"/>
          <div className="absolute top-0 left-0 w-full h-full text-center font-bold flex justify-center items-center  opacity-50 text-2xl rounded-full">
            M
          </div>
          </div>
        </div>
        
        <div onClick={()=> navigate("/")} className="text-[1rem] font-medium ">
         MemoryMate
        </div>
    </div>
    
    
    <div className="flex gap-2 justify-center items-center relative">
     <FaSearch size={20}/>
     <HiDotsVertical size={22} onClick={()=> setOptionOpen(true)}/>
     
    <OutsideClickHandler onOutsideClick={()=> setOptionOpen(false)}>
     <div className={`shadow-sp border-[2px] border-light rounded-md bg-light top-[1.8rem] right-2 absolute ${optionOpen ? "w-[9rem]" : "w-0 h-0"} text-left  flex flex-col overflow-hidden`}>
       <button className="w-full text-left p-2 border-b-[2px] border-slate-600 hover:bg-slate-700">settings</button>
       <button onClick={handleLogOut} className="w-full text-left p-2 hover:bg-slate-700">logOut</button>
     </div>
    </OutsideClickHandler>
    </div>
    
    </div>
    </>
    
    )
}


export default Nav;