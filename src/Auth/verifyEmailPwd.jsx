import react,{useState} from "react"

//library
import {Link,useNavigate} from "react-router-dom"

const VerifyEmailPwd =()=>{
  const [otp,setOtp] = useState(['','','',''])
  const isOtpCompleted = otp.every(digit => digit !== '')
  const [errMsg,setErrMsg] = useState("invalid otp")
  const navigate = useNavigate()
  
  const handleChange=(index,value)=>{
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
  
  const onSubmit=(e)=>{
    e.preventDefault()
    
    const enteredOtp = otp.join('')
    
    navigate("/reset")
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
            
       
           <p className="text-[1rem] font-normal italic mb-1">A verification Otp has been sent to this email</p>
           
           <p className="text-[1rem] font-medium text-gray-400">
            email@gmail.com
           </p>
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
         <button type="submit" disabled={!isOtpCompleted}  className={`w-full p-2 font-bold ${isOtpCompleted ? "bg-primary " : "bg-gray-400 text-gray-600" } rounded-lg text-[1.2rem]`}>Verify</button>
       </div>
          
          
          <p className="text-center font-medium">
           Didn't get OTP?? 
             <Link className="text-primary underline font-medium"> Resend
           </Link>
           </p>
       </form>
   
    
    )
}


export default VerifyEmailPwd;