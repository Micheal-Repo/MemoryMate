import react,{useState,useRef,useEffect} from "react"
import UseTitle from "../Accessories/useTitle"
import avatar from "/profile.png"

//library 
import {Link,useNavigate} from "react-router-dom"
import {useFormik} from "formik"
import { toast } from 'react-toastify';
import { RotatingLines} from 'react-loader-spinner'

//components
import {validateReset} from "./helper/validate"
import {usePwdResetMutation} from "./api/authApiSlice2"

const Reset  =()=>{
  UseTitle("memory-mate | create new password")
  const [pwdReset,{
    data,
    isLoading,
    isSuccess,
    isError,
    error
  }] = usePwdResetMutation()
  
  const emailRef = useRef()
  const [errMsg,setErrMsg] = useState("")
  const navigate = useNavigate()
  
  //useRef
  const [Id,setId] = useState(localStorage.getItem("id") || "")
  
  useEffect(()=>{
    //emailRef.current.focus()
  },[])
  
  const {values,handleChange, handleSubmit,errors} = useFormik({
    initialValues : {
      password:"",
      cpassword:"",
    },
    validationSchema:validateReset,
    validateOnBlur:false,
    validateOnChange:true,
    onSubmit:async(values)=>{
     await pwdReset({id:Id, password :values.password}) 
   // navigate("/auth/login")
  }
  })
  
   
  useEffect(()=>{
    if(isSuccess){
      
    if(data?.success){
      
      setErrMsg("")
      toast.success(data?.message)
     
      navigate("/auth/login",{replace:true})
      
      localStorage.removeItem("id")
    localStorage.removeItem("email")
    localStorage.removeItem("username")
   
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
   
       <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2 justify-center items-center py-5">
       
       {errMsg &&
         <div className="w-full my-2 border-[1px] border-primary rounded-md p-2 text-primary font-normal overflow-auto" >
            {errMsg}
         </div>
       }
       {/*heading*/}
       <div className="flex flex-col gap-1 justify-center items-center mb-5">
         <p className="text-center max-md:text-[1.8rem] text-[2.5rem] font-bold text-primary ">
          Create New Password 
         </p>
         

       </div>
         
         
        {/*password*/}
       <div className="flex flex-col gap-2">
       
           <input
           className="text-white bg-transparent border-2 border-gray-500 w-full p-3 rounded-lg font-medium outline-0 "
           name="password"
           type="password"
           placeholder="new password"
           value={values.password}
           onChange={handleChange}
           
           />
           {errors.password &&
             <p className="font-light text-[0.9rem] ml-2 italic text-primary font-medium">{errors.password}</p>
           }
         </div>
         
       <div className="mt-2 flex flex-col gap-2">
           <input
           className="text-white bg-transparent border-2 border-gray-500 w-full p-3 rounded-lg font-medium outline-0 "
           name="cpassword"
           type="password"
           placeholder="confirm password"
           value={values.cpassword}
           onChange={handleChange}
           
           />
           {errors.cpassword &&
             <p className="font-light text-[0.9rem] ml-2 italic text-primary font-medium">{errors.cpassword}</p>
           }
         </div>
         
         <div className="w-full my-3">
           <button disabled={!Id} className="hover:scale-95 duration-200 w-full p-2 rounded-lg text-[1.2rem] bg-primary font-bold relative">
              Reset
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
  />
             </span>
             </span>
            }
           </button>
         </div>

       </form>
   
    
    
    )
}


export default Reset;