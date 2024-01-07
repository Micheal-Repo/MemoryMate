import react,{useState} from "react"
import {Link} from "react-router-dom"
import bg from "../../assests/memory.jpg"

//components
import EditCollection from "./editCollection"
import DeleteCollection from "./deleteCollection"

//icons
import {MdDelete,MdEdit} from "react-icons/md"
import {AiFillEdit} from "react-icons/ai"
import {IoIosArrowDown,IoIosArrowUp} from "react-icons/io"

const Grid =({collections,setCollections})=>{

    
    let content;
    content = collections.map((collection,index)=> <EachGrid key={index} collection={collection} setCollections={setCollections} index={index}/>)
  
  return(
    <>
   
    <div className="grid md:grid-cols-2 gap-[4px] md:gap-2  w-full pr-1">
    
       {content}
   
   
    </div>
    </>
    
    )
}


export default Grid;


const EachGrid =({collection,index,setCollections})=>{
  const [isOpen,setIsOpen] = useState(false)
  const text= collection.title
  const Split = text.split("")

    //editCollection
  const [editCollectionOpen,setEditCollectionOpen] = useState(false)
  const [editCollectionName,setEditCollectionName] = useState("")
  const [collectionId,setCollectionId] = useState("")
  const [editCollectionDesc,setEditCollectionDesc] = useState("")
  
  
  const preEdit =()=>{
    setEditCollectionOpen(true)
    setEditCollectionName(collection.title)
    setEditCollectionDesc(collection.desc)
    setCollectionId(index)
  }
  
  //DeleteCollection
  const [deleteCollectionOpen,setdeleteCollectionOpen]=useState(false)
  const [deleteCollectionName,setDeleteCollectionName]=useState(false)
  
  const preDelete=()=>{
    setdeleteCollectionOpen(true)
    setDeleteCollectionName(collection.title)
  }
  
  const handleDelete=()=>{
    setCollections(prev => prev.filter((colle,i)=> i !== index))
    setdeleteCollectionOpen(false)
  }
  
  return(
    <>
     <EditCollection
    editCollectionOpen={editCollectionOpen}
    setEditCollectionOpen={setEditCollectionOpen}
   editCollectionName={editCollectionName}
   editCollectionDesc={editCollectionDesc}
   setEditCollectionName={setEditCollectionName}
  setEditCollectionDesc={setEditCollectionDesc}
  collectionId={collectionId}
  setCollectionId={setCollectionId}
  setCollections={setCollections}
    />
    
    <DeleteCollection
    deleteCollectionOpen={deleteCollectionOpen}
    setdeleteCollectionOpen={setdeleteCollectionOpen}
    deleteCollectionName={deleteCollectionName}
    handleDelete={handleDelete}
    />
     <div style={{
      backgroundImage:`linear-gradient(to bottom,rgba(20, 15, 41, 0.4),rgba(0,0,0,1)),url(${bg})`,
       backgroundSize:"cover",
       backgroundPosition:"center"
     }}  className="rounded-md bg-light h-[10rem] w-full p-2 flex flex-col justify-between relative overflow-hidden">
     <div></div>
     {/*description*/}
     <div style={{background : "rgba(20, 15, 41, 0.6)"}} className={` duration-300 transition-all w-full h-[10rem] absolute ${isOpen ? "top-0" : "top-[-100%]"} left-0 backdrop-blur-sm z-10 flex justify-center  flex-col `}>
     <p className="p-2 text-gray-300 italic font-medium underline">description</p>
       <p className="py-2 w-[80%] m-auto h-[5rem] rounded-md text-center justify-center items-center flex  text-white font-bold italic text-[1.2rem] overflow-auto">{collection.desc ? collection.desc : <span className="text-gray-300 opacity-[0.4]">No description</span>}</p>
       <IoIosArrowUp onClick={()=> setIsOpen(false)} size={20} className="absolute bottom-2 right-2 text-gray-400"/>
     </div>
     
     {/*collection*/}
     <IoIosArrowDown onClick={()=> setIsOpen(true)} size={20} className="absolute top-2 left-2 text-gray-300 opacity-[0.8]"/>
     <div className="absolute top-2 right-2 text-gray-300 flex gap-2">

      <MdDelete onClick={preDelete} size={23} className="hover:text-red-300 opacity-[0.8] hover:opacity-100 " />
      <AiFillEdit onClick={preEdit} size={23} className="hover:text-red-300 opacity-[0.8] hover:opacity-100 " />
     
     </div>
        <div className="h-[3rem] flex justify-between items-center">
          <Link to="/dash/collection/1234"  className=" text-[1.4rem] text-red-300 font-bold">{Split.length > 12 ? `${text.slice(0,12)}...` : text}</Link>
          <p className=" text-gray-400 text-[0.8rem]  overflow-auto">63 minutes ago</p>
        </div>
        
      </div>
      </>
    )
}