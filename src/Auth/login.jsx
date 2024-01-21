import react,{useState,useEffect} from "react"
import "../Css/auth.css"

import UseTitle from "../Accessories/useTitle"

//library 
import {Swiper, SwiperSlide} from "swiper/react"
import 'swiper/css';
import {useNavigate} from "react-router-dom"

//components
import EmailLogin from "./components/emailLogin"
import PwdLogin from "./components/pwdLogin"

const Login =()=>{
  
  UseTitle("memory-mate | login")
  const navigate = useNavigate()
  
 const [loggedIn,setLoggedIn] = useState(localStorage.getItem("loggedIn") || false)
  
   useEffect(()=>{
     if(loggedIn){
       navigate("/dash")
    }
  },[])
  
  const [isVerified,setIsVerified] = useState(localStorage.getItem("verified") || false)
  
  
  return(
    <div className=" w-full h-full flex justify-center items-center">
        
                { isVerified ?
                 <PwdLogin setIsVerified={setIsVerified}/>
                 :
                 <EmailLogin setIsVerified={setIsVerified}/>
           } 
      
    </div>
    
    )
}


export default Login;