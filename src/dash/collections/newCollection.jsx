import react,{useState} from "react"


const NewCollection =({
  newCollectionOpen,
  setNewCollectionOpen,
  setCollections
})=>{
  
  //CollectionError
  const [collectionError,setCollectionError] = useState("")
  //new Collection detail 
  const [newCollectionName,setNewCollectionName] = useState("")
  const [newCollectionDesc,setNewCollectionDesc] = useState("")
  
  
  //cancel add new Collection
  const onCancel =()=>{
      setNewCollectionOpen(false)
      setNewCollectionName("")
      setNewCollectionDesc("")
      setCollectionError(" ")
    }
  
  
  //onChange name
  const handleNewName = (e)=>{
      setNewCollectionName(e.target.value)
      setCollectionError("")
    }
    
  //onChange desc
  const handleNewDesc = (e)=>{
      setNewCollectionDesc(e.target.value)
      setCollectionError("")
    }
    
  //ass new Collection
  const addCollection =()=>{
    
      if(newCollectionName && newCollectionName !== " "){
        const newColle = {title:newCollectionName , desc: newCollectionDesc}
        
      setCollections(prev => [...prev,newColle])
      
       setCollectionError("")
       setNewCollectionOpen(false)
       setNewCollectionName("")
       setNewCollectionDesc("")
      }else{
        setCollectionError("pls type in Collection name")
      }
    }
  
  
  return(
    <>
    <div className={`${newCollectionOpen ? "scale-100" : "scale-0"} h-full absolute top-0 left-0 w-full bg-black opacity-[0.6] z-30`}>
    </div>
<div className={`${newCollectionOpen ? "scale-100" : "scale-0" } transition-all duration-200 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] max-sm:w-[20rem] w-[22rem]  bg-dark rounded-lg z-40 shadow-2xl p-4 flex flex-col gap-4`}>
          <p className="text-red-400">   {collectionError} </p>
              <p className="text-[1.5rem] font-semibold text-red-300 ">
                 Create New Collection 
              </p>
              
              <div>
               <input
               placeholder="Enter Collection Name"
               type="text"
               value={newCollectionName}
               onChange={handleNewName}
               className="autoFocus w-full border-[2px] rounded-lg outline-0 border-light p-2 py-3 text-white font-bold px-3 focus:border-red-300 bg-light shadow-sp mb-3"
               />
              </div>
              <div>
               <textarea
               type="text"
               placeholder="Enter description (optional)"
               value={newCollectionDesc}
               onChange={handleNewDesc}
               className="rounded-md autoFocus w-full border-[2px] outline-0 border-light shadow-sp py-2 h-[8rem] text-white font-bold px-3 focus:border-red-300 bg-light mb-3"
               />
              </div>
        
              <div className=" flex gap-2 justify-between items-center mb-2">
                <button onClick={onCancel} className="p-2 px-3 bg-red-300 rounded-md hover:bg-red-400 font-medium text-white">cancel</button>
                

                <button onClick={addCollection}  className="p-2 px-3 bg-red-300 rounded-md hover:bg-red-400 font-medium text-white">Create</button>
                
              </div>
          </div>
          </>
    
    )
}


export default NewCollection;