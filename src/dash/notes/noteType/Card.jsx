import react,{useState} from "react"


const Card =()=>{
  const [title,setTitle] = useState("hello")
  const [content,setContent] = useState("wowww")
  
  const onTitleChange =(e)=>{
    setTitle(e.target.value)
  }
  
  const onContentChange =(e)=>{
    setContent(e.target.value)
  }
  
  return(
    <div className="h-full">
    <div>
      <button className="p-2 px-3 bg-red-300 rounded-lg font-bold text-white hover:bg-red-400 mb-2">Save Changes</button>
    </div>
       <div>
         <textarea
         value={title}
         onChange={onTitleChange}
         className="w-full bg-dark p-3 rounded-lg text-white font-bold h-[4rem] focus:bg-white focus:text-dark outline-dark "
         />
       </div>
       <div style={{height:"calc(100% - 8rem)"}}>
         <textarea
         style={{height:"calc(100%)"}} 
         value={content}
         onChange={onContentChange}
         className="text-black shadow-2xl scrollMd scroll w-full bg-gray-200 p-3 rounded-lg   h-[4rem] focus:bg-white outline-8 outline-dark"
         />
       </div>
       
    </div>
    
    )
}


export default Card;