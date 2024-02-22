import react,{useState,useRef,useEffect} from "react"
import avatar from "/profile.png"

//library 
import {Link,useNavigate} from "react-router-dom"
import { toast } from 'react-toastify';
import { RotatingLines} from 'react-loader-spinner'
import {useDispatch} from "react-redux"
import {setToken} from "../../features/Slice"

//components
import {usePwdLoginMutation} from "../api/authApiSlice2"

//icons
import {IoEyeSharp,IoEyeOff} from "react-icons/io5"

const PwdLogin  =({setIsVerified})=>{
  
  const dispatch = useDispatch()
  
  const [errMsg,setErrMsg] = useState("")
  const navigate = useNavigate()
  
  const [pwdLogin,{
    data,
    isLoading,
    isSuccess,
    isError,
    error
  }] = usePwdLoginMutation()
 
  //user info
  const [userName,setUsername] = useState(localStorage.getItem("username") || "username")
  const [userEmail,setUserEmail] = useState(localStorage.getItem("email") || "email@gmail.com")
  const [userProfile,setUserProfile] = useState(localStorage.getItem("profile") || "")
  
  
  //input
  const [pwd,setPwd]= useState("")
  
  const splitPwd = pwd.split("")
  const isValid = splitPwd.length > 6 
  const isClickable = splitPwd.length > 6 && !isLoading
  
  //handleChange
  const handleChange =(e)=>{
    setPwd(e.target.value)
    setErrMsg("")
  }
  
  //handleSubmit
  const handleSubmit=async(e)=>{
    e.preventDefault()
    setErrMsg("")
    await pwdLogin({email:userEmail, password:pwd})
  }
  
  
  useEffect(()=>{
    if(isSuccess){
      
    if(data?.success){
      setErrMsg("")
      
      toast.success(data?.message)
      
      localStorage.removeItem("verified")
      localStorage.removeItem("username")
      localStorage.removeItem("email")
      localStorage.removeItem("profile")
      localStorage.setItem("loggedIn",true)
      

      dispatch(setToken(data?.accessToken))
      navigate("/dash")
      
    }else{
      toast.error("No Internet connection")
      setErrMsg("")
    }
    
  }
  },[isSuccess || navigate])
  
  //error
  useEffect(()=>{
    if(isError){
      if(error?.data?.myError){
      setErrMsg(error?.data?.message)
    }else if(error?.status === "FETCH_ERROR"){
      toast.error("No Internet connection")
      setErrMsg("")
    }else{
      toast.error("something went wrong")
      setErrMsg("")
    }
    
  }
  },[error])
  
 
 //handleBack
 const handleBack=()=>{
   localStorage.removeItem("verified")
   localStorage.removeItem("username")
   localStorage.removeItem("email")
   localStorage.removeItem("profile")
   
   setIsVerified(false)
 }
  
  
  //recover
  const recover =()=>{
   localStorage.removeItem("verified")
   localStorage.removeItem("username")
   localStorage.removeItem("email")
   localStorage.removeItem("profile")
    navigate("/auth/recover")
  }
  
  //visible password
  const [isVisible,setIsVisible] = useState(false)
  
  return(
   
       <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2 justify-center items-center p-2">
       
       {errMsg &&
         <div className="w-full my-2 border-[1px] border-primary rounded-md p-2 text-primary font-normal overflow-auto" >
            {errMsg}
         </div>
       }
       {/*heading*/}
       <div className="flex flex-col gap-1 justify-center items-center mb-5">
         <p className="text-[2.5rem] font-bold text-primary ">
          Welcome!
         </p>
         
         <div className="flex gap-2 items-center justify-center flex-col text-center items-center">
           <div className="w-[4.5rem] h-[4.5rem] md:w-[4.5rem] md:h-[4.5rem] bg-white border-[1px] border-white  rounded-full">
             <img src={userProfile || avatar} className="w-full h-full rounded-full"/>
           </div>
          <div className=" ">
            <p className="text-[1.3rem] font-bold md:text-[1.5rem] ">{userName}</p>
            <p className="  text-gray-300 text-[0.9rem] md:text-[1.1rem] font-medium">{userEmail < 19 ? userEmail : `${userEmail.split("@")[0].slice(0,10)}...@gmail.com`}</p>
         </div>
         </div>
       </div>
         
         
        {/*password*/}
       <div className="w-full flex flex-col gap-2">
        
           <p className="text-center text-gray-400 italic  text-[0.95rem]">pls enter your password
           </p>
         
          <div className="relative">
          
           <input
           className="text-white bg-transparent border-2 border-gray-500 w-full p-3 rounded-lg font-medium outline-0 "
           name="password"
           type={isVisible ? "text" : "password"}
           placeholder="password"
           value={pwd}
           onChange={handleChange}
          
           />
           
           <div className="absolute top-3 right-3 text-gray-400 ">
            {!isVisible ?
            <IoEyeOff size={30} onClick={()=> setIsVisible(true)}/>
            :
            <IoEyeSharp size={30} onClick={()=> setIsVisible(false)}/>
            }
           </div>
          
         </div>
         </div>
         
         <div className="w-full my-3">
           <button disabled={!isClickable} className={`hover:scale-95 duration-200 ${isValid ? "bg-primary text-white" : "bg-gray-500 text-gray-400"} w-full p-2 rounded-lg text-[1.2rem] font-bold overflow-hidden relative `}>
             Login
               { isLoading &&  <span className="absolute w-full h-full top-0 left-0   flex justify-center items-center">
             <span className="absolute top-0 left-0 h-full w-full bg-black opacity-[0.6]"></span>
             <span className="z-30">
              <RotatingLines
  visible={true}
  height="45"
  width="45"
  color="rgba(20, 15, 51, 0.9)"
  strokeWidth="5"
  animationDuration="0.75"
  ariaLabel="rotating-lines-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
             </span>
             </span>
            }
           </button>
         </div>
         
        
         
          <p className="text-center font-medium mt-2">
             <button onClick={recover}  className="text-primary underline font-medium"> 
             Forgot password
           </button>
           </p>
         
         

       
       </form>
   
    
    
    )
}


export default PwdLogin;