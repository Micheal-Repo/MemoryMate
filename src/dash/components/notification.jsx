import react from "react"
import {MdClose} from "react-icons/md"
import {selectUserInfo} from "../../features/Slice"
import {useSelector} from "react-redux"

const Notification  =({notiOpen,closeNoti})=>{
  const userInfo = useSelector(selectUserInfo)
  
  
  return(
    <>
    <div className={`${notiOpen  ? "scale-100" : "scale-0"} absolute top-0 left-0 w-full h-full bg-black opacity-[0.7] z-30`}>
</div>
<div className={`${notiOpen  ? "scale-100" : "scale-0" } transition-all duration-200 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] max-sm:w-[20rem] w-[22rem]  bg-white rounded-lg z-40 shadow-2xl p-6 flex flex-col gap-4`}>
    <span className="absolute top-[-1rem] right-0 rounded-full p-3 bg-gray-300 shadow-sp hover:scale-110 transition duration-200" onClick={closeNoti}>
      <MdClose size={25}/>
    </span>
    
    <p className="font-bold italic text-light underline">
      Notification 
    </p>
    
    <div className="italic text-[0.8rem] font-light">
    <span className="text-[1rem]">
    Dear {userInfo.username},
    </span>
    <br/>
    this is to inform you that the issue of occasionally seeing a note content that was probably viewed recently in another note, has been fixed.
    <br/> {" "} we  apologized for the inconvenience this had caused you
    
    <br/>
    <br/>
   If you encounter any other problem while using the app, do well to contact us, Thanks
    </div>
    </div>
    </>
    )
}


export default Notification 