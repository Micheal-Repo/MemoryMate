import react,{useState,useEffect} from "react"
import bg from "/dashBg.jpg"
import "../Css/dash.css"

import UseTitle from "../Accessories/useTitle"

//library
import {Outlet} from "react-router-dom"
import {useSelector} from "react-redux"
import {selectUserInfo} from "../features/Slice"

//components
import Nav from "./components/nav"
import SideNav from "./components/sideNav"
import Notify from "./components/notification"

const DashLayout =()=>{
  const userInfo = useSelector(selectUserInfo)
  UseTitle(`memory-mate | Dashboard - ${userInfo.username}`)
  
  
  const [notiOpen,setNotiOpen] = useState(false)
  const [isOpen,setIsOpen] = useState(false)
  
  useEffect(()=>{
    
    //localStorage.removeItem("notiOpen")
    const IsOpen = localStorage.getItem("notiOpen") || true
    
    
    
    if(IsOpen === true){
      setTimeout(()=>{
        
       setNotiOpen(IsOpen)
      },3000)
    }
  },[])
  
  const closeNoti =()=>{
    //alert("hello")
    localStorage.setItem("notiOpen", false)
    setNotiOpen(false)
    
    
  }
  return(
    <div 
      className="text-black w-screen h-screen relative overflow-auto pt-[5rem]">
    <Notify notiOpen={notiOpen} closeNoti={closeNoti}/>
    
    {/*Nav bar*/}
    <Nav setIsOpen={setIsOpen} isOpen={isOpen}/>
    
    <div className="flex justify-between h-full overflow-auto">
    {/*side bar*/}
    <SideNav setIsOpen={setIsOpen} isOpen={isOpen}/>
    
     <div className="dashW max-md:w-full">
       <Outlet/>
     </div>
    </div>
   
    </div>
    
    )
}


export default DashLayout;