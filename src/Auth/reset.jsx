import react,{useState,useRef,useEffect} from "react"
import avatar from "/profile.png"

//library 
import {Link,useNavigate} from "react-router-dom"
import {useFormik} from "formik"

//components
import {validateReset} from "./helper/validate"

const Reset  =()=>{
  
  const emailRef = useRef()
  const [errMsg,setErrMsg] = useState("")
  const navigate = useNavigate()
  
  
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
    onSubmit:()=>{
    navigate("/")
  }
  })
  
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
           className="text-black w-full p-3 rounded-lg font-medium outline-primary"
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
           className="text-black w-full p-3 rounded-lg font-medium outline-primary"
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
           <button className="hover:scale-95 duration-200 w-full p-2 rounded-lg text-[1.2rem] bg-primary font-bold">
              Reset
           </button>
         </div>

       </form>
   
    
    
    )
}


export default Reset;