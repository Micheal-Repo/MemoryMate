import react,{useState} from "react"

//icons
import {MdDelete} from "react-icons/md"
import {IoMdEye} from "react-icons/io"

//components
import PopUp from "../helper/pop"
import Card from "./noteType/Card"
import List from "./noteType/list"
import Table from "./noteType/Table"

const Note =({type})=>{
  const [isPopOpen,setIsPopOpen] = useState(false)
  const [noteType,setNoteType] = useState(type)
  
  const openPop = ()=> setIsPopOpen(true)
  const closePop = ()=> setIsPopOpen(false)
  
  //noteTyle
  let NoteFormat;
  if(noteType === "card"){
    NoteFormat = <Card/>
    
  }else if(noteType === "list"){
    NoteFormat = <List/>
    
  }else if(noteType === "table"){
    NoteFormat = <Table/>
  
  }
  
  return(
    <>
    <PopUp isOpen={isPopOpen} onClose={closePop}>
      <div className="max-sm:w-[20rem] max-md:w-[25rem] w-[30rem] max-sm:h-[32rem] max-md:h-[34] h-[36rem] overflow-scroll">
        {NoteFormat}
      </div>
    </PopUp>
    <div className=" w-full rounded-lg h-[6rem] md:h-[8rem] bg-dark text-white shadow-xl max-sm:p-2 p-4 md:px-6  flex flex-col justify-between opacity-[0.9]  shadow-sp hover:opacity-[1]">
    {/*first part*/}
       <div className="w-full flex justify-between">
           <div style={{width:"calc(100% - 2rem)"}} className=" text-[1.5rem] md:text-[1.8rem] font-bold overflow-auto h-[3rem] md:h-[3.5rem]">
        Gen 3:2
       </div>
        <p className="font-medium text-white opacity-[0.7] md:text-[1.3rem]">List</p>
       </div>
       
    {/*2nd part*/}

       
    {/*3rd part*/}
       <div className="w-full h-[2rem] flex justify-between items-center">
          <div className="flex justify-center items-center gap-2 text-white ">
           <span onClick={openPop} className="flex justify-center items-center rounded-lg shadow bg-light w-[2rem] md:h-[2.3rem] md:w-[2.3rem] h-[2rem] hover:bg-red-400 hover:text-white">
            <IoMdEye size={23} />
           </span>
           <span className="flex justify-center items-center rounded-lg shadow bg-light w-[2rem] md:h-[2.3rem] md:w-[2.3rem] h-[2rem] hover:bg-red-400 hover:text-white">
            <MdDelete size={23}/>
           </span>
          </div>
          
          <div>
           <p className="font-medium text-white opacity-[0.7]">3 minutes ago</p>
          </div>
       </div>
       
    </div>
    </>
    )
}


export default Note;