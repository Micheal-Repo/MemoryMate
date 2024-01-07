import react,{useState} from "react"


const PopNoti =()=>{
  
  
  return(
      {/*notification*/}
          <div className={`${notiOpen ? "scale-100" : "scale-0" } transition-all duration-200 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] max-sm:w-[20rem] w-[22rem] h-[14rem] bg-dark rounded-lg z-40 shadow-2xl p-4 flex flex-col gap-4`}>
              <p className="text-[1.5rem] font-semibold text-red-400 underline-offset-4 underline ">
                Warning
              </p>
              
              <p className="font-medium text-white italic text-center">Are you sure you want to delete this list <br/> 
                <p className="border-2 border-gray-600 p-2 bg-light w-[15rem] h-[2.5rem] overflow-auto m-auto rounded-lg my-[2px]">{list}</p>
                
              this action can not be undone
              </p>
              
              <div className=" flex gap-2 justify-between items-center">
                <button onClick={()=> setNotiOpen(false)} className="p-1 px-3 bg-red-300 rounded-md hover:bg-red-400 font-medium text-white">cancel</button>
                

                <button onClick={deleteList} className="p-1 px-3 bg-red-300 rounded-md hover:bg-red-400 font-medium text-white">delete</button>
                
              </div>
          </div>

    )
}


export default PopNoti;