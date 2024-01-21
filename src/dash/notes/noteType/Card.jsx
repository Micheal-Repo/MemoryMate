import react,{useState,useEffect} from "react"


//library
import Spinner from 'react-spinner-material';
import {useParams,useNavigate} from "react-router-dom"
import {useSelector} from "react-redux"
import { toast } from 'react-toastify';

//compound
import {useUpdateNoteMutation} from "../noteApiSlice"

const Card =({note,setIsPopOpen})=>{
  const navigate = useNavigate()
  
  //card detail 
  const [title,setTitle] = useState(note?.title)
  const [content,setContent] = useState(note?.content)
  
 const [changed,setChange] = useState(false)
 
  const onTitleChange =(e)=>{
    setTitle(e.target.value)
    setChange(true)
    
 }
  
  const onContentChange =(e)=>{
    setContent(e.target.value)
    setChange(true)
  }
  
  const valid = title && content && changed
 
 //editCard
 const [updateNote,{
    data,
    isLoading,
    isSuccess,
    isError,
    error
  }]=useUpdateNoteMutation()
  
 const UpdateNote=async()=>{
    await updateNote({
      id : note?.id,
      title,
      content,
      format:"card"
    })
 }
 
   
 useEffect(()=>{
  if(isSuccess){
    if(data?.success){
      toast.success(data?.message,{
        toastId:"editCard"
      });
      setChange(false)
    }else{
      toast.error("something went wrong",{
        toastId:"cardeditWrong"
      })
    }
    
    }
  },[isSuccess])
  
  
  useEffect(()=>{
    if(isError){
    if(error?.data?.myError){
      toast.error(error?.data?.message)
      
    }else if(error?.status === "FETCH_ERROR"){
      toast.error("No Internet connection")
    }else if(error?.data?.jwtError ){
     navigate("/auth/login",{replace:true})
     localStorage.removeItem("loggedIn")
     }else{
      toast.error("something went wrong")
     
    }
    }
    
  },[error || navigate])
  
  
 
 
 
  return(
     <div style={{height:"calc(100% - 0.5rem)"}}  className="">
    
       <div>
         <textarea
         value={title}
         placeholder="Title"
         onChange={onTitleChange}
         className="w-full bg-dark p-3 rounded-lg text-white font-bold h-[4rem] focus:bg-white focus:text-dark outline-dark text-[1.2rem]"
         />
       </div>
       
       
         <textarea
         style={{height:"calc(100% - 7.8rem)"}} 
         placeholder="content"
         value={content}
         onChange={onContentChange}
         className="text-black shadow-sp cardSroll scroll w-full bg-gray-200 p-3 rounded-lg   h-[4rem] focus:bg-white outline-8 outline-dark"
         />
      
      <div className="w-full flex justify-end">
         <button disabled={!valid}  onClick={UpdateNote} className={`${ valid ? "text-white bg-red-400 " : "shadow-sp text-black"} p-2 px-3  mt-2 shadow-sp rounded-lg font-bold text-right  transition duration-200 `}>
             {!isLoading ? "Save Changes" :
               <Spinner radius={30} color={"#fff"} stroke={4} visible={true} />
             }
              </button>
      </div>
    </div>
    
    )
}


export default Card;