import react,{useState} from "react"

//library
import OutsideClickHandler from 'react-outside-click-handler';
import {useParams,useNavigate,Outlet} from "react-router-dom"
import { toast } from 'react-toastify';
import {useSelector,useDispatch} from "react-redux"


//component
import useStyleH from "../Hooks/useStyleH"
import Note from "../notes/note"
import FolderNotes from "./folderNotes"
import {useGetFoldersQuery} from "./folderApiSlice"

//crud operations
import NewFolder from "./newFolder"
import EditFolder from "./editFolder"
import DeleteFolder from "./deleteFolder"

 

//icon
import {MdAdd,MdSearch,MdDelete,MdInfo} from "react-icons/md"
import {FaSearch} from "react-icons/fa"
import {HiDotsVertical} from "react-icons/hi"
import {AiFillEdit} from "react-icons/ai"


const Folders =()=>{
  
  const {colleId} = useParams()
  const {cateId} = useParams()
  
  //active folder
  const param = useParams()
  
  
  
  //let folderActive
  const FolderId = param?.folderId
  
  const {activeFolder} = useGetFoldersQuery("folderList",{
      selectFromResult:({data})=>({
        activeFolder: data?.entities[FolderId]
      })
    })
    
  
  
  const navigate = useNavigate()
  
  //folder
  const [folderIndex,setFolderIndex]= useState("")
  const [folderId,setFolderId]= useState("")
  
    
  
  //newFolderOpen
  const [newFolderOpen,setNewFolderOpen]=useState(false)
 
 
    //edit folder
    const [folderName,setFolderName]=useState("")
   const [editFolderOpen,setEditFolderOpen] = useState(false)
   const [editFolderId,setEditFolderId] = useState("")
  
    const preEdit= (folder)=>{
      setFolderName(folder.title)
      setEditFolderId(folder.id)
      setEditFolderOpen(true)
    }
    
   
    

    
    //delete folder
    const [deleteFolderOpen,setdeleteFolderOpen] = useState(false)
  const [deleteFolderName,setdeleteFolderName] = useState("hello")
  const [deleteFolderId,setdeleteFolderId] = useState("")
  
    const predelete = (folder)=>{
      setdeleteFolderName(folder.title)
      setdeleteFolderId(folder.id)
      setdeleteFolderOpen(true)
    }
    
    
    
    
     const {
    data,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetFoldersQuery("folderList",{
    // pollingInterval:15000,
    // refetchOnFocus:true,
    // refetchOnMountOrArgChange:true
  })
  
  let contentFolder;
  
  let folderNo = 0
 const SetFolderNo=(length)=>{

   folderNo = length
 }
 
 if(isLoading){
   contentFolder = <p className="px-2 font-medium italic text-gray-500">loading..</p>
 }

  if(isSuccess){
    const {ids,entities} = data;
      
    if(ids?.length){
     
      
  const filteredIds = ids.filter(folderId => entities[folderId].cateId === cateId)
   
  if(filteredIds?.length){   
      SetFolderNo(filteredIds?.length)
      
  contentFolder  = filteredIds.map(id => 
    <EachFolder
    id={id}
  folderId={folderId}
  setFolderId={setFolderId}
  folderIndex={folderIndex}
  setFolderIndex={setFolderIndex}
  preEdit={preEdit}
  predelete={predelete}
  setFolderName={setFolderName}
    />
    )     
  }else{
    contentFolder = <p className="w-full px-2 text-gray-500 font-bold italic">No Folder</p>
  }
       
   
    }
  }
  
    if(isError){
    if(error?.data?.myError){
      toast.error(error?.data?.message,{
        toastId:"myError"
      })

    }else if(error?.status === "FETCH_ERROR"){
       
      toast.error("No internet connection",{toastId:"internetCateGet"})
    }else if(error?.data?.notFound){
      contentFolder = <p className="w-full  text-gray-500 font-bold italic pl-3">Empty</p>
    }else if(error?.data?.jwtError ){
    navigate("/auth/login",{replace:true})
    localStorage.removeItem("loggedIn")
     
  }else{
     
    toast.error("something went wrong",{toastId:"folGetWrong"})
    }
    }
  
  
  
  
  return(
    <>
        {/*newFolder*/}
          <NewFolder 
          newFolderOpen={newFolderOpen}
          setNewFolderOpen={setNewFolderOpen}
          
          />
        {/*editFolder*/}
        
        <EditFolder 
        editFolderOpen={editFolderOpen}
        setEditFolderOpen={setEditFolderOpen}
        folderName={folderName}
        setFolderName={setFolderName}
        setEditFolderId={setEditFolderId}
        editFolderId={editFolderId}
        />
        
        {/*deleteFolder*/} 
        <DeleteFolder
        deleteFolderOpen={deleteFolderOpen}
        setdeleteFolderOpen={setdeleteFolderOpen}
        deleteFolderName={deleteFolderName}
        setdeleteFolderName={setdeleteFolderName}
        deleteFolderId={deleteFolderId}
        setdeleteFolderId={setdeleteFolderId}
        />
        
          {/*folder*/}
    <div style={useStyleH("8.9rem")} className=" w-full mt-[-0.5rem]">
     <div className="w-full   items-center relative shadow-sp rounded-md p-1 my-2">
     
     <div className="flex justify-between items-end">
     <div className=" ml-2 w-[13rem] overflow-auto relative ">
     <input
     type="text"
       disabled
        value={activeFolder?.title}
        className="italic font-medium"
        />
     </div>
     
      <div className="flex gap-2 bg-white
       items-center rounded-bl-lg rounded-tl-lg text-light">
        <MdSearch size={18}  className="bg-gray-200 shadow-sp w-[2rem] h-[2rem]  rounded-md p-1"/>
        <MdAdd onClick={()=> setNewFolderOpen(true)} size={18} className="w-[2rem] h-[2rem]  rounded-md p-1 bg-gray-200 shadow-sp font-bold"/>
      </div>
      
     </div> 
     
     
     <div className="flex items-center  w-full"> 
     
     <p className="font-medium bg-light text-white h-full py-2 px-2 rounded-l-md mt-[-5px]">{folderNo}</p>
     
      <div  className="scrollx scroll   text-light flex  overflow-x-scroll py-3 max-sm:py-1 w-full">
           {contentFolder}
      </div>
      
    </div>
    
     </div>
      <Outlet/>
    </div>
    </>
    )
}


export default Folders;


const EachFolder =({
  id,
  index,
  setFolderId,
  folderIndex,
  setFolderIndex,
  preEdit,
  predelete,
  setFolderName
})=>{
  const navigate = useNavigate()
  const {folderId} = useParams()
  
  const {folder} = useGetFoldersQuery("folderList",{
      selectFromResult:({data})=>({
        folder: data?.entities[id]
      })
    })
  
  const handleActiveFolder = ()=>{
    setFolderId(id)
    setFolderName(folder.title)
    navigate(`notes/${id}`)
  }
  
  return(
     <div id={id} className={`relative py-2 px-2 max-sm:py-1 text-light bg-gray-100 pr-5 shadow-sp `}>
                 <p onClick={handleActiveFolder} className={`${folderId === id && "text-red-500 underline"}  transition-all duration-200 w-[9rem] max-sm:w-[8rem] font-semibold text-md text-[1rem] md:text-[1.2rem] overflow-auto`}>{folder.title.split("").length < 12 ? folder.title : `${folder.title.slice(0,12)}...`}</p>
               
    
                 
                 <div onClick={()=> setFolderIndex(id)} className="absolute top-0 right-0  flex flex-col justify-center items-center h-full">
                  <HiDotsVertical size={23}/>
                </div>
                
                {/*options*/}
           <OutsideClickHandler onOutsideClick={() => setFolderIndex("00")}>
                <div className={`${folderIndex === id ? "w-[7.5rem] h-[1.6rem]" : "w-0 h-0"}
                 text-white bg-gray-500
                 transition-all duration-200 overflow-hidden absolute top-2 right-2 flex shadow-sp rounded-md text-light backdrop-blur-3xl  shadow font-bold border-[1px] border-gray-300`}>
                  <span onClick={()=> preEdit(folder)} className="rounded-l-md w-[2.5rem] h-[1.5rem] flex justify-center items-center border-r-[1px] border-gray-200 hover:bg-red-300  shadow-md">
                    <AiFillEdit size={18}/>
                  </span>
                 
                  <span onClick={()=> predelete(folder)} className=" w-[2.5rem] h-[1.5rem] flex justify-center items-center hover:bg-red-400">
                    <MdDelete size={18}/>
                  </span>
                 
                  <span className=" border-l-[1px] border-gray-200 rounded-r-md w-[2.5rem] h-[1.5rem] flex justify-center items-center hover:bg-red-400">
                    <MdInfo size={18}/>
                  </span>
                 
                </div>
                
       </OutsideClickHandler>
              </div>
    )
}