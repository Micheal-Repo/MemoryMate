import react,{useState} from "react"
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

const DashLayout =()=>{
  const userInfo = useSelector(selectUserInfo)
  UseTitle(`memory-mate | Dashboard - ${userInfo.username}`)
  
  
  const [isOpen,setIsOpen] = useState(false)
  
  return(
    <div 
      className="text-black w-screen h-screen relative overflow-auto pt-[5rem]">
    
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