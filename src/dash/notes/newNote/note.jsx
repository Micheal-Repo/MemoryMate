import react,{useState} from "react"

//library
import {CgClose} from "react-icons/cg"
import {MdArrowBack} from "react-icons/md"

//noteFormat
import Card from "./card"
import List from "./list"
import Table from "./table"

const Note =({
  selectedFormat,
  setOpenAddNote,
  setNewNoteOpen,
  setOpenFormat,
})=>{
  
  const onClose=()=>{
    setOpenAddNote(false)
    setNewNoteOpen(false)
  }
  const back=()=>{
    setOpenFormat(true)
    setOpenAddNote(false)
  }
  
  let newNoteFormat;
  if(selectedFormat === "card"){
    newNoteFormat=<Card 
    setOpenAddNote={setOpenAddNote}
    setNewNoteOpen={setNewNoteOpen}
    />
  }else if(selectedFormat === "list"){
    newNoteFormat=<List
    setOpenAddNote={setOpenAddNote}
    setNewNoteOpen={setNewNoteOpen}
    />
  }else if(selectedFormat === "table"){
    newNoteFormat=<Table
    setOpenAddNote={setOpenAddNote}
    setNewNoteOpen={setNewNoteOpen}
    />
  }
  
  return(
   
      <div className="bg-white max-sm:w-[21rem] max-md:w-[28rem] w-[34rem] max-sm:h-[35rem] max-md:h-[38rem] h-[42rem] overflow-scroll relative p-2 rounded-md relative">        
      
      {/*icon*/}
        <div className="w-full  flex items-center justify-between">
        
           <span onClick={back}
           className="p-2 rounded-lg shadow-sp bg-gray-200 hover:bg-red-400 hover:text-white mb-2">
             <MdArrowBack size={25}/>
           </span>
           
           <span onClick={onClose}
           className="p-2 rounded-lg shadow-sp bg-gray-200 hover:bg-red-400 hover:text-white mb-2">
             <CgClose size={25}/>
           </span>
           
        </div>
        
        
        {/*new nore format*/}
           
             { newNoteFormat}
          </div>
     
    
    )
}


export default Note;