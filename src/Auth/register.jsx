import react,{useState,useRef,useEffect} from "react"

//library 
import {Link,useNavigate} from "react-router-dom"
import {useFormik} from "formik"

//components
import {validateRegister} from "./helper/validate"

const EmailLogin =({setIsVerified})=>{
  
  
  const [errMsg,setErrMsg] = useState("")
 const navigate  = useNavigate()
  
  
  
  const {values,handleChange, handleSubmit,errors} = useFormik({
    initialValues : {
      username:"",
      email:"",
      password:"",
    },
    validationSchema:validateRegister,
    validateOnBlur:false,
    validateOnChange:true,
    onSubmit:()=>{
    navigate("/verify-email")
  }
  })
  
  return(
      
    
      
   
       <form onSubmit={handleSubmit} className=" w-full flex flex-col gap-4 justify-center items-center">
               {errMsg &&
         <div className="w-full my-2 border-[1px] border-error rounded-md p-2 mb-[-0.5rem] text-error font-normal overflow-auto" >
            {errMsg}
         </div>
               }
         <p className="text-[2.5rem] font-bold text-primary mb-[-1rem]">Register</p>
         <p className="text-[1.2rem] font-medium  text-center mb-1">Explore by connecting with us</p>

         
         <div className="input flex flex-col gap-2">
           <p className="text-center text-gray-400 italic mb-2">A mail will be sent to your email after registration 
           </p>
           
           <input
           className="text-black w-full p-2 rounded-lg font-medium outline-primary"
           name="username"
           type="username"
           placeholder="username"
           value={values.username}
           onChange={handleChange}
          
           />
           {errors.username &&
             <p className="text-[0.9rem] ml-2 italic text-primary font-medium">{errors.username}</p>
           }
         </div>
         
         <div className="input flex flex-col gap-2">
           
           <input
           className="text-black w-full p-2 rounded-lg font-medium outline-primary"
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
         
         <div className="input flex flex-col gap-2">
           
           <input
           className="text-black w-full p-2 rounded-lg font-medium outline-primary"
           name="password"
           type="password"
           placeholder="password"
           value={values.password}
           onChange={handleChange}
           
           />
           {errors.password &&
             <p className="text-[0.9rem] ml-2 italic text-primary font-medium">{errors.password}</p>
           }
         </div>
         
         <div className="w-full my-3">
           <button className="hover:scale-95 duration-200 w-full p-2 rounded-lg text-[1.2rem] bg-primary font-bold">
             Register
           </button>
         </div>
         
         
          <p className="text-center font-medium">
           Already have an account? 
             <Link to="/" className="text-primary underline font-medium"> Login
           </Link>
           </p>
         
         

       
       </form>
         
   
    
    
    )
}


export default EmailLogin;