import react,{useState,useRef,useEffect} from "react"

import UseTitle from "../Accessories/useTitle"
//library 
import {Link,useNavigate} from "react-router-dom"
import {useFormik} from "formik"
import { toast } from 'react-toastify';
import { RotatingLines} from 'react-loader-spinner'


//components
import {validateEmailLogin} from "./helper/validate"
import {useRecoverMutation} from "./api/authApiSlice2"

const Recover =()=>{
  UseTitle("memory-mate | password reset")
  
  const [errMsg,setErrMsg] = useState("")
  const navigate = useNavigate()
  
  //useRecoverMutation
  const [recover,{
    data,
    isLoading,
    isSuccess,
    isError,
    error
  }] = useRecoverMutation()
  
  
  const {values,handleChange, handleSubmit,errors} = useFormik({
    initialValues : {
      email:""
    },
    validationSchema:validateEmailLogin,
    validateOnBlur:false,
    validateOnChange:false,
    onSubmit:async(values)=>{
      setErrMsg("")
    await recover(values)
   //navigate("/auth/verify-email-pwd")
  }
  })
  
  
  useEffect(()=>{
    if(isSuccess){
      
    if(data?.success){
      
      setErrMsg("")
   
     localStorage.setItem("id",data?.id);
      localStorage.setItem("email",data?.email)
      localStorage.setItem("username",data?.username)
   
     
      navigate("/auth/verify-email-pwd")
   
      
   
      
    }else{
      setErrMsg("")
      toast.error("something went wrong")
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
   
       <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2 justify-center items-center">
       

              {errMsg &&
         <div className="w-full my-2 border-[1px] border-primary rounded-md p-2 text-primary font-normal overflow-auto" >
            {errMsg}
         </div>
       }
       
         
         <div className="flex flex-col gap-2">
           <p className="text-center text-gray-400 italic mb-4">pls enter your email to continue with the password reset process 
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
           <button className="hover:scale-95 duration-200 w-full p-2 rounded-lg text-[1.2rem] bg-primary font-bold relative">
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
         
         <p className="italic font-medium text-center text-gray-400">
           A verification Otp will be sent to the provided email
         </p>
          
         
         

       </form>
   
    
    
    )
}


export default Recover;