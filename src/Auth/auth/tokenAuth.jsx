import react,{useState,useEffect,useRef} from "react"

//library 
import {setToken,selectToken,selectUserInfo, setUserInfo} from "../../features/Slice"
import {useSelector,useDispatch} from "react-redux"
import {Outlet, useNavigate} from "react-router-dom"
import { jwtDecode } from "jwt-decode";
import { toast } from 'react-toastify';

//components 
import Lazyloading from "../helper/loading"
import {useRefreshMutation} from "../api/authApiSlice2"
import NoInternet from "../../Accessories/no-internet"

const TokenAuth =()=>{
  
  const [refresh,{
    data,
    isLoading,
    isSuccess,
    isError,
    error
  }] = useRefreshMutation()
  
  const token = useSelector(selectToken)
  const dispatch= useDispatch()
  const navigate = useNavigate()
  
  const effectRan = useRef(false)
  const [trueSuccess,setTrueSuccess] = useState(false)
  
  useEffect(()=>{
    
//    localStorage.removeItem("loggedIn")
    if(effectRan.current === true || process.env.NODE_ENV !== 'development'){
        const Refresh =async()=>{
          await refresh()
          setTrueSuccess(true)
        }
   
    if(!token) Refresh()
      
    } 
  
  return () => effectRan.current = true
  },[])
  
  //decode token
  
  
  if(token){
    const decoded = jwtDecode(token);
    const {userInfo} = decoded;
    dispatch(setUserInfo({...userInfo}))
  }
  
  
  
 let content 
 if(isLoading){
   content = <Lazyloading/>
     
    
 }else if (data?.success && token){
   content = <Outlet/>
 }else if(isError){
   if(error?.data?.jwtError ){
     navigate("/auth/login",{replace:true})
     localStorage.removeItem("loggedIn")
    
   }else if(error?.status === "FETCH_ERROR" || error.data.message){
     content = <NoInternet/>
   }
 }else if(token){
   content = <Outlet/>
 }
 
 
  
  return content
    
    
}


export default TokenAuth;
