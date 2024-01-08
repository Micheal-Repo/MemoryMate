import react,{useState,useRef,useEffect} from "react"
import avatar from "/profile.png"

//library 
import {Link,useNavigate} from "react-router-dom"
import {useFormik} from "formik"

//components
import {validatePwdLogin} from "../helper/validate"

const PwdLogin  =()=>{
  
  const emailRef = useRef()
  const [errMsg,setErrMsg] = useState("")
  const navigate = useNavigate()
  
  
  useEffect(()=>{
    emailRef.current.focus()
  },[])
  
  const {values,handleChange, handleSubmit,errors} = useFormik({
    initialValues : {
      password:""
    },
    validationSchema:validatePwdLogin,
    validateOnBlur:false,
    validateOnChange:false,
    onSubmit:()=>{
    navigate("/dash")
  }
  })
  
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
         
         <div className="flex gap-2 items-center justify-center md:flex-col md:text-center ">
           <div className="w-[3.5rem] h-[3.5rem] md:w-[4.5rem] md:h-[4.5rem] bg-white border-[1px] border-white  rounded-full">
             <img src={avatar} className="w-full h-full rounded-full"/>
           </div>
          <div className=" max-md:w-[8rem] overflow-auto">
            <p className="text-[1.3rem] font-bold md:text-[1.5rem] ">Micheal</p>
            <p className="text-gray-300 text-[0.9rem] md:text-[1.1rem] font-medium">email@gmail.com</p>
         </div>
         </div>
       </div>
         
         
        {/*password*/}
       <div className="w-full flex flex-col gap-2">
        
           <p className="text-center text-gray-400 italic  text-[0.95rem]">pls enter your password
           </p>
         
          
           <input
           className="text-black w-full p-3 rounded-lg font-medium outline-primary"
           name="password"
           type="password"
           placeholder="password"
           value={values.password}
           onChange={handleChange}
           ref={emailRef}
           />
           {errors.password &&
             <p className="font-light text-[0.9rem] ml-2 italic text-primary font-medium">{errors.password}</p>
           }
         </div>
         
         <div className="w-full my-3">
           <button className="hover:scale-95 duration-200 w-full p-2 rounded-lg text-[1.2rem] bg-primary font-bold">
             Login
           </button>
         </div>
         
         
          <p className="text-center font-medium mt-3">
           Forgotten password? 
             <Link to="/recover" className="text-primary underline font-medium"> Recover
           </Link>
           </p>
         
         

       
       </form>
   
    
    
    )
}


export default PwdLogin;