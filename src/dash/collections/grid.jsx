import react,{useState, useEffect} from "react"
import {Link} from "react-router-dom"
import bg from "/memory.jpg"

//library
import {useSelector,useDispatch} from "react-redux"
import {selectToken,setToken} from "../../features/Slice"
import {formatDistanceToNow,formatDistanceToNowStrict} from "date-fns"
import {useParams} from "react-router-dom"

//components
import EditCollection from "./editCollection"
import DeleteCollection from "./deleteCollection"
import {useGetCollesQuery} from "./colleApiSlice"

//icons
import {MdDelete,MdEdit} from "react-icons/md"
import {AiFillEdit} from "react-icons/ai"
import {IoIosArrowDown,IoIosArrowUp} from "react-icons/io"

const Grid =({ids,setLength})=>{
const tokens = useSelector(selectToken)
const dispatch= useDispatch()

    
    useEffect(()=>{
      setLength(ids.length)
    },[ids])
    
    let content;
    if(ids?.length){
    content = ids.map(id => <EachGrid id={id}/>)// <p>Hello</p>
    }
    //ids.map(colleId => <EachGrid key={colleId} colleId={colleId}/>)
  //  content = collections.map((collection,index)=> <EachGrid key={index} collection={collection} setCollections={setCollections} index={index}/>)
  
  return(
    <>
   
    <div className="grid md:grid-cols-2 gap-[4px] md:gap-2  w-full pr-1">
    
     
      {content}
   
    </div>
    </>
    
    )
}


export default Grid;


const EachGrid =({id})=>{
  
    const {colle} = useGetCollesQuery("colleList",{
      selectFromResult:({data})=>({
        colle : data?.entities[id]
      })
    })
    
    const [isOpen,setIsOpen] = useState(false)
    
  //title
  const text= colle.title
  const Split = text.split("")
  
  //time
  const CreatedAt = formatDistanceToNowStrict(new Date(colle.createdAt),{addSuffix:true})
  
  
  //editCollection
  const [CoverPic,setCoverPic]=useState("")
  const [editCollectionOpen,setEditCollectionOpen] = useState(false)
  const [editCollectionName,setEditCollectionName] = useState("")
  const [collectionId,setCollectionId] = useState("")
  const [editCollectionDesc,setEditCollectionDesc] = useState("")
  
  const preEdit =()=>{
    setEditCollectionOpen(true)
    setEditCollectionName(colle.title)
    setEditCollectionDesc(colle.desc)
    setCoverPic(colle.coverPic)
    setCollectionId(colle.id)
  }
  
  //deleteCollection
  const [deleteCollectionOpen,setdeleteCollectionOpen]=useState(false)
  const [deleteCollectionName,setDeleteCollectionName]=useState(false)
  
  const preDelete=()=>{
    setdeleteCollectionOpen(true)
    setDeleteCollectionName(colle.title)
    setCollectionId(colle.id)
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
  CoverPic={CoverPic}
  setCoverPic={setCoverPic}
    />
    
        <DeleteCollection
    deleteCollectionOpen={deleteCollectionOpen}
    setdeleteCollectionOpen={setdeleteCollectionOpen}
    deleteCollectionName={deleteCollectionName}
    setDeleteCollectionName={setDeleteCollectionName}
    collectionId={collectionId}
    setCollectionId={setCollectionId}
    
    />
    
  <div style={{
      backgroundImage:`linear-gradient(to bottom,rgba(20, 15, 41, 0.4),rgba(0,0,0,1)),url(${colle.coverPic || bg})`,
       backgroundSize:"cover",
       backgroundPosition:"center"
     }}  className="rounded-md bg-light h-[10rem] w-full p-2 flex flex-col justify-between relative overflow-hidden">
     <div></div>
     {/*description*/}
     <div style={{background : "rgba(20, 15, 41, 0.6)"}} className={` duration-300 transition-all w-full h-[10rem] absolute ${isOpen ? "top-0" : "top-[-100%]"} left-0 backdrop-blur-sm z-10 flex justify-center  flex-col `}>
     <p className="p-2 text-gray-300 italic font-medium underline">description </p>
       <p className="py-2 w-[80%] m-auto h-[5rem] rounded-md text-center justify-center items-center flex  text-white font-bold italic text-[1.2rem] overflow-auto">{colle.desc ? colle.desc : <span className="text-gray-300 opacity-[0.4]">No description</span>}</p>
       <IoIosArrowUp onClick={()=> setIsOpen(false)} size={20} className="absolute bottom-2 right-2 text-gray-400"/>
     </div>
     
     {/*collection*/}
     <IoIosArrowDown onClick={()=> setIsOpen(true)} size={20} className="absolute top-2 left-2 text-gray-300 opacity-[0.8]"/>
     <div className="absolute top-2 right-2 text-gray-300 flex gap-2">

      <MdDelete onClick={preDelete} size={23} className="hover:text-red-300 opacity-[0.8] hover:opacity-100 " />
      <AiFillEdit onClick={preEdit} size={23} className="hover:text-red-300 opacity-[0.8] hover:opacity-100 " />
     
     </div>
        <div className="h-[3rem] flex justify-between items-center">
          <Link to={`/dash/collection/${id}`} className=" text-[1.4rem] text-red-300 font-bold hover:underline">{Split.length > 12 ? `${text.slice(0,12)}...` : text}</Link>
          <p className=" text-gray-400 text-[0.8rem]  overflow-auto">{CreatedAt}</p>
        </div>
        
      </div>
      </>
   )
}