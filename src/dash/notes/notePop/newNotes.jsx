import react,{useState} from "react"

//components 
import SelectNoteFormat from "./selectFormat"

//newNote
import Card from "../newNote/card"
import Note from "../newNote/note"

const NewNotes =({
  newNoteOpen,
  setNewNoteOpen,
  openFormat,
  setOpenFormat
})=>{
  
  const [openAddNote,setOpenAddNote]=useState(false)
  const [selectedFormat,setselectedFormat]=useState("")
  
  return(
 <div className={`${newNoteOpen ? "scale-100" : "scale-0"}  absolute top-0 left-0 w-screen h-screen z-40`}>
<div className={` absolute top-0 left-0 w-full h-full bg-black opacity-[0.7] z-40`}>
</div>
         <SelectNoteFormat
       openFormat={openFormat}
       setOpenFormat={setOpenFormat}
       setNewNoteOpen={setNewNoteOpen}
       setOpenAddNote={setOpenAddNote}
       setselectedFormat={setselectedFormat}
     />  
     
   
        <div className={`${openAddNote ? "scale-100" : "scale-0"} transition duration-300  h-full w-full z-40 absolute top-0 left-0 flex justify-center items-center`}>
          <Note 
          selectedFormat={selectedFormat}
          setOpenFormat={setOpenFormat}
          setNewNoteOpen={setNewNoteOpen}
          setOpenAddNote={setOpenAddNote}
       />
        </div>
        
    

 </div>
  
    
    )
}


export default NewNotes;