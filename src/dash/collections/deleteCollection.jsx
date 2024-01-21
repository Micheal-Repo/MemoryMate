import react,{useState,useEffect} from "react"

//library 
import { toast } from 'react-toastify';
import { RotatingLines} from 'react-loader-spinner'
import {useNavigate} from "react-router-dom"

//components
import {useDeleteColleMutation} from "./colleApiSlice"

const DeleteCollection =({
  deleteCollectionOpen,
  setdeleteCollectionOpen,
  deleteCollectionName,
  setDeleteCollectionName,
  collectionId,
  setCollectionId
})=>{
  
  const [deleteColle,{
    data,
    isLoading,
    isSuccess,
    isError,
    error
  }] = useDeleteColleMutation()
  
  //ErrMsg
  const [errMsg,setErrMsg] = useState("")
  
  const navigate = useNavigate()
  
  //cancel add delete Collection
  const onCancel =()=>{
      setdeleteCollectionOpen(false)
      setErrMsg(" ")
    }
  

const handleDelete =async()=>{
   await deleteColle({id:collectionId})
}
     
       useEffect(()=>{
  if(isSuccess){
    if(data?.success){
      setErrMsg("")
      toast.success(data?.message,{
        toastId:"delColle"
      });
      setDeleteCollectionName("")
      setCollectionId("")
      
        
      setdeleteCollectionOpen(false)
     
    }else{
      setErrMsg("")
      toast.error("something went wrong",{
        toastId:"delWrong"
      })
    }
    
    }
  },[isSuccess || navigate])
  
  //states
  
  
  
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
   } else{
      toast.error("something went wrong")
      setErrMsg("")
    }
    }
    
  },[error || navigate])
  
  
  
  
  
  
  return(
    <>
      <div className={`${deleteCollectionOpen ? "scale-100" : "scale-0"} h-full absolute top-0 left-0 w-full bg-black opacity-[0.6] z-30`}>
    </div>
<div className={`${deleteCollectionOpen ? "scale-100" : "scale-0" } transition-all duration-200 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] max-sm:w-[20rem] w-[22rem]  bg-dark rounded-lg z-40 shadow-2xl p-4 flex flex-col gap-4`}>
          <p className="text-red-400">   {errMsg} </p>
              <p className="text-[1rem] font-normal italic text-red-400 underline-offset-4">
               you are about to delete everything under this Collection
              </p>
              
              <div className="w-[16rem] bg-light shadow-sp rounded-lg m-auto text-white trxt-center p-2 font-bold italic flex justify-center items-center overflow-auto">
                {deleteCollectionName}
              </div>
        
              <div className=" flex gap-2 justify-between items-center">
                <button disabled={isLoading} onClick={onCancel} className={`p-2 px-3 ${ isLoading && "saturate-[0.4] brightness-[0.5]"} hover:bg-red-400 bg-red-400 rounded-md  font-medium text-white`}>cancel</button>
                

                <button onClick={handleDelete}  className="p-2 px-3 bg-red-400 rounded-md hover:bg-red-400 font-medium text-white relative">{isLoading ? "deleting.." : "delete"}
                 { isLoading &&  <span className="absolute w-full h-full top-0 left-0   flex justify-center items-center">
             <span className="absolute top-0 left-0 h-full w-full bg-black opacity-[0.6]"></span>
             <span className="z-30">
              <RotatingLines
  visible={true}
  height="45"
  width="45"
  color="rgba(20, 15, 51, 1)"
  strokeWidth="5"
  animationDuration="0.75"
  ariaLabel="rotating-lines-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
             </span>
             </span>
            }</button>
                
              </div>
          </div>
          </>
    
    )
}


export default DeleteCollection;