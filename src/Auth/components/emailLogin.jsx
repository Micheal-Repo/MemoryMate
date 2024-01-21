import react,{useState,useRef,useEffect} from "react"

//library 
import {Link} from "react-router-dom"
import {useFormik} from "formik"
import { toast } from 'react-toastify';
import { RotatingLines} from 'react-loader-spinner'
import {useNavigate} from "react-router-dom"

//components
import {validateEmailLogin} from "../helper/validate"
import {useEmailLoginMutation} from "../api/authApiSlice2"

const EmailLogin =({setIsVerified})=>{
  
  const emailRef = useRef()
  const [errMsg,setErrMsg] = useState("")
  
  const navigate = useNavigate()
  
  //EmailLogin
  const [emailLogin,{
    data,
    isLoading,
    isSuccess,
    isError,
    error
  }]  = useEmailLoginMutation()
  
  
  
  useEffect(()=>{
  //  emailRef.current.focus()
  },[])
  
  const {values,handleChange, handleSubmit,errors} = useFormik({
    initialValues : {
      email:""
    },
    validationSchema:validateEmailLogin,
    validateOnBlur:false,
    validateOnChange:false,
    onSubmit:async(values)=>{
      setErrMsg("")
      const res = await emailLogin(values)
    //setIsVerified(true)
  }
  })
  
  //
  
  useEffect(()=>{
    if(isSuccess){
      
    if(data?.success){
      
      if(!data?.verified){
        
        toast.error(data?.message)
        localStorage.setItem("userId",data?.id);
       localStorage.setItem("userEmail",data?.email);
       
       setTimeout(()=>{
        navigate("/auth/verify-email")
      },1000)
     
     
   }else{
      localStorage.setItem("verified",true)
      localStorage.setItem("username",data?.username)
      localStorage.setItem("email",data?.email)
      localStorage.setItem("profile",data?.profile)
      
        
      setIsVerified(true)
      
      
      setErrMsg("")
   }
      
    }else{
      toast.error("something went wrong")
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
      toast.error("No internet connection")
      setErrMsg("")
    }else{
      toast.error("something went wrong")
      setErrMsg("")
    }
    
  }
  },[error])
  
  
  
  
  return(
   
   
       <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2 md:gap-3 justify-center items-center p-3">
       
              {errMsg &&
         <div className="w-full my-2 border-[1px] border-error rounded-md p-2 text-error font-normal overflow-auto" >
            {errMsg}
         </div>
       }
       
       <div className="text-center">
         <p className="text-[2.5rem] font-bold text-primary mb-1 md:mb-2">Login</p>
         <p className="text-[1.2rem] md:text-[1.5rem] font-medium mb-6">
         welcome back to the MemoryMate
         </p>
       </div>
       
         
         <div className="flex flex-col gap-2 w-full">
           <p className="text-[0.9rem] text-center text-gray-400 italic mb-2 md:mb-3 md:text-[1.2rem]">pls enter your email to continue
           </p>
           
           <input
           className="text-white bg-transparent border-2 border-gray-500 w-full p-3 rounded-lg font-medium outline-0 "
           name="email"
           type="email"
           placeholder="Email"
           value={values.email}
           onChange={handleChange}
           
           />
           {errors.email &&
             <p className="text-[0.9rem] ml-2 italic text-primary font-medium">{errors.email}</p>
           }
         </div>
         
         <div className="w-full my-3">
           <button disabled={isLoading} className="hover:scale-95 duration-200 w-full p-2 rounded-lg text-[1.2rem] bg-primary font-bold relative overflow-hidden">
             Continue
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
         
         
          <p className="text-center font-medium">
           Don't have account? 
             <Link to="/auth/register" className="text-primary underline font-medium"> Register
           </Link>
           </p>
         
         
         <div>
           <p></p>
         </div>
       
       </form>
   
    
    
    )
}


export default EmailLogin;