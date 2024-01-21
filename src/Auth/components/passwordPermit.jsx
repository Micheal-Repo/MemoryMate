import react,{useState,useEffect} from "react"

//library 
import { toast } from 'react-toastify';
import { RotatingLines} from 'react-loader-spinner'

//components
import {useSendPwdPermitMutation} from "../api/authApiSlice"

const PasswordPermit =({setPermited})=>{
  const [errMsg,setErrMsg] = useState("")
  const [pwd,setPwd] = useState("")
  
  
  
  const [sendPwdPermit,{
    data,
    isLoading,
    isSuccess,
    isError,
    error
  }] = useSendPwdPermitMutation()
  
  //pwdChange
  const pwdChange =(e)=>{
    setPwd(e.target.value)
    setErrMsg("")
  }
  
  //onSubmit
  const onSubmit=async(e)=>{
    e.preventDefault()
    
    await sendPwdPermit({pwd})
  }
  
  useEffect(()=>{
    if(isSuccess){
      
    if(data?.success){
      toast.success(data?.message)
      localStorage.setItem("permited",true)
      setTimeout(()=>{
        
      setPermited(true)
      },1500)
      
      setErrMsg("")
      setPwd("")
    }else{
      toast.error("error occurred")
      setErrMsg("")
    }
    
  }
  },[isSuccess])
  
  //error
  useEffect(()=>{
    if(isError){
      if(error?.data?.myError){
      setErrMsg(error?.data?.message)
    }else if(error?.status === "FETCH_ERROR"){
      toast.error("Network Error")
    }else{
      toast.error("server error")
      setErrMsg("")
    }
    
  }
  },[error])
  
  
  //modify pwd
  const SplitPwd = pwd.split("")
  const isPwdMax = SplitPwd.length === 8
  
  return(
    <form onSubmit={onSubmit} className="py-2 flex flex-col gap-2">
                   {errMsg &&
         <div className="w-full my-2 border-[1px] border-error rounded-md p-2 text-error font-normal overflow-auto mb-4" >
            {errMsg}
         </div>
               }
        <p className="italic text-gray-400  text-[0.8rem]">pls provide the <span className="text-red-300">password permits</span> to continue with the registration process</p>
    
         <div>
           <input
           maxLength = {8}
           value = {pwd}
           onChange={pwdChange}
           className="w-full bg-transparent border-b-2 border-white focus:border-red-400 outline-0 px-3 my-2 text-[1rem] font-medium mt-8"
           />
         </div>
         
         <div className="w-full">
          <button disabled={!isPwdMax} className={`p-2 rounded-lg font-bold w-full ${isPwdMax ? "bg-primary  text-white" : "bg-gray-500 text-gray-400"} relative overflow-hidden`}> Done
           { isLoading && <span className="absolute w-full h-full top-0 left-0   flex justify-center items-center">
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
         
         <div className="mt-2">
          <p className="italic text-gray-400  text-[0.8rem]">for more info about the 
          
          <span className="text-red-300"> Password Permits</span> 
          
           <a className="underline text-primary" href="tel: 08108437371"> contact admin</a>
           </p>
         </div>
    </form>
    
    )
}


export default PasswordPermit;