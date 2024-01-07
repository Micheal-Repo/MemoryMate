import react,{useState} from "react"

//library
import OutsideClickHandler from 'react-outside-click-handler';
import {useParams} from "react-router-dom"


//component
import useStyleH from "../Hooks/useStyleH"
import Note from "../notes/note"
import FolderNotes from "./folderNotes"

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
  //dolder
  const [folderIndex,setFolderIndex]= useState("")
  const [folderId,setFolderId]= useState("")
  
  
  //newFolderOpen
  const [newFolderOpen,setNewFolderOpen]=useState(false)
  
  //editFolder
  const [editFolderOpen,setEditFolderOpen] = useState(false)
  const [editFolderName,setEditFolderName] = useState("hello")
  const [editIndex,setEditIndex] = useState("")
  
  //deleteFolder
  const [deleteFolderOpen,setdeleteFolderOpen] = useState(false)
  const [deleteFolderName,setdeleteFolderName] = useState("hello")
  const [deleteIndex,setdeleteIndex] = useState("")
  
  
  
  
  const [folders,setFolders] = useState([

     "Chris",
     "chicken",
     "MO og",
     
    ])
    
    
    //edit folder
    const preEdit= (folder,index)=>{
      setEditFolderName(folder)
      setEditIndex(index)
      setEditFolderOpen(true)
    }
    
    const onEditChange =(e)=>{
      setEditFolderName(e.target.value)
    }
    
    const handleEdit=()=>{
      setFolders(prev => {
        const newFolders = [...prev];
        newFolders[editIndex] = editFolderName;
        return newFolders
      })
      
      setEditFolderOpen(false)
      setEditFolderName("")
      setEditIndex("")
    }
    
    //delete folder
    const predelete = (folder,index)=>{
      setdeleteFolderName(folder)
      setdeleteIndex(index)
      setdeleteFolderOpen(true)
    }
    
    const handleDelete =()=>{
      setFolders(prev => prev.filter((folder,index)=> index !== deleteIndex))
      
      setdeleteFolderOpen(false)
    }
    
    const contentFolder  = folders.map((folder,index)=> (
               <div id={index} className={`${folderId === index ? "shadow bg-dark text-white":"bg-gray-100 text-light"} relative py-2 px-2 max-sm:py-1 rounded  shadow-sp pr-5 `}>
                 <p onClick={()=> setFolderId(index)} className={` transition-all duration-200 w-[9rem] max-sm:w-[8rem] font-bold text-md text-[1.2rem] overflow-auto`}>{folder}</p>
               
    
                 
                 <div onClick={()=> setFolderIndex(index)} className="absolute top-0 right-0  flex flex-col justify-center items-center h-full">
                  <HiDotsVertical size={23}/>
                </div>
                
                {/*options*/}
           <OutsideClickHandler onOutsideClick={() => setFolderIndex("00")}>
                <div className={`${folderIndex === index ? "w-[7.5rem] h-[1.6rem]" : "w-0 h-0"}
                 ${folderId === index ? "text-white":"text-light "}
                 transition-all duration-200 overflow-hidden absolute top-3 right-2 flex shadow-sp rounded-md text-light backdrop-blur-3xl  shadow font-bold border-[1px] border-gray-300`}>
                  <span onClick={()=> preEdit(folder,index)} className="rounded-l-md w-[2.5rem] h-[1.5rem] flex justify-center items-center border-r-[1px] border-gray-200 hover:bg-red-300  shadow-md">
                    <AiFillEdit size={18}/>
                  </span>
                 
                  <span onClick={()=> predelete(folder,index)} className=" w-[2.5rem] h-[1.5rem] flex justify-center items-center hover:bg-red-400">
                    <MdDelete size={18}/>
                  </span>
                 
                  <span className=" border-l-[1px] border-gray-200 rounded-r-md w-[2.5rem] h-[1.5rem] flex justify-center items-center hover:bg-red-400">
                    <MdInfo size={18}/>
                  </span>
                 
                </div>
                
       </OutsideClickHandler>
              </div>
            ))
          
  
  return(
    <>
        {/*newFolder*/}
          <NewFolder 
          newFolderOpen={newFolderOpen}
          setNewFolderOpen={setNewFolderOpen}
          setFolders={setFolders}
          />
        {/*editFolder*/}
        <EditFolder 
        editFolderOpen={editFolderOpen}
        setEditFolderOpen={setEditFolderOpen}
        onEditChange={onEditChange}
        editFolderName={editFolderName}
        handleEdit={handleEdit}
        />
        
        {/*deleteFolder*/} 
        <DeleteFolder
        deleteFolderOpen={deleteFolderOpen}
        setdeleteFolderOpen={setdeleteFolderOpen}
        deleteFolderName={deleteFolderName}
        handleDelete={handleDelete}
        />
        
          {/*folder*/}
    <div style={useStyleH("8.8rem")} className=" w-full">
     <div className="w-full bg- flex items-center ">
      <div className="flex gap-1 bg-white
      p-2 items-center rounded-bl-lg rounded-tl-lg">
        <MdAdd onClick={()=> setNewFolderOpen(true)} size={18} className="w-[2rem] h-[2rem] hover:bg-red-400 bg-red-300 rounded-md text-white p-1"/>
        <MdSearch size={18}  className=" w-[2rem] h-[2rem] hover:bg-red-400 bg-red-300 rounded-md text-white p-1"/>
      </div>
      
      <div  className="scroll   text-white mt-2 flex gap-[0.4rem]  overflow-x-scroll py-3 max-sm:py-1 ">
          {contentFolder}
      </div>
     </div>
       <FolderNotes folderId={folderId}/>
    </div>
    </>
    )
}


export default Folders;