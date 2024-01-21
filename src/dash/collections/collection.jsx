import react,{useState,useEffect} from "react"
//library 
import { toast } from 'react-toastify';
import {useSelector,useDispatch} from "react-redux"

//icons
import {MdAdd} from "react-icons/md"
import {FaListUl} from "react-icons/fa"
import {BsFillGrid3X3GapFill} from "react-icons/bs"


//components
import Grid from "./grid"
import List from "./list"
import {selectToken,setToken,selectUserInfo,setUserInfo,setColleIds} from "../../features/Slice"
import {useGetCollesQuery,useAddColleMutation} from "./colleApiSlice"
import InternetErr from "../../Accessories/internetErr"
import Spinner from "../../Accessories/spinner"
import {useNavigate} from "react-router-dom"

//subcomponents
import NewCollection from "./newCollection"


const Collection =()=>{
  
  const navigate = useNavigate()
  const userInfo = useSelector(selectUserInfo)
  
  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error
  }=useGetCollesQuery("colleList",{
  //  pollingInterval:15000,
 //   refetchOnFocus:true,
  //  refetchOnMountOrArgChange:true
  })
  
  
  
  const token = useSelector(selectToken)
  const dispatch= useDispatch()
  
  
  
  const [newCollectionOpen,setNewCollectionOpen] = useState(false)
  
  
    
  //handleChangeView
  const [isGrid, setIsGrid] = useState(true)
  
  const handleChangeView=(view)=>{
   
    setIsGrid(view)
  }
  
  
  let content;
  const [length,setLength] = useState("0")
  if(isLoading){
    content = <Spinner/>
  }
  
  if(isSuccess){
      const {ids,entities} = data;
    if(ids?.length){
      dispatch(setColleIds(ids))

      content =  <Grid ids={ids} setLength={setLength}/>
    }
  }
  
   
  
  
 
    if(isError){
    if(error?.data?.myError){
      toast.error(error?.data?.message,{
        toastId:"myError"
      })

    }else if(error?.status === "FETCH_ERROR"){
       
       content = <InternetErr/>
       
      
    }else if(error?.data?.notFound){
      content = <p className="text-gray-400 w-full text-center py-6 italic font-bold">No collection</p>
    }else if(error?.data?.jwtError ){
     navigate("/auth/login",{replace:true})
     localStorage.removeItem("loggedIn")
     
   }else{
      
       content = <InternetErr/>
    
     
    }
    }
    
  
      
      //  <List collections={data}/>
     
  
 
  return(
    <div className=" w-full wrapper2 overflow-auto">
    <NewCollection
      newCollectionOpen={newCollectionOpen}
     setNewCollectionOpen={setNewCollectionOpen}
    />
    {/*First Part*/}
    {/*left*/}
      <div className="pt-[2rem] pb-[0.5rem] border-b-[2px] border-light px-2 flex justify-between items-end ">

      
          <div className="">
             <p className="max-md:text-[1rem] text-[1.2rem]">Collections
             <br/>
           
             </p>
          </div>
          
    {/*right*/}
          <div>
            <button className="p-1 px-4 bg-light text-white rounded-xl">
            
              <p onClick={()=> setNewCollectionOpen(true)} className="md:hidden flex justify-center items-center gap-1 py-1"> 
                <MdAdd size={23}/>
                <span>create</span>
              </p>
              
              <p className="max-md:hidden flex justify-center items-center gap-1">
              <MdAdd size={23}/>  
              <span>Add new collection </span>
              </p>
              
            </button>
          </div>
      </div>
      
          {/*2nd Part*/}
          {/*left*/}
      <div className="flex justify-between items-center p-3 md:px-8 py-4">
        <div className="flex justify-center items-center gap-2 sm:gap-4">
         <span className={`p-1 rounded-md border-[2px] ${ !isGrid && "border-primary"}`}> 
           <FaListUl 
           size={23} 
           onClick={()=> handleChangeView(false)}/>
         </span> 
         
         <span className={`p-1 rounded-md border-[2px] ${ isGrid && "border-primary"}`}> 
          <BsFillGrid3X3GapFill 
          size={23}
          onClick={()=> handleChangeView(true)}/>
         </span> 
       </div>
       
          {/*right*/}
       <div>
         <p>Total Collection : {length}</p>
       </div>
       
      </div>
      
          {/*3rd Part*/}
      
      <div className=" scroll collection overflow-y-scroll  rounded ">
         {content}
      </div>
      
    </div>
    
    )
}


export default Collection;