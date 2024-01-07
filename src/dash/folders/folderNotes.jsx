import react,{useState} from "react"
//library
import {useSelector} from "react-redux"
import {useParams} from "react-router-dom"

//components
import Note from "../notes/note"

//hook
import useStyleH from "../Hooks/useStyleH"

//icons
import {MdAdd,MdSearch} from "react-icons/md"


const FolderNotes =({folderId})=>{
//  const StyleH = useStyleH("10rem")
  const value = useSelector(state => state.mySlice.value)
  
  const styleH = {
    height:"calc(100% - 8rem)"
  }
  
  return(
    <div style={{height:"calc(100% - 2rem)"}}  className="  notesList w-full overflow-hidden ">
   
    <div className="flex justify-between items-center md:p-4 max-sm:px-2  rounded mt-1 md:mt-4 py-1">
      <p>Total: 20</p>
      <div className="flex items-center gap-2">
      <button className="p-1 md:p-3 rounded-lg bg-red-300 hover:bg-red-500 shadow text-white font-medium flex items-center gap-2 max-sm:px-3"> 
         <MdSearch size={25}/> 
         </button>
      <button className="p-1 md:p-3 rounded-lg bg-red-300 hover:bg-red-500 shadow text-white font-medium flex items-center gap-2 max-sm:px-3"> 
         <MdAdd size={25}/>
         </button>
    </div>
    </div>
    
    <div style={useStyleH("0.6rem")} className="scroll p-3 w-full overflow-y-scroll  flex gap-3 flex-col">
      <Note  type={"table"}/>
      <Note type={"list"}/>
      <Note type={"card"}/>
      <Note/>
    </div>

    </div>
    
    )
}


export default FolderNotes;