import react,{useState} from "react"
//library
import {useParams,Outlet} from "react-router-dom"
//components
import Notes from "../notes/notes"
import Folders from "../folders/folders"
import {useGetCatesQuery} from "./cateApiSlice"

const NotesFolders =()=>{
  
  const {cateId} = useParams()
  
   let content;
   
  if(cateId){
     
  const {cate} = useGetCatesQuery("cateList",{
    selectFromResult:({data})=>({
      cate:data?.entities[cateId]
    })
  })
  
 // http://localhost:5173/dash/collection/65ad2176707d6d721e74f0da/notes/65ad21ac707d6d721e74f0f2
  
  
  if(!cate){
    content = <p className="text-black"></p>
  }else{
    
  if(cate?.folder){
    content = <Outlet/>
  }else{
    content = <Notes />
    
    }
  }
  
  }
  
  return content
}


export default NotesFolders;