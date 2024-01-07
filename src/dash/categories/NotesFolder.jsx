import react,{useState} from "react"
//library
import {useParams} from "react-router-dom"
//components
import Notes from "../notes/notes"
import Folders from "../folders/folders"

const NotesFolders =()=>{
  
  const {cateId} = useParams()
  
  const isFolder = false
  
  
  let content;
  if(isFolder){
    content = <Folders/>
  }else{
    content = <Notes />
    
  }
  
  return content 
}


export default NotesFolders;