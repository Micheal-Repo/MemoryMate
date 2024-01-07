import react,{useState,useRef,useEffect} from "react"

//library 
import {Link} from "react-router-dom"
import {useFormik} from "formik"

//components
import {validateEmailLogin} from "../helper/validate"

const EmailLogin =({setIsVerified})=>{
  
  const emailRef = useRef()
  const [errMsg,setErrMsg] = useState("")
  
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
    onSubmit:()=>{
    setIsVerified(true)
  }
  })
  
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
         welcome back to the Memory App
         </p>
       </div>
       
         
         <div className="flex flex-col gap-2 w-full">
           <p className="text-[0.9rem] text-center text-gray-400 italic mb-2 md:mb-3 md:text-[1.2rem]">pls enter your email to continue
           </p>
           
           <input
           className="text-black w-full p-3 rounded-lg font-medium outline-primary"
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
           <button className="hover:scale-95 duration-200 w-full p-2 rounded-lg text-[1.2rem] bg-primary font-bold">
             Continue
           </button>
         </div>
         
         
          <p className="text-center font-medium">
           Don't have account? 
             <Link to="/register" className="text-primary underline font-medium"> Register
           </Link>
           </p>
         
         
         <div>
           <p></p>
         </div>
       
       </form>
   
    
    
    )
}


export default EmailLogin;