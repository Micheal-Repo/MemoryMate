import react,{useState} from "react"


const SelectFormat =({
  setOpenFormat,
  openFormat,
  setNewNoteOpen,
  setselectedFormat,
  setOpenAddNote
})=>{
  
  //format
  const [format,setFormat] = useState("card")
  
  const onChangeFormat=(noteFormat)=>{
    setFormat(noteFormat)
  }
  
  const handleSelectFormat=()=>{
   setOpenFormat(false)
   setselectedFormat(format)
   setOpenAddNote(true)
  }
  
  //cancel
  const onCancel =()=>{
    setOpenFormat(false)
    setNewNoteOpen(false)
  }
  
 return(
             
<div className={`${openFormat ? "scale-100" : "scale-0" } transition-all duration-200 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] max-sm:w-[20rem] w-[22rem]  bg-dark rounded-lg z-40 shadow-2xl p-4 flex flex-col gap-4`}>
              <p className="text-[1.5rem] font-medium text-red-400 underline-offset-4">

                 Select note format
              </p>
              
              {/*checkbox*/}
              <div className="text-white font-medium text-[1.1rem] flex flex-col gap-2 pl-3">
              
                 <div className="flex gap-2 items-center">
                   <input
                    id="card"
                    type="checkbox"
                    checked={format === "card"}
                    onChange={()=> onChangeFormat("card")}
                    className="w-[1.2rem] h-[1.2rem]"
                   />
                   <label htmlFor="card">Card</label>
                 </div>
                 
                 <div className="flex gap-2 items-center">
                   <input
                    id="list"
                    type="checkbox"
                    checked={format === "list"}
                    onChange={()=> onChangeFormat("list")}
                    className="w-[1.2rem] h-[1.2rem]"
                   />
                   <label htmlFor="list">List</label>
                 </div>
                 
                 <div className="flex gap-2 items-center">
                   <input
                    id="table"
                    type="checkbox"
                    checked={format === "table"}
                    onChange={()=> onChangeFormat("table")}
                    className="w-[1.2rem] h-[1.2rem]"
                   />
                   <label htmlFor="table">Table</label>
                 </div>
                 
              </div>
              
              {/*action*/}
              <div className="w-full flex justify-end gap-10 font-medium  text-red-400">
               <button onClick={onCancel}>Cancel</button>
               <button onClick={handleSelectFormat}>Next</button>
              </div>
        
            
          </div>
         
          )
}


export default SelectFormat;