import react,{useState,useRef,useEffect} from "react"
import UseTitle from "../Accessories/useTitle"
import avatar from "/profile.png"

//library 
import {Link,useNavigate} from "react-router-dom"
import {useFormik} from "formik"
import { toast } from 'react-toastify';
import { RotatingLines} from 'react-loader-spinner'

//components
import {validateRegister} from "./helper/validate"
import {useRegisterMutation} from "./api/authApiSlice"
import PasswordPermit from "./components/passwordPermit"
import {convertToBase64} from "../dash/helper/covertImg"

const EmailLogin =({setIsVerified})=>{
  UseTitle("memory-mate | register")
  
  
  const [permited,setPermited] = useState(localStorage.getItem("permited") || false)
  
  useEffect(()=>{
  //  localStorage.removeItem("permited")
  },[])
  
  const [register,{
    data,
    isLoading,
    isSuccess,
    isError,
    error
  }] = useRegisterMutation()
  
 const navigate  = useNavigate()
 
  useEffect(()=>{
  if(isSuccess){
    if(data?.success){
      setErrMsg("")
      toast.success(data?.message);
      localStorage.setItem("userId",data?.id);
      localStorage.setItem("userEmail",data?.email);
      localStorage.removeItem("permited")
      setTimeout(()=>{
        navigate("/auth/verify-email")
      },1000)
    }else{
      setErrMsg("")
      toast.error("something went wrong")
    }
    
    }
  },[isSuccess || navigate])
  
  //states
  const [errMsg,setErrMsg] = useState("")
  
  useEffect(()=>{
    if(isError){
    if(error?.data?.myError){
      setErrMsg(error?.data?.message)

    }else if(error?.status === "FETCH_ERROR"){
      setErrMsg("")
      toast.error("No Internet connection")
    }else{
      toast.error("something went wrong")
      setErrMsg("")
    }
    }
    
  },[error])
  
  const [profile,setProfile] = useState("")
  
  //formik
  const {values,handleChange, handleSubmit,errors} = useFormik({
    initialValues : {
      username:"",
      email:"",
      password:"",
    },
    validationSchema:validateRegister,
    validateOnBlur:false,
    validateOnChange:true,
    onSubmit:async(values)=>{
     const res = await register({
       username:values.username,
       email:values.email,
       password:values.password
       })
    
  //   if(profile){
  //   setErrMsg("")
  //   const Values = await Object.assign(values,{ profile})
      
  //   }else{
  // // setErrMsg("Pls upload a profile picture")
      
  // // }
   }
  })
  
  const {username,password,email} = values
  
  useEffect(()=>{
    setErrMsg("")
  },[username, password, email])
  
 
  const onProfileChange =async(e)=>{
    setErrMsg("")
    const base64 = await convertToBase64(e.target.files[0])
    
    setProfile(base64)
  }
  
  let content;
  
   if(!permited){
     
     content = <PasswordPermit setPermited={setPermited}/>
     
     } else {
       
      content = (
     <form onSubmit={handleSubmit} className="  w-full flex flex-col gap-4 justify-center items-center">
               {errMsg &&
         <div className=" w-full my-2 border-[1px] border-error rounded-md p-2 mb-[-0.5rem] text-error font-normal overflow-auto " >
            {errMsg}
         </div>
               }
         <p className="text-[2.5rem] font-bold text-primary mb-[-1rem] ">Register</p>
         <p className="text-[1.2rem] font-medium  text-center mb-1">Explore by connecting with us</p>

       {/*  <div>
         <label htmlFor="profile">
             <div  className="w-[10rem] h-[10rem] md:w-[10rem] md:h-[10rem] bg-white border-[1px] border-white  rounded-full">
             <img src={profile || avatar} className="w-full h-full rounded-full"/>
           </div>
         </label>
           <input
            type="file"
            id="profile"
            className="hidden"
            onChange={onProfileChange}
           />
         </div>
        */} 
         <div className="input flex flex-col gap-2">
           
           <input
           className="text-white bg-transparent border-2 border-gray-500 w-full p-3 rounded-lg font-medium outline-0 "
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
         
         <div className="input flex flex-col gap-2">
           
           <input
           className="text-white bg-transparent border-2 border-gray-500 w-full p-3 rounded-lg font-medium outline-0 "
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
           <button className="hover:scale-95 duration-200 w-full p-2 rounded-lg text-[1.2rem] bg-primary font-bold relative overflow-hidden">
             {isLoading ? "Registering...." : "Register" } 
             {/*loading*/}
           { isLoading &&  <span className="absolute w-full h-full top-0 left-0   flex justify-center items-center">
             <span className="absolute top-0 left-0 h-full w-full bg-black opacity-[0.7]"></span>
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
         
         {/*Already have accounts*/}
          <p className="text-center font-medium">
           Already have an account? 
             <Link to="/auth/login" className="text-primary underline font-medium"> Login

           </Link>
           </p>
         
         

       
       </form>
         
   
    
    
    )
}

return content
}


export default EmailLogin;