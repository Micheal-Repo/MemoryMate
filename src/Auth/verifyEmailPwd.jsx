import react,{useState,useEffect} from "react"

//library
import {Link,useNavigate} from "react-router-dom"
import { toast } from 'react-toastify';
import { RotatingLines} from 'react-loader-spinner'
import Spinner from 'react-spinner-material';

//components
import {useVerifyEmailPwdMutation,useResendMailPwdMutation} from "./api/authApiSlice2"


const VerifyEmailPwd =()=>{
  const [otp,setOtp] = useState(['','','',''])
  
  const [errMsg,setErrMsg] = useState("")
  
  //data
  const [username,setUsername] = useState(localStorage.getItem("username") || "")
  const [email,setEmail] = useState(localStorage.getItem("email") || "")
  const [Id,setId] = useState(localStorage.getItem("id") || "")
  
  //split email
  const splitEmail = email.split("@")
  
  const navigate = useNavigate()
  
  //useVerifyEmailPwdMutation
  
  const [verifyEmail,{
    data,
   isLoading,
    isSuccess,
    isError,
    error
  }] = useVerifyEmailPwdMutation()
  
  //useResendMailPwdMutation
  const [resendMailPwd,{
    data :resendData,
   isLoading : isResendLoading,
    isSuccess : isResendSuccess,
    isError : isResendError,
    error : resendError
  }] = useResendMailPwdMutation()
  
  
  
  const handleChange=(index,value)=>{
    setErrMsg("")
    const newOtp = [...otp]
    newOtp[index] = value
    
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
  
  const onSubmit= async(e)=>{
    e.preventDefault()
    setErrMsg("")
    const enteredOtp = otp.join('')
    
    await verifyEmail({id:Id,otp:enteredOtp})

  }
  
  
  useEffect(()=>{
    if(isSuccess){
      
    if(data?.success){
      
      setErrMsg("")
      toast.success(data?.message)
     
      navigate("/auth/reset",{replace:true})
   
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
  
  
  const userData = Id && email && username
  
  const isOtpCompleted = otp.every(digit => digit !== '') && userData
  const Disable = otp.every(digit => digit !== '') && !isLoading  && userData
  
  
  //handleBack
  const handleBack =()=>{
    localStorage.removeItem("id")
    localStorage.removeItem("email")
    localStorage.removeItem("username")
    
    navigate("/auth/recover",{replace:true})
  }
  
  
  //resend
const Resend = async()=>{
  setErrMsg("")
 await resendMailPwd({id:Id})
}


  useEffect(()=>{
    if(isResendSuccess){
      
    if(resendData?.success){
      
      setErrMsg("")
      toast.success(resendData?.message)
      
    }else{
      setErrMsg("")
      toast.error("something went wrong")
    }
    
  }
  },[isResendSuccess])
  
  //error
  useEffect(()=>{
    if(isResendError){
      if(resendError?.data?.myError){
      setErrMsg(resendError?.data?.message)
    }else if(resendError?.status === "FETCH_ERROR"){
      toast.error("No internet connection")
      setErrMsg("")
    }else{
      toast.error("something went wrong")
      setErrMsg("")
    }
    
  }
  },[resendError])
  
  
 
  return(
   

       <form onSubmit={onSubmit} onPaste={handlePaste} className=" w-full flex flex-col gap-8 justify-center items-center">
        {errMsg &&
         <div className="w-full my-2 border-[1px] border-error rounded-md p-2 mb-[-1.2rem] text-error font-normal overflow-auto" >
            {errMsg}
         </div>
       }
       <div className="text-center">
           <p className="text-[2.3rem] font-bold text-primary mb-[0.8rem]">Verify Email</p>
          
          {  Id &&
           <p className="text-[1.2rem] font-bold">Hello!  {username}</p>
          }
           <p className="text-[1rem] font-normal italic mb-1 text-gray-200">{userData ? "A verification Otp has been sent to this email" : "Hello! you took the wrong path"}</p>
         {  userData &&
           <p className="text-[1rem] font-medium text-gray-400">
          {splitEmail[0].slice(0,10)}...@gmail.com
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
         <button type="submit" disabled={!Disable}  className={`w-full p-2 font-bold ${isOtpCompleted ? "bg-primary " : "bg-gray-400 text-gray-600" } rounded-lg text-[1.2rem] relative`}>Verify
         
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
          
        { userData &&
  <p className="text-center font-medium flex items-center gap-1">
           Didn't get OTP?
            { !isResendLoading?
            
             <p onClick={Resend} className="text-primary underline font-medium"> 
             
                 Resend
              </p>
              :
             <span className="opacity-[0.8]">
                     <Spinner radius={20} color={"#fff"} stroke={3} visible={true} />
       
             </span>
          
           }
           </p>
        }
       </form>
   
    
    )
}


export default VerifyEmailPwd;