import react,{useState} from "react"


const NewFolder =({
  newFolderOpen,
  setNewFolderOpen,
  setFolders
})=>{
  
  //folderError
  const [folderError,setFolderError] = useState("")
  const [newFolderName,setNewFolderName] = useState("")
  
  
  //cancel add new folder
  const onCancel =()=>{
      setNewFolderOpen(false)
      setNewFolderName("")
      setFolderError(" ")
    }
  
  //onChange
  const handleNew= (e)=>{
      setNewFolderName(e.target.value)
      setFolderError("")
    }
  
  //ass new folder
  const addFolder =()=>{
      if(newFolderName && newFolderName !== " "){
      setFolders(prev => [...prev,newFolderName])
       setFolderError("")
       setNewFolderOpen(false)
       setNewFolderName("")
      }else{
        setFolderError("pls type in folder name")
      }
    }
  
  
  return(
<div className={`${newFolderOpen ? "scale-100" : "scale-0" } transition-all duration-200 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] max-sm:w-[20rem] w-[22rem]  bg-dark rounded-lg z-40 shadow-2xl p-4 flex flex-col gap-4`}>
          <p className="text-red-400">   {folderError} </p>
              <p className="text-[1.5rem] font-semibold text-red-300 underline-offset-4">
                 Enter folder Name
              </p>
              
              <div>
               <input
               type="text"
               value={newFolderName}
               onChange={handleNew}
               className="autoFocus w-full border-b-2 outline-0 border-white py-1 text-white font-bold px-3 focus:border-b-red-300 bg-transparent mb-3"
               />
              </div>
        
              <div className=" flex gap-2 justify-between items-center">
                <button onClick={onCancel} className="p-1 px-3 bg-red-300 rounded-md hover:bg-red-400 font-medium text-white">cancel</button>
                

                <button onClick={addFolder}  className="p-1 px-3 bg-red-300 rounded-md hover:bg-red-400 font-medium text-white">Add</button>
                
              </div>
          </div>
    
    )
}


export default NewFolder;