import react,{useState} from "react"
import axios from "axios"

const Texting =()=>{
  const [msg,setMsg] = useState("hello")
  
  const register=async()=>{
    const user ={
      username:"Micheal",
      email:"chinemeremaloysius@gmail.com",
      password:"12355"
    }
    try{
      const res = await axios.post("http://localhost:3500/users/register",user)
      setMsg(res.data.message)
    }catch(err){
      setMsg(err.data.message)
    }
  }
  
  const resend =async()=>{
    const body = {
      id:"659f940f2e0e686c135ca718"
    }
    try{
      const res = await axios.post("http://localhost:3500/users/resendMail",body)
      setMsg(res.data.message)
    }catch(err){
      setMsg(err.response.data.message)
    }
  }
  
  const verifyEmail =async()=>{
    const body = {
      id:"659f940f2e0e686c135ca718",
      otp:"3567"
    }
    try{
      const res = await axios.post("http://localhost:3500/auth/verify-email",body)
      setMsg(res.data.message)
    }catch(err){
      setMsg(err.response.data.message)
    }
  }
  
  return(
    <div className="w-full flex flex-col gap-2 items-center">
    <div className="w-full p-2 border-2 border-red-300 text-red-300">
     {msg}
    </div>
    
        <button onClick={register} className="p-2 rounded-md bg-red-400 font-bold text-[1.1rem]">register</button>
        <button onClick={resend} className="p-2 rounded-md bg-red-400 font-bold text-[1.1rem]">resendMail</button>
        <button onClick={verifyEmail} className="p-2 rounded-md bg-red-400 font-bold text-[1.1rem]">verifyEmail</button>
    </div>
    
    )
}


export default Texting;