import react,{useState,useEffect} from "react"

//library
import { toast } from 'react-toastify';
import { RotatingLines} from 'react-loader-spinner'
import {useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"

//components
import {useDeleteNoteMutation} from "./noteApiSlice"

const DeleteNote =({
  deleteNoteOpen,
  setDeleteNoteOpen,
  
  noteTitle,
 setNoteTitle,
 
 noteId,
 setNoteId,
 
 format,
 setFormat
})=>{

  
  const [errMsg,setErrMsg] = useState("")
  const navigate = useNavigate()
  
  //cancel add new folder
  const onCancel =()=>{
      setDeleteNoteOpen(false)
      setNoteTitle("")
      setNoteId("")
      setErrMsg(" ")
      setFormat("")
    }
    
    //update 
  const [deleteNote,{
    data,
    isLoading,
    isSuccess,
    isError,
    error
  }]=useDeleteNoteMutation()
  
 
 const handleDelete=async()=>{
   await deleteNote({
     id:noteId,
     format,
   })
 }
   
 useEffect(()=>{
  if(isSuccess){
    if(data?.success){
      setErrMsg("")
      toast.success(data?.message,{
        toastId:"editFolder"
      });
     
      setDeleteNoteOpen(false)
      setNoteTitle("")
      setNoteId("")
      setErrMsg(" ")
      setFormat("")
    }else{
      setErrMsg("")
      toast.error("something went wrong",{
        toastId:"FoldereditWrong"
      })
    }
    
    }
  },[isSuccess])
  
  
  
  useEffect(()=>{
    if(isError){
    if(error?.data?.myError){
      setErrMsg(error?.data?.message)
      
    }else if(error?.status === "FETCH_ERROR"){
      setErrMsg("")
      toast.error("No Internet connection")
    }else if(error?.data?.jwtError ){
     navigate("/auth/login",{replace:true})
     localStorage.removeItem("loggedIn")
     }else{
      toast.error("something went wrong")
      setErrMsg("")
    }
    }
    
  },[error || navigate])
  
  
  
 // const handleDelete =()=>{
     // setFolders(prev => prev.filter((folder,index)=> index !== deleteIndex))
      
   //   setDeleteNoteOpen(false)
 //   }
  
  
  return(
        <>
<div className={`${deleteNoteOpen ? "scale-100" : "scale-0"} absolute top-0 left-0 w-full h-full bg-black opacity-[0.7] z-30`}>
</div>
<div className={`${deleteNoteOpen ? "scale-100" : "scale-0" } transition-all duration-200 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] max-sm:w-[20rem] w-[22rem]  bg-dark rounded-lg z-40 shadow-2xl p-4 flex flex-col gap-4`}>
          <p className="text-red-400">   {errMsg} </p>
              <p className="text-[1rem] font-semibold text-red-400 underline-offset-4">
               Are you sure you want to delete this Note
              </p>
              
              <div className="w-[16rem] bg-light shadow-sp rounded-lg m-auto text-white trxt-center p-2 font-bold italic flex justify-center items-center overflow-auto">
                {noteTitle}
              </div>
        
              <div className=" flex gap-2 justify-between items-center"><button onClick={onCancel} disabled={isLoading} className={`p-2 px-3 bg-red-400 text-white hover:bg-red-400 ${ isLoading && "saturate-[0.4] brightness-[0.5]"} rounded-md  font-medium `}>cancel</button>
                

                <button disabled={isLoading} onClick={handleDelete}  className="p-2 px-3 bg-red-400 rounded-md hover:bg-red-400 font-medium text-white relative ">{ !isLoading ? "delete" : "deleting.."}
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
          </div>
          </>
    
    )
}


export default DeleteNote;