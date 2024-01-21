import react,{useState,useEffect} from "react"
import UseTitle from "../Accessories/useTitle"
//library
import {Link,useNavigate} from "react-router-dom"
import { toast } from 'react-toastify';
import Spinner from 'react-spinner-material';
import { RotatingLines} from 'react-loader-spinner'


//components
import {useVerifyEmailMutation,useResendMailMutation} from "./api/authApiSlice"


const VerifyEmail =()=>{
  UseTitle("memory-mate | verify-email")
  
  const [resendMail,{
    data:resendData,
    isLoading : isResendLoading,
    isSuccess : isResendSuccess,
    isError : isResendError,
    error : resendError
  }] = useResendMailMutation()
  
  const [verifyEmail,{
    data : verifyData,
    isLoading:isVerifyLoading,
    isSuccess : isVerifySuccess,
    isError : isVerifyError,
    error : verifyError
  }] = useVerifyEmailMutation()
  
  
  //email and id from localStorage
  const [userId , setUserId]= useState("")
  const [userEmail , setUserEmail]= useState("")
  
  useEffect(()=>{
   setUserId(localStorage.getItem("userId") || "")
   setUserEmail(localStorage.getItem("userEmail") || "")
  },[])
  
  //spit email
const splitEmail = userEmail.split("@")

  
  const [otp,setOtp] = useState(['','','',''])
  const isOtpCompleted = otp.every(digit => digit !== '') && userId
  const [errMsg,setErrMsg] = useState("")
  const navigate = useNavigate()
  
  const handleChange=(index,value)=>{
    const newOtp = [...otp]
    newOtp[index] = value
    setErrMsg("")
    setOtp(newOtp)
    
    if(value !== '' && index < otp.length -1){
      setTimeout(()=>{
        
      document.getElementById(`otp-${index + 1}`).focus()
      },0)
    }else if(value === '' && index > 0){
     
     setTimeout(()=>{
       
      document.getElementById(`otp-${index - 1}`).focus()
     },0)
    }
  }
  
  const handlePaste=(e)=>{
    e.preventDefault()
    
    alert("pasted")
    const getCopiedOtp = e.clipboardData.getData("text/plain");
    const pastedOtp = getCopiedOtp.slice(0,4).split("");
    
    const newOtp = [...otp]
    pastedOtp.forEach((digit,i)=> {
      if(newOtp[i] !== undefined){
        newOtp[i] = digit
      }
    });
    
    setOtp(newOtp)
  }
  
  const onSubmit=async(e)=>{
    e.preventDefault()
    const enteredOtp = otp.join('')
    
    setErrMsg("")
    await verifyEmail({id:userId,otp:enteredOtp})
    
  }
  
  
  //isVerifySuccess
  useEffect(()=>{
    if(isVerifySuccess){
     if(verifyData?.success && verifyData?.verified){
      toast.success(verifyData?.message)
      setTimeout(()=>{
        navigate("/auth/login",{replace:true})
      },2000)
      setErrMsg("")
      localStorage.removeItem("userId")
       localStorage.removeItem("userEmail")
    }else{
      setErrMsg("")
      toast.error("server error")
    }
    
    }
  },[isVerifySuccess || navigate])
  
  //isVerifyError
  useEffect(()=>{
   if(isVerifyError){
     
   
    if(verifyError?.data?.myError){
      setErrMsg(verifyError?.data?.message)
    }else if(verifyError?.status === "FETCH_ERROR"){
      toast.error("Network Error")
    setErrMsg("")
    }else{
      
      toast.error("server error",{
        toastId:"error-out"
      })
     setErrMsg("")
    }
    
    }
  },[verifyError])
  
  
  
  //resend email
const Resend =async()=>{
  setErrMsg("")
  await resendMail({id:userId})

}

useEffect(()=>{
  if(isResendSuccess){
  
   if(resendData?.success){
     toast.success(resendData?.message)
     if(resendData?.verified){
       setTimeout(()=>{
         navigate("/login",{replace:true})
       },1000)
       
       setErrMsg("")
       localStorage.removeItem("userId")
       localStorage.removeItem("userEmail")
     }
  }else{
    setErrMsg("")
    toast.error("something went wrong")
  }
  
}
  
},[isResendSuccess || navigate])



useEffect(()=>{
   if(isResendError){
     
   
    if(resendError?.data?.myError){
      setErrMsg(resendError?.data?.message)
    }else if(resendError?.status === "FETCH_ERROR"){
      toast.error("No internet connection")
       setErrMsg("")
    }else if(!resendError?.data?.message){
       toast.error("unexpected error occurred",{
         toastId:"unexpected"
       })
       setErrMsg("")
      }else{
      
      toast.error("something went wrong",{
        toastId:"error-out"
      })
       setErrMsg("")
    }
    
    }
  },[resendError])
  
  
  //handleBack
  const handleBack=()=>{
    localStorage.removeItem("userId")
    localStorage.removeItem("userEmail")
    navigate(-1,{replace:true})
  }
  
  return(
   

       <form onSubmit={onSubmit} onPaste={handlePaste} className=" w-full flex flex-col gap-8 justify-center items-center">
        {errMsg &&
         <div className="w-full my-2 border-[1px] border-error rounded-md p-2 mb-[-1.2rem] text-error font-normal overflow-auto" >
            {errMsg}
         </div>
       }
       
       <div className="text-center">
           <p className="text-[2.3rem] font-bold text-primary mb-[0.8rem]">Verify Email</p>
            
       
         
           <p className="text-[1rem] font-normal italic mb-1">{userId ? "A verification Otp has been sent to this email" : "Hello! you followed the wrong path" }</p>
           
           { userId && userEmail && <p className="text-[1rem] font-medium text-gray-400">
            {`${splitEmail[0].slice(0,10)}...@gmail.com`}
           </p>
           }
      

           
      
       </div>
       
       <p className=" mb-[-1.5rem] text-center text-[1.2rem] font-medium text-gray-200">Enter OTP</p>
       <div className="flex gap-3">
       
       {
         otp.map((digit,index)=>(
         <input
           key={index}
           id={`otp-${index}`}
           value={digit}
           type="text"
           maxLength= "1"
           className="w-[2.2rem] rounded-sm text-center text-black outline-[1px] outline-red-400 font-bold h-[2.5rem] text-[1.5rem]"
           onChange={(e)=> handleChange(index,e.target.value)}
         />
         ))
       }
       </div>
       <div className="w-full">
         <button type="submit" disabled={!isOtpCompleted}  className={`w-full p-2 font-bold ${isOtpCompleted  ? "bg-primary " : "bg-gray-400 text-gray-600" } rounded-lg text-[1.2rem] relative overflow-hidden`}>
         
          {isVerifyLoading ? "verifying..." : "verify" } 
             {/*loading*/}
           { isVerifyLoading &&  <span className="absolute w-full h-full top-0 left-0   flex justify-center items-center">
             <span className="absolute top-0 left-0 h-full w-full bg-slate-800 opacity-[0.7]"></span>
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
          
          <p className="text-center font-medium flex items-center gap-1">
           Didn't get OTP?
            { !isResendLoading ?
            
             <p onClick={Resend} className="text-primary underline font-medium"> 
             
                 Resend
              </p>
              :
             <span className="opacity-[0.8]">
                     <Spinner radius={20} color={"#fff"} stroke={3} visible={true} />
       
             </span>
          
           }
           </p>
       </form>
   
    
    )
}


export default VerifyEmail;