import react,{useState,useEffect} from "react"

//library 
import {useParams,useNavigate} from "react-router-dom"
import {useSelector} from "react-redux"
import { toast } from 'react-toastify';
import { RotatingLines} from 'react-loader-spinner'

//components 
import {selectUserInfo} from "../../features/Slice"
import {useAddCateMutation} from "./cateApiSlice"

const NewCategory =({
  newCategoryOpen,
  setNewCategoryOpen,
})=>{
  
  const {colleId} = useParams()
  const userInfo = useSelector(selectUserInfo)
  const navigate = useNavigate()
  
  //Category details 
  const [errMsg,setErrMsg] = useState("")
  const [newCategoryName,setNewCategoryName] = useState("")
  const [isFolder,setIsFolder] = useState(false)
  
  
  //cancel add new Category
  const onCancel =()=>{
      setNewCategoryOpen(false)
      setNewCategoryName("")
      setErrMsg(" ")
    }
  
  //onChange
  const handleNew= (e)=>{
      setNewCategoryName(e.target.value)
      setErrMsg("")
    }

const changeIsFolder =(e)=>{
  setIsFolder(prev => !prev)
}

//useAddCateMutation
const [addCate,{
    data,
    isLoading,
    isSuccess,
    isError,
    error
  }]=useAddCateMutation()
  
  //add new Category
  const addCategory =async()=>{
      if(newCategoryName && newCategoryName !== " "){
      // setCategories(prev => [...prev,newCategoryName])
      
       setErrMsg("")
       await addCate({
         userId:userInfo.id,
         colleId,
         title:newCategoryName,
         folder:isFolder
       })
       
       
      }else{
        setErrMsg("pls type in Category name")
      }
    }
    
     useEffect(()=>{
  if(isSuccess){
    if(data?.success){
      setErrMsg("")
      toast.success(data?.message,{
        toastId:"addCate"
      
      });
      setNewCategoryName("")
      setNewCategoryOpen(false)
      
    }else{
      setErrMsg("")
      toast.error("something went wrong",{
        toastId:"CateWrong"
      })
    }
    
    }
  },[isSuccess || navigate])
  
  
  
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
  
  
  
  
  return (
    <>
<div className={`${newCategoryOpen ? "scale-100" : "scale-0"} absolute top-0 left-0 w-full h-full bg-black opacity-[0.7] z-30`}>
</div>
<div className={`${newCategoryOpen ? "scale-100" : "scale-0" } transition-all duration-200 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] max-sm:w-[20rem] w-[22rem]  bg-dark rounded-lg z-40 shadow-2xl p-4 flex flex-col gap-4`}>


          <p className="text-red-400">   {errMsg} </p>
              <p className="text-[1.5rem] font-semibold text-red-400 underline-offset-4">
                 Enter category Name
              </p>
              
              <div>
               <input
               type="text"
               value={newCategoryName}
               onChange={handleNew}
               className="autoFocus w-full border-b-2 outline-0 border-white py-1 text-white font-bold px-3 focus:border-b-red-400 bg-transparent mb-3"
               />
               
               <div className="text-white flex gap-2 my-2 items-center">
                  <input 
                   type="checkbox"
                   id="check"
                   className="w-5 h-5"
                   checked={isFolder}
                   onChange={changeIsFolder}
                  />
                  <label htmlFor="check" className="text-[1rem]">
                    Arrange notes in folders
                  </label>
              </div>
              
              </div>
              

              
              <div className=" flex gap-2 justify-between items-center mb-2">
                <button onClick={onCancel} disabled={isLoading} className={`p-2 px-3 bg-red-400 text-white hover:bg-red-400 ${ isLoading && "saturate-[0.4] brightness-[0.5]"} rounded-md  font-medium `}>cancel</button>
                

                <button disabled={isLoading} onClick={addCategory}  className="p-2 px-3 bg-red-400 rounded-md hover:bg-red-400 font-medium text-white relative ">{ !isLoading ? "Create" : "Creating.."}
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


export default NewCategory;