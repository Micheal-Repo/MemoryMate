import react,{useState,useEffect} from "react"
import "./style.css"

//library
import Spinner from 'react-spinner-material';
import {useParams,useNavigate} from "react-router-dom"
import {useSelector} from "react-redux"
import { toast } from 'react-toastify';

//icons
import {MdDelete} from "react-icons/md"

//components
import {useUpdateNoteMutation} from "../noteApiSlice"


const Table =({
  note,
  tableTitle,
  setTableTitle,
  columns,
  setColumns,
  rowData,
  setRowData
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
  // const [tableTitle,setTableTitle] = useState(note?.title)
  // const [columns,setColumns] = useState(note?.column)
  // const [rowData,setRowData] = useState(note?.row)
 
  
  //onChange
  const [changed,setChanged] = useState(false)
  //onTitleChange
  const onTitleChange =(e)=>{
    setTableTitle(e.target.value)
    setChanged(true)
  }
    
    //updateCell
    const updateCell =(index,column,value)=>{
      setRowData(prev => prev.map((row,i)=> i === index ? {...row,[column]:value} : row ))
      
      setChanged(true)
    }
    
    //AddRow
    const addRow = ()=>{
      const newRow = {};
      
      columns.forEach(col => (newRow[col]=""));
      
      setRowData(prev => [...prev,newRow])
      
      setChanged(true)
    }
  
    //AddColumn
    const addColumn = (columnName)=>{
      if(columnName){
      //col
      setColumns(prev => [...prev,columnName ]);
      
      //riw
      setRowData(prev => prev.map(row => ({...row,[columnName]:""})))
    }
    
    setChanged(true)
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
       
       setChanged(true)
    }
    
    //delete Row
    const deleteRow=()=>{
      setRowData(prev => prev.filter((row,index) => index !== data))
      
      setNotiOpen(false)
      
      setChanged(true)
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
     setChanged(true)
    }
    
   
  
 
 
 const valid = columns.length && rowData.length && tableTitle && changed
 
 const [updateNote,{
    data:noteData,
    isLoading,
    isSuccess,
    isError,
    error
  }]=useUpdateNoteMutation()
  
 const UpdateNote = async()=>{
    await updateNote({
      id : note?.id,
      title:tableTitle,
      column : columns,
      row: rowData,
      format:"table",
    })
 }
 
   
 useEffect(()=>{
  if(isSuccess){
    if(noteData?.success){
      toast.success(noteData?.message,{
        toastId:"editCard"
      });

      setChanged(false)
    }else{
      toast.error("something went wrong",{
        toastId:"cardeditWrong"
      })
    }
    
    }
  },[isSuccess])
  
  
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
    
          <div className={`${notiOpen ? "scale-100" : "scale-0 opacity-0" }  transition-all duration-500 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] max-sm:w-[20rem] w-[22rem] bg-dark rounded-lg z-40 shadow-2xl p-3 px-4 flex flex-col gap-3`}>
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
    <div className="mb-2 flex gap-2 ">
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
       className="bg-gray-300 shadow-sp w-full h-[3.2rem] p-3  focus:bg-white outline-0 focus:border-light focus:border-2 rounded-sm focus:text-light  font-medium rounded-lg text-[1.2rem]"
       
       />
      </div>
    {/*table*/}
    <div style={{height:"calc(100% - 10rem)"}} className="cardSroll scroll w-full  overflow-scroll relative ">
  
     <table className="tableNoteType ">
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
      <button disabled={!valid} onClick={UpdateNote} className={`${valid ? "bg-red-400 hover:bg-red-400  text-white" : "gray-300 text-200 shadow-sp"} p-2 mt-2 px-3  rounded-lg `}>
                                   {!isLoading ? "Save Changes" :
               <Spinner radius={30} color={"#fff"} stroke={4} visible={true} />
             }
         </button>
        </div>
    </>
    )
}


export default Table;