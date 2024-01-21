import react,{useState} from "react"
//library
import Spinner from 'react-spinner-material';
import {useParams,useNavigate,Outlet} from "react-router-dom"
import { toast } from 'react-toastify';
import {useSelector,useDispatch} from "react-redux"

//components
import Note from "./note"
import {useGetCatesQuery} from "../categories/cateApiSlice"
import {useGetNotesQuery} from "./noteApiSlice"


import NewNotes from "./notePop/newNotes"

//hook
import useStyleH from "../Hooks/useStyleH"

//icons
import {MdAdd,MdSearch} from "react-icons/md"


const Notes =()=>{
  const value = useSelector(state => state.mySlice.value)
  
  const navigate = useNavigate()
  
  //ids
  const {cateId} = useParams()
  const {folderId} = useParams()
  
  const {cate} = useGetCatesQuery("cateList",{
    selectFromResult:({data})=>({
      cate:data?.entities[cateId]
    })
  })
  
  const styleH = {
    height:`calc(100% - ${cate?.folder ? "3.8rem" : "6.8rem"} )`
  }
  
  //NewNotes
  const [openFormat,setOpenFormat] = useState(false)
  const [newNoteOpen,setNewNoteOpen] = useState(false)
  
  //notesList
  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetNotesQuery("noteList",{
   // pollingInterval:15000,
    // refetchOnFocus:true,
    // refetchOnMountOrArgChange:true
  })
  
  let noteContent;
  if(isLoading){
    noteContent= <div className="w-full grid place-content-center my-3">

    <div className="p-2 bg-white shadow-sp rounded-full w-fit">
      <Spinner radius={30} color={"#3f0634"} stroke={4} visible={true} />
    </div>
    </div>
  }
  
  let noteLength = 0
 const SetNoteLength=(length)=>{

   noteLength = length
 }
 
  
  if(isSuccess){
    const {ids, entities} = data
    
    if(ids?.length){
      let filteredId;
      
      if(folderId){
        filteredId = ids.filter(id => entities[id]?.folderId === folderId)
      }else{
        filteredId = ids.filter(id => entities[id]?.cateId === cateId)
      }
    
    if(filteredId?.length){
      
      SetNoteLength(filteredId?.length)
      noteContent= filteredId.map(noteId => 
        <Note noteId={noteId}/>
      )
    }else{
      noteContent = <p className="mt-4 text-center w-full px-2 text-gray-500 font-bold italic">Empty</p>
  }
  }
  }
  
  //isError
   if(isError){
    if(error?.data?.myError){
      toast.error(error?.data?.message,{
        toastId:"myError"
      })

    }else if(error?.status === "FETCH_ERROR"){
       
      toast.error("No internet connection",{toastId:"internetCateGet"})
    }else if(error?.data?.notFound){
      noteContent=<p className="w-full text-center text-gray-500 font-bold italic">Empty</p>
    }else if(error?.data?.jwtError ){
     navigate("/auth/login",{replace:true})
     localStorage.removeItem("loggedIn")
     
   }else{
     
     toast.error("something went wrong",{toastId:"folGetWrong"})
    }
    }
  
  
  const handleNewNote=()=>{
    setNewNoteOpen(true)
    setOpenFormat(true)
  }
  
  return(
    <>

    
    <NewNotes
    newNoteOpen={newNoteOpen}
    setNewNoteOpen={setNewNoteOpen}
    openFormat={openFormat}
    setOpenFormat={setOpenFormat}
    />
    
    <div style={styleH} className="  notesList w-full overflow-auto rounded-md shadow-sp">
  
    <div className="flex justify-between items-center md:p-4 max-sm:px-2  rounded mt-1 md:mt-4 py-1">
      <p>Total: {noteLength}</p>
      <div className="flex items-center gap-2 text-light">
      <button className="p-1 md:p-3 rounded-lg shadow-sp bg-gray-200 hover:bg-gray-300 shadow font-medium flex items-center"> 
         <MdSearch size={25}/> 
         </button>
      <button onClick={handleNewNote} className="p-1 md:p-3 rounded-lg bg-gray-200 hover:bg-gray-300 shadow-sp  font-medium flex items-center "> 
         <MdAdd size={25}/>
         </button>
    </div>
    </div>
    
    <div style={useStyleH("3.2rem")} className="scrollx scroll p-3 w-full overflow-y-scroll   flex gap-3 flex-col">
    {/*  <Note  type={"table"}/>
      <Note type={"list"}/>
      <Note type={"card"}/>
      <Note/>*/}
      {noteContent}
    </div>

    </div>
    </>
    )
}


export default Notes;