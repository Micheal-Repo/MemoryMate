import react,{useState,useEffect} from "react"

//library
import Spinner from 'react-spinner-material';
import { toast } from 'react-toastify';
import { RotatingLines} from 'react-loader-spinner'
import {useNavigate} from "react-router-dom"

//components
import {convertToBase64} from "../helper/covertImg"
import {useUpdateColleMutation} from "./colleApiSlice"

const EditCollection =({
  editCollectionOpen,
  setEditCollectionOpen,
  editCollectionDesc,
  editCollectionName,
  setEditCollectionName,
  setEditCollectionDesc,
  collectionId,
  setCollectionId,
 CoverPic,
 setCoverPic
})=>{
  //CoverPic
  const [updateColle,{
    data,
    isLoading,
    isSuccess,
    isError,
    error
  }] = useUpdateColleMutation()
  
 
  const onEditUpload = async(e)=>{
   
    
    const base64 = await convertToBase64(e.target.files[0]);
    
    setCoverPic(base64);
    
  // alert(base64)
  }
  
  const removeCoverPic =()=>{
    setCoverPic("")
  }
  
  

  const [errMsg,setErrMsg] = useState("")
  const navigate = useNavigate()
  
  
  
  //cancel add Edit Collection
  const onCancel =()=>{
      setEditCollectionOpen(false)
      setEditCollectionName("")
      setEditCollectionDesc("")
      setErrMsg(" ")
    }
  
  
  //onChange name
  const handleEditName = (e)=>{
      setEditCollectionName(e.target.value)
      setErrMsg("")
    }
    
  //onChange desc
  const handleEditDesc = (e)=>{
      setEditCollectionDesc(e.target.value)
      setErrMsg("")
    }
    
  //ass Edit Collection
  const updateCollection =async()=>{
    
      if(editCollectionName && editCollectionName !== " "){
        
        const Collection ={
          id : collectionId,
          title:editCollectionName,
          desc:editCollectionDesc,
          coverPic:CoverPic
        }
        
        await updateColle(Collection)
    //setCollections([{""}])    
      // setCollections(prev => prev.map((colle,index)=> index === collectionId ? {...colle,title:editCollectionName,desc:editCollectionDesc} : colle))
      
       setErrMsg("")
       setEditCollectionOpen(false)
       setEditCollectionName("")
       setEditCollectionDesc("")
       setCollectionId("")
      }else{
        setErrMsg("pls type in Collection name")
      }
    }
    
       useEffect(()=>{
  if(isSuccess){
    if(data?.success){
      setErrMsg("")
      toast.success(data?.message,{
        toastId:"editColle"
      });
      setEditCollectionName("")
      setEditCollectionDesc("")
      setCoverPic("")
     
        
      setEditCollectionOpen(false)
    
    }else{
      setErrMsg("")
      toast.error("something went wrong",{
        toastId:"editWrong"
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
     }else{
      toast.error("something went wrong",{
        toastId:"editWrong"
      })
      setErrMsg("")
    }
    }
    
  },[error || navigate])
  
  
  
  
  return(
    <>
    <div className={`${editCollectionOpen ? "scale-100" : "scale-0"} h-full absolute top-0 left-0 w-full bg-black opacity-[0.6] z-30`}>
    </div>
<div className={`${editCollectionOpen ? "scale-100" : "scale-0" } transition-all duration-200 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] max-sm:w-[20rem] w-[22rem]  bg-dark rounded-lg z-40 shadow-2xl p-4 flex flex-col gap-4`}>
          <p className="text-red-400">   {errMsg} </p>
              <p className="text-[1.5rem] font-semibold text-red-400 ">
                 Edit Collection 
              </p>
             {/*                
              <div className="w-full h-[10rem] max-sm:h-[8rem] border-4 border-light shadow-sp rounded-md relative overflow-hidden">
                <img src={CoverPic} className="w-full h-full border-0 outline-0"/>
              </div>
                
              
              
              <div className="flex gap-2">
                <label htmlFor="editpic" className="bg-red-400 px-2 py-1 rounded-md text-white hover:bg-red-400 font-semibold shadow w-fit">
                <input
                type="file"
                id="editpic"
                className="hidden"
                onChange={onEditUpload}
                />
               {CoverPic ? "change" : "Add cover image" }
                </label>
                { CoverPic &&
                <button onClick={removeCoverPic} className="bg-red-400 px-2 py-1 rounded-md text-white hover:bg-red-400 font-semibold shadow w-fit">remove</button>
              </div>
               */}
              <div>
               <input
               placeholder="Enter Collection Name"
               type="text"
               value={editCollectionName}
               onChange={handleEditName}
               className="autoFocus w-full border-[2px] rounded-lg outline-0 border-light p-2 py-3 text-white font-bold px-3 focus:border-red-400 bg-light shadow-sp mb-3"
               />
              </div>
              <div>
               <textarea
               type="text"
               placeholder="Enter description (optional)"
               value={editCollectionDesc}
               onChange={handleEditDesc}
               className="rounded-md autoFocus w-full border-[2px] outline-0 border-light shadow-sp py-2 h-[8rem] text-white font-bold px-3 focus:border-red-400 bg-light mb-3"
               />
              </div>
        
              <div className=" flex gap-2 justify-between items-center mb-2">
                <button disabled={isLoading} onClick={onCancel} className={` ${ isLoading && "saturate-[0.4] brightness-[0.5]"} p-2 px-3 bg-red-400 rounded-md hover:bg-red-400 font-medium text-white`}>cancel</button>
                

                <button disabled={isLoading} onClick={updateCollection}  className="p-2 px-3 bg-red-400 rounded-md hover:bg-red-400 font-medium text-white relative">{isLoading ? "Updating.." : "Update"}
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
            }
            </button>
                
              </div>
          </div>
          </>
    
    )
}


export default EditCollection;