import react,{useState} from "react"
import "../Css/auth.css"

//library 
import {Swiper, SwiperSlide} from "swiper/react"
import 'swiper/css';

//components
import EmailLogin from "./components/emailLogin"
import PwdLogin from "./components/pwdLogin"

const Login =()=>{
  const [isVerified,setIsVerified] = useState(false)
  
  
  
  return(
    <div className="w-full h-full flex justify-center items-center">
        
         { isVerified ?
                 <PwdLogin/>
                 :
                 <EmailLogin setIsVerified={setIsVerified}/>
           } 
      
    </div>
    
    )
}


export default Login;