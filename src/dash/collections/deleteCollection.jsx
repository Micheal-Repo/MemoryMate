import react,{useState} from "react"


const DeleteCollection =({
  deleteCollectionOpen,
  setdeleteCollectionOpen,
  deleteCollectionName,
  handleDelete
})=>{
  
  //CollectionError
  const [collectionError,setCollectionError] = useState("")
  
  
  //cancel add new Collection
  const onCancel =()=>{
      setdeleteCollectionOpen(false)
      setCollectionError(" ")
    }
  
  //onChange
  
  
  //ass new Collection
  
  
  
  
  return(
    <>
      <div className={`${deleteCollectionOpen ? "scale-100" : "scale-0"} h-full absolute top-0 left-0 w-full bg-black opacity-[0.6] z-30`}>
    </div>
<div className={`${deleteCollectionOpen ? "scale-100" : "scale-0" } transition-all duration-200 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] max-sm:w-[20rem] w-[22rem]  bg-dark rounded-lg z-40 shadow-2xl p-4 flex flex-col gap-4`}>
          <p className="text-red-400">   {collectionError} </p>
              <p className="text-[1rem] font-semibold text-red-300 underline-offset-4">
               Are you sure you want to delete this Collection
              </p>
              
              <div className="w-[16rem] bg-light shadow-sp rounded-lg m-auto text-white trxt-center p-2 font-bold italic flex justify-center items-center overflow-auto">
                {deleteCollectionName}
              </div>
        
              <div className=" flex gap-2 justify-between items-center">
                <button onClick={onCancel} className="p-1 px-3 bg-red-300 rounded-md hover:bg-red-400 font-medium text-white">cancel</button>
                

                <button onClick={handleDelete}  className="p-1 px-3 bg-red-300 rounded-md hover:bg-red-400 font-medium text-white">Delete</button>
                
              </div>
          </div>
          </>
    
    )
}


export default DeleteCollection;