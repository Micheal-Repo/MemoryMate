import react,{useState,useRef,useEffect} from "react"

//library 
import {Link,useNavigate} from "react-router-dom"
import {useFormik} from "formik"

//components
import {validateEmailLogin} from "./helper/validate"

const Recover =()=>{
  
  const [errMsg,setErrMsg] = useState("")
  const navigate = useNavigate()
  
  const {values,handleChange, handleSubmit,errors} = useFormik({
    initialValues : {
      email:""
    },
    validationSchema:validateEmailLogin,
    validateOnBlur:false,
    validateOnChange:false,
    onSubmit:()=>{
    navigate("/verify-email-pwd")
  }
  })
  
  return(
   
       <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2 justify-center items-center">
       
         <p className="text-[2.5rem] font-bold text-primary mb-8">Recovery</p>
              {errMsg &&
         <div className="w-full my-2 border-[1px] border-primary rounded-md p-2 text-primary font-normal overflow-auto" >
            {errMsg}
         </div>
       }
       
         
         <div className="flex flex-col gap-2">
           <p className="text-center text-gray-400 italic mb-4">pls enter your email to continue with the Recovery process 
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
         
         <p className="italic font-medium text-center text-gray-400">
           A verification Otp will be sent to the provide email
         </p>
          
         
         

       </form>
   
    
    
    )
}


export default Recover;