import react,{useState} from "react"


const EditCollection =({
  editCollectionOpen,
  setEditCollectionOpen,
  setCollections,
  editCollectionDesc,
  editCollectionName,
  setEditCollectionName,
  setEditCollectionDesc,
  collectionId,
  setCollectionId,
 
})=>{
  
  //CollectionError
  const [collectionError,setCollectionError] = useState("")
  //Edit Collection detail 
  
  
  
  //cancel add Edit Collection
  const onCancel =()=>{
      setEditCollectionOpen(false)
      setEditCollectionName("")
      setEditCollectionDesc("")
      setCollectionError(" ")
    }
  
  
  //onChange name
  const handleEditName = (e)=>{
      setEditCollectionName(e.target.value)
      setCollectionError("")
    }
    
  //onChange desc
  const handleEditDesc = (e)=>{
      setEditCollectionDesc(e.target.value)
      setCollectionError("")
    }
    
  //ass Edit Collection
  const updateCollection =()=>{
    
      if(editCollectionName && editCollectionName !== " "){
        
    //setCollections([{""}])    
      setCollections(prev => prev.map((colle,index)=> index === collectionId ? {...colle,title:editCollectionName,desc:editCollectionDesc} : colle))
      
       setCollectionError("")
       setEditCollectionOpen(false)
       setEditCollectionName("")
       setEditCollectionDesc("")
       setCollectionId("")
      }else{
        setCollectionError("pls type in Collection name")
      }
    }
  
  
  return(
    <>
    <div className={`${editCollectionOpen ? "scale-100" : "scale-0"} h-full absolute top-0 left-0 w-full bg-black opacity-[0.6] z-30`}>
    </div>
<div className={`${editCollectionOpen ? "scale-100" : "scale-0" } transition-all duration-200 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] max-sm:w-[20rem] w-[22rem]  bg-dark rounded-lg z-40 shadow-2xl p-4 flex flex-col gap-4`}>
          <p className="text-red-400">   {collectionError} </p>
              <p className="text-[1.5rem] font-semibold text-red-300 ">
                 Edit Collection 
              </p>
              
              <div>
               <input
               placeholder="Enter Collection Name"
               type="text"
               value={editCollectionName}
               onChange={handleEditName}
               className="autoFocus w-full border-[2px] rounded-lg outline-0 border-light p-2 py-3 text-white font-bold px-3 focus:border-red-300 bg-light shadow-sp mb-3"
               />
              </div>
              <div>
               <textarea
               type="text"
               placeholder="Enter description (optional)"
               value={editCollectionDesc}
               onChange={handleEditDesc}
               className="rounded-md autoFocus w-full border-[2px] outline-0 border-light shadow-sp py-2 h-[8rem] text-white font-bold px-3 focus:border-red-300 bg-light mb-3"
               />
              </div>
        
              <div className=" flex gap-2 justify-between items-center mb-2">
                <button onClick={onCancel} className="p-2 px-3 bg-red-300 rounded-md hover:bg-red-400 font-medium text-white">cancel</button>
                

                <button onClick={updateCollection}  className="p-2 px-3 bg-red-300 rounded-md hover:bg-red-400 font-medium text-white">Done</button>
                
              </div>
          </div>
          </>
    
    )
}


export default EditCollection;