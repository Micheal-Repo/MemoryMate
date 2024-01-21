import react,{useState,useEffect} from "react"
import memory from "/memory.jpg"

//library
import { toast } from 'react-toastify';
import { RotatingLines} from 'react-loader-spinner'
import {useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
import Spinner from 'react-spinner-material';

//components
import {convertToBase64} from "../helper/covertImg"
import {useAddColleMutation} from "./colleApiSlice"
import {selectToken,selectUserInfo} from "../../features/Slice"


const NewCollection =({
  newCollectionOpen,
  setNewCollectionOpen,
  setCollections
})=>{
  
  const [addColle,{
    data,
    isLoading,
    isSuccess,
    isError,
    error
  }]=useAddColleMutation()
  
  const userInfo = useSelector(selectUserInfo)
  const [CoverPic,setCoverPic]=useState("")
  const [newCollectionName,setNewCollectionName] = useState("")
  const [newCollectionDesc,setNewCollectionDesc] = useState("")
  const [errMsg,setErrMsg] = useState("")
  
  const navigate = useNavigate()
  
  //cancel add new Collection
  const onCancel =()=>{
      setNewCollectionOpen(false)
      setNewCollectionName("")
      setNewCollectionDesc("")
      setErrMsg("")
      setCoverPic("")
    }
  
  
  //onChange name
  const handleNewName = (e)=>{
      setNewCollectionName(e.target.value)
      setErrMsg("")
    }
    
  //onChange desc
  const handleNewDesc = (e)=>{
      setNewCollectionDesc(e.target.value)
      setErrMsg("")
    }
    
  //ass new Collection
  const addCollection =async()=>{
    
      if(newCollectionName && newCollectionName !== " "){
      //   const newColle = {title:newCollectionName , desc: newCollectionDesc,pic:CoverPic}
        
      // setCollections(prev => [...prev,newColle])
      await addColle({
        userId: userInfo.id,
        title: newCollectionName,
        desc: newCollectionDesc,
        coverPic:CoverPic
      })
      
       setErrMsg("")
       
      }else{
        setErrMsg("pls type in Collection name")
      }
    }
    
       useEffect(()=>{
  if(isSuccess){
    if(data?.success){
      setErrMsg("")
      toast.success(data?.message,{
        toastId:"addColle"
      });
      setNewCollectionName("")
      setNewCollectionDesc("")
      setCoverPic("")
    
        
      setNewCollectionOpen(false)
   
    }else{
      setErrMsg("")
      toast.error("something went wrong",{
        toastId:"colleWrong"
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
      toast.error("something went wrong")
      setErrMsg("")
    }
    }
    
  },[error || navigate])
  
  
    
 
  //cover pic
const onUpload=async(e)=>{
    const base64 = await convertToBase64(e.target.files[0]);
   
    setCoverPic(base64)
  }
  
  return(
    <>
    <div className={`${newCollectionOpen ? "scale-100" : "scale-0"} h-full absolute top-0 left-0 w-full bg-black opacity-[0.6] z-30`}>
    </div>
<div className={`${newCollectionOpen ? "scale-100" : "scale-0" } transition-all duration-200 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] max-sm:w-[20rem] w-[22rem]  bg-dark rounded-lg z-40 shadow-2xl p-4 flex flex-col gap-4`}>
               {errMsg &&
         <div className="w-full  border-[1px] border-error rounded-md p-2 mb-[-0.5rem] text-error font-normal overflow-auto" >
            {errMsg}
         </div>
               }
          
              <p className="text-[1.5rem] font-semibold text-red-400 ">
                 Create New Collection
              </p>
              {/* CoverPic &&
              <div className="w-full h-[10rem] max-sm:h-[8rem] border-4 border-light shadow-sp rounded-md relative overflow-hidden">
                <img src={CoverPic} className="w-full h-full border-0 outline-0"/>
              </div>
                
              
                <label htmlFor="pic" className="bg-red-300 p-2 rounded-md text-white hover:bg-red-400 font-semibold shadow w-fit">
                <input
                type="file"
                id="pic"
                className="hidden"
                onChange={onUpload}
                />
               {CoverPic ? "change" : "Add cover image" }
                </label>
              */}
              <div>
               <input
               placeholder="Enter Collection Name"
               type="text"
               value={newCollectionName}
               onChange={handleNewName}
               className="autoFocus w-full border-[2px] rounded-lg outline-0 border-light p-2 py-3 text-white font-bold px-3 focus:border-red-300 bg-light shadow-sp mb-3"
               />
              </div>
              <div>
               <textarea
               type="text"
               placeholder="Enter description (optional)"
               value={newCollectionDesc}
               onChange={handleNewDesc}
               className="rounded-md autoFocus w-full border-[2px] outline-0 border-light shadow-sp py-2 h-[8rem] text-white font-bold px-3 focus:border-red-300 bg-light mb-3"
               />
              </div>
        
              <div className=" flex gap-2 justify-between items-center mb-2">
                <button onClick={onCancel} disabled={isLoading} className={`p-2 px-3 ${ isLoading && "saturate-[0.4] brightness-[0.5]"} bg-red-400 text-white hover:bg-red-400 rounded-md  font-medium `}>cancel</button>
                

                <button disabled={isLoading} onClick={addCollection}  className="p-2 px-3 bg-red-400 rounded-md hover:bg-red-400 font-medium text-white relative ">{ !isLoading ? "Create" : "Creating.."}
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


export default NewCollection;