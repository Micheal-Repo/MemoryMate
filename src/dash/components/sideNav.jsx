import react,{useState} from "react"
import avatar from "../../assests/profile.png"
import "../../Css/dash.css"
//library 
import {Link,useNavigate,useParams} from "react-router-dom"
import OutsideClickHandler from 'react-outside-click-handler';

//icon
import {IoIosArrowDown,IoIosArrowUp} from "react-icons/io"


const SideNav =({setIsOpen,isOpen})=>{
  const {colleId} = useParams() 
  
  const [collections,setCollections]= useState([
   {title: "physiology",desc:"physiology is the study of human"},
   {title: "biochemistry",desc:"biochemistry is the study of human"},
   {title: "microbiology",desc:"microbiology is the study of microrganism"},
   {title: "chemistry",desc:"chemistry is the study of atoms"},
   
    ])
    
  let content;
  content = collections.map((colle,index)=>(
  <Link onClick={()=> setIsOpen(false)} to={`/dash/collection/${colle.title}`} className={`w-[100%] pl-4  ${ colleId === colle.title && "border-l-primary border-l-4" } p-2 border-b-[2px] border-light overflow-auto hover:text-red-400 hover:underline`}>{colle.title}</Link>
  ))    
    
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
          <p className="text-[1.3rem] font-bold text-primary ">Michael Aloysius</p>
          <p className="text-gray-200 font-medium">email@gmail.com</p>
        </div>
        
        <Link className="w-full p-2 bg-light text-white text-center rounded-3xl hover:scale-110 duration-200 drop-shadow-lg">view profile</Link>
        
      </div>
    
    {/*collection*/}
    <div className="w-full p-4 flex flex-col gap-1">
    
    <div className="flex justify-between items-center text-white">
      <p className="hover:text-red-400 hover:underline-offset-2 hover:underline font-bold text-[1.2rem] text-white"
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