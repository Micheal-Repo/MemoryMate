import react,{useState} from "react"


const EditFolder =({
  editFolderOpen,
  setEditFolderOpen,
  editFolderName,
  onEditChange,
  handleEdit
})=>{
  
  //folderError
  const [folderError,setFolderError] = useState("")
  
  
  //cancel add new folder
  const onCancel =()=>{
      setEditFolderOpen(false)
      setFolderError(" ")
    }
  
  //onChange
  
  
  //ass new folder
  
  
  
  
  return(
<div className={`${editFolderOpen ? "scale-100" : "scale-0" } transition-all duration-200 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] max-sm:w-[20rem] w-[22rem]  bg-dark rounded-lg z-40 shadow-2xl p-4 flex flex-col gap-4`}>
          <p className="text-red-400">   {folderError} </p>
              <p className="text-[1.5rem] font-semibold text-red-300 underline-offset-4">
                 Rename
              </p>
              
              <div>
               <input
               type="text"
               value={editFolderName}
               onChange={onEditChange}
               className="autoFocus w-full border-b-2 outline-0 border-white py-1 text-white font-bold px-3 focus:border-b-red-300 bg-transparent mb-3"
               />
              </div>
        
              <div className=" flex gap-2 justify-between items-center">
                <button onClick={onCancel} className="p-1 px-3 bg-red-300 rounded-md hover:bg-red-400 font-medium text-white">cancel</button>
                

                <button onClick={handleEdit}  className="p-1 px-3 bg-red-300 rounded-md hover:bg-red-400 font-medium text-white">Rename</button>
                
              </div>
          </div>
    
    )
}


export default EditFolder;