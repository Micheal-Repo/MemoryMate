import react,{useState} from "react"
import bg from "../assests/dashBg.jpg"
import "../Css/dash.css"
//library
import {Outlet} from "react-router-dom"

//components
import Nav from "./components/nav"
import SideNav from "./components/sideNav"

const DashLayout =()=>{
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