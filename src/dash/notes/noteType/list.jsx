import react,{useState,useEffect} from "react"
import "./style.css"


//library
import Spinner from 'react-spinner-material';
import {useParams,useNavigate} from "react-router-dom"
import {useSelector} from "react-redux"
import { toast } from 'react-toastify';

//components
import {useUpdateNoteMutation} from "../noteApiSlice"

//icons
import {MdDelete,MdAdd} from "react-icons/md"

const List =({
  note,
})=>{
  
  const navigate = useNavigate()
  
  //alert
  const [notiOpen,setNotiOpen]=useState(false)
  
  //list index that's about to be deleted
  const [listIndex,setListIndex] = useState("")
  //list that's about to be deleted
  const [list,setList] = useState("")
 
 
  //list data
  const [listTitle,setListTitle] = useState(note?.title)
  const [listData,setListData] = useState(note?.list)
    
    
    
    //AddList
    const addList =()=>{
      setListData(prev => [...prev,""])
    }
    
     //predelete
    const predelete=(list,index)=>{
       setNotiOpen(true)
      setListIndex(index)
      setList(list)
    }
    
    //deleteList
    const deleteList = ()=>{
      setListData(prev => prev.filter((list,i) => i !== listIndex))
  
       setNotiOpen(false)
    }
    
    //onChange
    const [changed,setChanged] = useState(false)
    //onTitleChamge
    const onTitleChange =(e)=>{
      setListTitle(e.target.value)
      setChanged(true)
    }
    
    //onListChamge
    const onListChange =(index,value)=>{
      setListData(prev => {
        const newData = [...prev];
        newData[index] = value
        
        return newData
      })
      
      setChanged(true)
    }
 

 const valid =  listTitle && listData?.length && changed
 

 
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
      title:listTitle,
      list : listData,
      format:"list"
    })
 }
 
   
 useEffect(()=>{
  if(isSuccess){
    if(data?.success){
      toast.success(data?.message,{
        toastId:"editCard"
      });
   
   setChanged(false)
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
       <>
    {/*notification*/}
          <div className={`${notiOpen ? "scale-100" : "scale-0" } transition-all duration-200 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] max-sm:w-[20rem] w-[22rem]  bg-dark rounded-lg z-40 shadow-2xl p-4 flex flex-col gap-4`}>
              <p className="text-[1.5rem] font-semibold text-red-400 underline-offset-4 underline ">
                Warning
              </p>
              
              <p className="font-medium text-white italic text-center">Are you sure you want to delete this list <br/> 
                <p className="border-2 border-gray-600 p-2 bg-light w-[15rem] h-[2.5rem] overflow-auto m-auto rounded-lg my-[2px]">{list}</p>
                
              this action can not be undone
              </p>
              
              <div className=" flex gap-2 justify-between items-center">
                <button onClick={()=> setNotiOpen(false)} className="p-1 px-3 bg-red-400 rounded-md hover:bg-red-400 font-medium text-white">cancel</button>
                

                <button onClick={deleteList} className="p-1 px-3 bg-red-400 rounded-md hover:bg-red-400 font-medium text-white">delete</button>
                
              </div>
          </div>

<div style={{height:"calc(100% - 0.4rem)"}} className="">
{/*Add*/}
    <div className="mb-2 flex gap-2">
      <button onClick={addList} className="p-1 px-3 rounded-lg shadow-sp   text-black hover:text-white hover:bg-red-400 font-medium">
          <MdAdd size={30}/>  
      </button>
    </div>
    
    {/*table*/}
    <div style={{height:"calc(100% - 6rem)"}} className="cardSroll scroll w-full  overflow-y-scroll relative ">
    
    {/*head*/}
    <div className="flex gap-1 sticky top-0 z-10 w-full text-white text-[1.2rem] font-bold">
      <div className="bg-light w-[4rem] h-[3.2rem] p-3 rounded-sm">
       S/N
      </div>
      
      <div className="w-full">
       <textarea
       type="text"
       value={listTitle}
       onChange={onTitleChange}
       placeholder="Title"
       className="bg-light w-full h-[3.2rem] p-3 outline-light focus:bg-white outline-0 border-light border-2 rounded-sm focus:text-light"
       
       />
      </div>
    </div>
    
    {/*body*/}
    <div className="flex flex-col  w-full ">
      {
        listData.map((list,index)=>(
          <div className="flex w-full gap-1 text-[1.1rem]">
             <div className="bg-gray-200 font-bold
             
              w-[4.2rem] h-[4rem] p-3 rounded-sm ">
                 {index + 1}
             </div>
             
             <div className=" w-full relative">
               <textarea
                value= {list}
                row={2}
                onChange={(e)=> onListChange(index,e.target.value)}
                className="bg-gray-200 w-full h-[4rem] p-3 focus:bg-white outline-0 border-2 focus:border-light border-gray-200 "               />
                <MdDelete onClick={()=> predelete(list,index)} size={25} className="absolute top-1 right-1 text-gray-500"/>
             </div>
          
          </div>
          ))
      }
    </div>

   
    
    </div>
    
      <div className="w-full flex justify-end ">
      <button disabled={!valid} onClick={UpdateNote} className={`${valid ? "bg-red-400 hover:bg-red-400  text-white" : "gray-300 text-200 shadow-sp"} p-2 mt-2 px-3  rounded-lg `}>
                       {!isLoading ? "Save Changes" :
               <Spinner radius={30} color={"#fff"} stroke={4} visible={true} />
             }
         </button>
        </div>
     </div>
    </>
    
    
    )
}


export default List;