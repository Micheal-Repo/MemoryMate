import react,{useState,useEffect} from "react"
import "./style.css"

//library 
import Spinner from 'react-spinner-material';
import {useParams,useNavigate} from "react-router-dom"
import {useSelector} from "react-redux"
import { toast } from 'react-toastify';

//components
import {useAddNoteMutation} from "../noteApiSlice"
import {selectUserInfo} from "../../../features/Slice"

//icons
import {MdDelete} from "react-icons/md"

const Table =({
  setNewNoteOpen,
  setOpenAddNote
})=>{
  
  const navigate = useNavigate()
  
  //alert
  const [notiOpen,setNotiOpen]=useState(false)
  const [title,setTitle]=useState("column")
  
  //row or column id that is about to be deleted 
  const [data,setData]=useState("")
  
  //info of the row or column to be deleted 
  const [tableinfo,setTableInfo]=useState("")
  
  //table data
  const [tableTitle,setTableTitle] = useState("")
  const [columns,setColumns] = useState([])
  const [rowData,setRowData] = useState([])
 const valid = columns.length && rowData.length && tableTitle
  
  
  //onTitleChange
  const onTitleChange =(e)=>{
    setTableTitle(e.target.value)
  }
    
    //updateCell
    const updateCell =(index,column,value)=>{
      setRowData(prev => prev.map((row,i)=> i === index ? {...row,[column]:value} : row ))
    }
    
    //AddRow
    const addRow = ()=>{
      const newRow = {};
      
      columns.forEach(col => (newRow[col]=""));
      
      setRowData(prev => [...prev,newRow])
    }
  
    //AddColumn
    const addColumn = (columnName)=>{
      //col
      if(columnName){
        
      setColumns(prev => [...prev,columnName ]);
      
      //riw
      setRowData(prev => prev.map(row => ({...row,[columnName]:""})))
      }
    }
    
    //predeleteColumn
    const predelete=(data,type)=>{
       setNotiOpen(true)
       setTitle(type)
       setData(data)
       
       if(type === "row"){
         setTableInfo(`Row  No.${data + 1}`)
       }
       
       if(type === "column"){
         setTableInfo(data)
       }
    }
    
    //delete Row
    const deleteRow=()=>{
      setRowData(prev => prev.filter((row,index) => index !== data))
      
      setNotiOpen(false)
    }
    
    //deleteColumn
    const deleteColumn =()=>{
      //col
   setColumns(prev => prev.filter(col => col !== data))
     //row
     setRowData(prev => {
       const newData = [...prev];
       newData.forEach(row => delete row[data]);
       return newData
     })
     
     setNotiOpen(false)
     
    }
    
    
 //AddNewNote
 
  //ids
  const userInfo = useSelector(selectUserInfo)
  const {colleId} = useParams()
  const {cateId} = useParams()
  const {folderId} = useParams()
 
   const [addNote,{
    data:Data,
    isLoading,
    isSuccess,
    isError,
    error
  }]=useAddNoteMutation()
  
  
  //AddNewNote
  const AddNewNotes =()=>{
    alert("hello")
  }
  const AddNewNote =async()=>{
    
    if(folderId){
    await addNote({
      userId:userInfo.id,
      colleId,
      cateId,
      folderId,
      inFolder:true,
      format:"table",
      title:tableTitle,
      column:columns,
      row:rowData,
    })
    }else{
    await addNote({
      userId:userInfo.id,
      colleId,
      cateId,
      inFolder:false,
      format:"table",
      title:tableTitle,
      column:columns,
      row:rowData,
    })
    }
  }
  
  
     useEffect(()=>{
  if(isSuccess){
    if(Data?.success){
      
      toast.success(Data?.message,{
        toastId:"addtable"
      });
      
     setOpenAddNote(false)
    setNewNoteOpen(false)
      
    }else{
      toast.error("something went wrong",{
        toastId:"tableWrong"
      })
    }
    
    }
  },[isSuccess || navigate])
  
  
  
  useEffect(()=>{
    if(isError){
    if(error?.data?.myError){
      toast.error(error?.data?.message)
      
    }else if(error?.status === "FETCH_ERROR"){

      toast.error("No Internet connection")
    }else if(error?.data?.jwtError ){
     navigate("/auth/login",{replace:true})
     localStorage.removeItem("loggedIn")
     }else{
      toast.error("something went wrong")
     
    }
    }
    
  },[error || navigate])

  
 
  
  return(
    <>
    {/*notification*/}
    
          <div className={`${!notiOpen ? "scale-0 opacity-0" : " scale-100 " }  transition-all duration-200 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] max-sm:w-[20rem] w-[22rem] bg-dark rounded-lg z-40 shadow-2xl p-3 px-4 flex flex-col gap-3`}>
              <p className="text-[1.5rem] font-semibold text-red-400 underline-offset-4 underline">
                Warning
              </p>
              
              <p className="font-medium text-white italic text-center mb-3">Are you sure you to delete this {title} 
              <p className="block bg-light p-2 w-[15rem] h-[2.5rem] rounded-lg overflow-auto m-auto my-1">
              {tableinfo}
              </p>
             
              </p>
              
              <div className=" flex gap-2 justify-between items-center">
                <button onClick={()=> setNotiOpen(false)} className="p-1 px-2 bg-red-400 rounded-md hover:bg-red-400 font-medium text-white">cancel</button>
                
                { title === "row"  &&
                <button onClick={deleteRow} className="p-1 px-2 bg-red-400 rounded-md hover:bg-red-400 font-medium text-white">delete</button>
                }
                { title === "column"  &&
                <button onClick={deleteColumn} className="p-1 px-2 bg-red-400 rounded-md hover:bg-red-400 font-medium text-white">delete</button>
                }
              </div>
          </div>
          

{/*Add*/}
    <div className="mb-2 flex gap-2">
      <button onClick={addRow} className="p-2 px-3 rounded-lg shadow-sp hover:bg-red-400 text-black hover:text-white font-medium">
        Add row
      </button>
      <button onClick={()=> addColumn(prompt("Enter column Name"))} className="shadow-sp hover:bg-red-400 p-2 px-3 rounded-lg text-black opacity-[0.8] hover:text-white font-medium">
        Add Column 
      </button>
      
      
    </div>
    
            <div className="w-full">
       <textarea
       type="text"
       value={tableTitle}
       onChange={onTitleChange}
       placeholder="Title"
       className="bg-gray-300 shadow-sp w-full h-[3.2rem] p-3  focus:bg-white outline-0 focus:border-light focus:border-2 rounded-sm focus:text-light  font-bold  rounded-lg "
       
       />
      </div>
    {/*table*/}
    <div style={{height:"calc(100% - 13rem)"}} className="cardSroll scroll  w-full  overflow-scroll relative">
    

   
     <table className="tableNoteType">
      <thead>
       <tr>
       <th className="sticky top-0">S/N</th>
         {
           columns.map((column,index)=> (
            <th className="sticky top-0 " key={index}>
            
               {column}
              <button  className="opacity-[0.6] absolute top-0 right-0 p-1"
              onClick={()=> predelete(column,"column")}>
                 <MdDelete size={23}/>
              </button>
            </th>
           ))
         }
        <th className="sticky top-0"></th>
       </tr>
      </thead>
      <tbody>
        {
          rowData.map((row,index)=> (
           <tr key={index}>
           <td>
             <textarea
               disabled
               value = {index + 1}
               className="w-[5rem]"
              />
           </td>
             {
               columns.map(column=> (
                 <td key={`index-${column}`}>
                   <textarea
                     type="text"
                     
                     value={row[column]}
                     onChange={(e)=> updateCell(index,column,e.target.value) }
                     className="w-[15rem]"
                     
                   />
                 </td>
               ))
             }
             <td className="">
              <button onClick={()=> predelete(index,"row",)} className=" shadow-sp hover:bg-red-500 hover:text-white w-[2rem] rounded  h-[2rem] mt-[-2rem] ml-[-0.1rem] flex justify-center items-center text-dark"><MdDelete size={20} className="shadow-2xl"/></button>
             </td>
           </tr>
          ))
        }
      </tbody>
     </table>
  
    </div>
    
      <div className="w-full flex justify-end ">
      <button disabled={!valid} onClick={AddNewNote} className={`${valid ? "bg-red-400 hover:bg-red-400  text-white" : "gray-300 text-200 shadow-sp"} p-2 mt-2 px-3  rounded-lg `}>
                                   {!isLoading ? " Done" :
               <Spinner radius={30} color={"#fff"} stroke={4} visible={true} />
             }
         </button>
        </div>
    </>
    
    )
}


export default Table;