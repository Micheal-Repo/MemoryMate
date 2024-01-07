import react,{useState} from "react"
import "./style.css"

//icons
import {MdDelete} from "react-icons/md"

const Table =()=>{
  
  //alert
  const [notiOpen,setNotiOpen]=useState(false)
  
  const [title,setTitle]=useState("column")
  
  //row or column id that is about to be deleted 
  const [data,setData]=useState("")
  
  //info of the row or column to be deleted 
  const [tableinfo,setTableInfo]=useState("")
  
  //column 
  const [columns,setColumns] = useState(["name","age"])
  
  //rows
  const [rowData,setRowData] = useState([
    {name:"chimaobinsjshshhshjejshshhshshhshhjshsjhsjjss",age:"24"},
    {name:"micheal",age:"27"},
    {name:"david",age:"28"},
    ])
    
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
      setColumns(prev => [...prev,columnName ]);
      
      //riw
      setRowData(prev => prev.map(row => ({...row,[columnName]:""})))
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
    
   
  
  return(
    <>
    {/*notification*/}
          <div className={`${notiOpen ? "scale-100" : "scale-0" } transition-all duration-200 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] max-sm:w-[20rem] w-[22rem] h-[13rem] bg-dark rounded-lg z-40 shadow-2xl p-3 px-4 flex flex-col gap-3`}>
              <p className="text-[1.5rem] font-semibold text-red-400 underline-offset-4 underline">
                Warning
              </p>
              
              <p className="font-medium text-white italic text-center">You about to delete this entire {title} 
              <p className="block bg-light p-1 w-[12rem] h-[2rem] rounded-lg overflow-auto m-auto my-1">
              {tableinfo}
              </p>
             
              this action can not be undone</p>
              
              <div className=" flex gap-2 justify-between items-center">
                <button onClick={()=> setNotiOpen(false)} className="p-1 px-2 bg-red-300 rounded-md hover:bg-red-400 font-medium text-white">cancel</button>
                
                { title === "row"  &&
                <button onClick={deleteRow} className="p-1 px-2 bg-red-300 rounded-md hover:bg-red-400 font-medium text-white">delete</button>
                }
                { title === "column"  &&
                <button onClick={deleteColumn} className="p-1 px-2 bg-red-300 rounded-md hover:bg-red-400 font-medium text-white">delete</button>
                }
              </div>
          </div>

{/*Add*/}
    <div className="mb-2 flex gap-2">
      <button onClick={addRow} className="p-2 px-3 rounded-lg bg-red-400 hover:bg-red-500 text-white font-medium">
        Add row
      </button>
      <button onClick={()=> addColumn(prompt("Enter column Name"))} className="bg-red-400 hover:bg-red-500 p-2 px-3 rounded-lg bg-light opacity-[0.8] text-white font-medium">
        Add Column 
      </button>
      
      
    </div>
    
    {/*table*/}
    <div style={{height:"calc(100% - 6rem)"}} className="tableNote w-full  overflow-scroll relative">
    

   
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
                     row={1}
                     value={row[column]}
                     onChange={(e)=> updateCell(index,column,e.target.value) }
                     className="w-[15rem] "
                     
                   />
                 </td>
               ))
             }
             <td className="">
              <button onClick={()=> predelete(index,"row",)} className=" bg-red-400 hover:bg-red-500 w-[2rem] rounded  h-[2rem] mt-[-2rem] ml-[-0.1rem] flex justify-center items-center text-white"><MdDelete size={20} className="shadow-2xl"/></button>
             </td>
           </tr>
          ))
        }
      </tbody>
     </table>
  
    </div>
    
      <div className="w-full flex justify-end ">
      <button className="p-2 mt-2 px-3 bg-red-400 hover:bg-red-500 rounded-lg text-white">
          Save
          Changes
         </button>
        </div>
    </>
    
    )
}


export default Table;