import react,{useState,useEffect} from "react"

//library
import { toast } from 'react-toastify';
import { RotatingLines} from 'react-loader-spinner'
import {useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
import Spinner from 'react-spinner-material';


//components
import {useUpdateCateMutation} from "./cateApiSlice"


const EditCategory =({
  editCategoryOpen,
  setEditCategoryOpen,
  editCategoryName,
  setEditCategoryName,
  editCategoryId,
  setEditCategoryId
})=>{
  
  
 
  const [errMsg,setErrMsg] = useState("")
  const navigate = useNavigate()
  
  //cancel add new Category
  const onCancel =()=>{
      setEditCategoryOpen(false)
      setErrMsg(" ")
    }
  
  //onChange
  const onEditChange = (e)=>{
    setEditCategoryName(e.target.value)
  }
  
  
  //update 
  const [updateCate,{
    data,
    isLoading,
    isSuccess,
    isError,
    error
  }]=useUpdateCateMutation()
  
 // const isLoading=true
   
 useEffect(()=>{
  if(isSuccess){
    if(data?.success){
      setErrMsg("")
      toast.success(data?.message,{
        toastId:"editCate"
      });
      setEditCategoryName("")
      setEditCategoryOpen(false)
      setEditCategoryId("")
    }else{
      setErrMsg("")
      toast.error("something went wrong",{
        toastId:"CateeditWrong"
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
  
  
 
  
  //add new Category
  const handleEditCategory =async()=>{
    
      if(editCategoryName && editCategoryName !== " "){
        
    //setCategorys([{""}])    
      // setCategories(prev => prev.map((cate,index)=> index === editCategoryId ? editCategoryName : cate )
       setErrMsg("")
       await updateCate({
         id: editCategoryId,
         title:editCategoryName
       })
      }else{
        setErrMsg("pls type in Category name")
      }
    }
  
  
  
  
  
  return(
    <>
    <div className={`${editCategoryOpen ? "scale-100" : "scale-0"} absolute top-0 left-0 w-full h-full bg-black opacity-[0.7] z-30`}>
</div>
<div className={`${editCategoryOpen ? "scale-100" : "scale-0" } transition-all duration-200 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] max-sm:w-[20rem] w-[22rem]  bg-dark rounded-lg z-40 shadow-2xl p-4 flex flex-col gap-4`}>
          <p className="text-red-400">   {errMsg} </p>
              <p className="text-[1.5rem] font-semibold text-red-400 underline-offset-4">
                 Rename category 
              </p>
              
              <div>
               <input
               type="text"
               value={editCategoryName}
               onChange={onEditChange}
               className="autoFocus w-full border-b-2 outline-0 border-white py-1 text-white font-bold px-3 focus:border-b-red-400 bg-transparent mb-3"
               />
              </div>
        
              <div className=" flex gap-2 justify-between items-center"> 
              <button onClick={onCancel} disabled={isLoading} className={`p-2 px-3 bg-red-400 text-white hover:bg-red-400 ${ isLoading && "saturate-[0.4] brightness-[0.5]"} rounded-md  font-medium `}>cancel</button>
                

                <button disabled={isLoading} onClick={handleEditCategory}  className="p-2 px-3 bg-red-400 rounded-md hover:bg-red-400 font-medium text-white relative ">{ !isLoading ? "update" : "updating.."}
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


export default EditCategory;