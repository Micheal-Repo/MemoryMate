import react,{useState} from "react"

//library
import {useSelector,useDispatch} from "react-redux"
import {selectToken,setToken} from "../../features/Slice"


const NoFile =()=>{
  
  const token=useSelector(selectToken)
  const dispatch= useDispatch()
  
  return(
    <div className="w-full h-[20rem] justify-center flex items-center text-center font-medium text-gray-400 italic">
 
       The list of Folder/Notes
       <br/>
       under each category will appear here when clicked 
       <br/>
       
    </div>
    
    )
}


export default NoFile;