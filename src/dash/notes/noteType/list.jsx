import react,{useState} from "react"
import "./style.css"

//icons
import {MdDelete,MdAdd} from "react-icons/md"

const List =()=>{
  
  //alert
  const [notiOpen,setNotiOpen]=useState(false)
  //title
  const [listTitle,setListTitle] = useState("title")
  //list index that's about to be deleted
  const [listIndex,setListIndex] = useState("")
  //list that's about to be deleted
  const [list,setList] = useState("")
  //list
  const [listData,setListData] = useState(["no-underline","mma moo"])
    
    
    
    //AddList
    const addList =()=>{
      setListData(prev => [...prev,""])
    }
    
     //predelete
    const predelete=(list,index)=>{
       setNotiOpen(true)
      setListIndex(index)
      setList(list)
    }
    
    //deleteList
    const deleteList = ()=>{
      setListData(prev => prev.filter((list,i) => i !== listIndex))
  
       setNotiOpen(false)
    }
    
    //onTitleChamge
    const onTitleChange =(e)=>{
      setListTitle(e.target.value)
    }
    
    //onListChamge
    const onListChange =(index,value)=>{
      setListData(prev => {
        const newData = [...prev];
        newData[index] = value
        
        return newData
      })
    }
 
  
  return(
    <>
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

{/*Add*/}
    <div className="mb-2 flex gap-2">
      <button onClick={addList} className="p-1 px-3 rounded-lg bg-red-300 hover:bg-red-400 text-white font-medium">
          <MdAdd size={30}/>  
      </button>
    </div>
    
    {/*table*/}
    <div style={{height:"calc(100% - 6rem)"}} className=" w-full  overflow-scroll relative">
    
    {/*head*/}
    <div className="flex gap-1 sticky top-0 z-10 w-full text-white text-[1.2rem] font-bold">
      <div className="bg-light w-[4rem] h-[3.2rem] p-3">
       S/N
      </div>
      
      <div className="w-full">
       <textarea
       type="text"
       value={listTitle}
       onChange={onTitleChange}
       className="bg-light w-full h-[3.2rem] p-3 focus:bg-gray-400  outline-light outline-2"
       
       />
      </div>
    </div>
    
    {/*body*/}
    <div className="flex flex-col gap-[2px] w-full">
      {
        listData.map((list,index)=>(
          <div className="flex w-full gap-1 text-[1.1rem]">
             <div className="w-[4rem] bg-gray-200 p-3 h-[4rem] font-bold">
                 {index + 1}
             </div>
             
             <div className="w-full relative">
               <textarea
                value= {list}
                row={2}
                onChange={(e)=> onListChange(index,e.target.value)}
                className="bg-gray-200 w-full h-[4rem] p-3 focus:bg-white outline-light "
                />
                <MdDelete onClick={()=> predelete(list,index)} size={25} className="absolute top-1 right-1 text-gray-500"/>
             </div>
          
          </div>
          ))
      }
    </div>

   
    
    </div>
    
      <div className="w-full flex justify-end ">
      <button className="p-2 mt-2 px-3 bg-red-300 hover:bg-red-400 rounded-lg text-white">
          Save
          Changes
         </button>
        </div>
    </>
    
    )
}


export default List;