import react,{useState} from "react"

//icons
import {MdDelete} from "react-icons/md"
import {IoMdEye} from "react-icons/io"
import {GoStarFill,GoStar} from "react-icons/go"
import {formatDistanceToNow,formatDistanceToNowStrict} from "date-fns"

//components
import ViewNote from "./notePop/viewNote"
import Card from "./noteType/Card"
import List from "./noteType/list"
import Table from "./noteType/Table"
import {useGetNotesQuery} from "./noteApiSlice"
import DeleteNote from "./deleteNote"

const Note =({
  type,
  noteId
})=>{
  //note
  const {note} = useGetNotesQuery("noteList",{
    selectFromResult:({data})=>({
      note:data?.entities[noteId]
    })
  })
  
  
  const [isPopOpen,setIsPopOpen] = useState(false)
  const [noteType,setNoteType] = useState(type)
  
  
  
  //states
  //card
  const [title,setTitle] = useState("")
  const [content,setContent] = useState("")
  
  //list
  const [listTitle,setListTitle] = useState("")
  const [listData,setListData] = useState([])
  
  //table
  const [tableTitle,setTableTitle] = useState(note?.title)
  const [columns,setColumns] = useState([])
  const [rowData,setRowData] = useState([])
  
  const openPop =()=>{
    
 if(note?.format === "card"){
       setTitle(note?.title)
       setContent(note?.content)
   
  }else if(note?.format === "list"){
       setListTitle(note?.title)
      setListData(note?.list)
    
  }else if(note?.format === "table"){
    setTableTitle(note?.title)
    setColumns(note?.column)
    setRowData(note?.row)
  }
    
    setIsPopOpen(true)
  }
  
  
  const closePop = ()=>{
    //alert("hell")
  setTitle("")
  setContent("")
  setListTitle("")
  setListData([])
  setTableTitle("")
  setColumns([])
  setRowData([])
  
  setIsPopOpen(false)
  } 
  
  //noteTyle
  let NoteFormat;
  if(note?.format === "card"){
    NoteFormat = <Card 
    note={note}
    title={title}
    setTitle={setTitle}
    content={content}
    setContent={setContent}
    />
    
  }else if(note?.format === "list"){
    NoteFormat = <List 
    note={note}
    listTitle={listTitle} 
    setListTitle={setListTitle} 
    listData={listData} 
    setListData={setListData} 
    />
    
  }else if(note?.format === "table"){
    NoteFormat = <Table 
    note={note}
    tableTitle={tableTitle} 
    setTableTitle={setTableTitle} 
    columns={columns} 
    setColumns={setColumns} 
    rowData={rowData} 
    setRowData={rowData} 
    />
  
  }
  
  const [favorite, setFavorite]=useState(false)
  
  const changeFavorite=()=>{
    setFavorite(prev => !prev)
  }
  
  
  //createdAt
  const CreatedAt = formatDistanceToNowStrict(new Date(note.createdAt),{addSuffix:true})
  
  
  //deleteNote
  const [deleteNoteOpen,setDeleteNoteOpen] = useState(false)
  const [noteTitle,setNoteTitle] = useState("")
  const [NoteId,setNoteId] = useState("")
  const [format,setFormat] = useState("")
  
  const preDelete =()=>{
    setDeleteNoteOpen(true)
    setNoteId(noteId)
    setNoteTitle(note?.title)
    setFormat(note?.format)
  }
  
  return(
    <>
    
    <DeleteNote
    deleteNoteOpen={deleteNoteOpen}
    setDeleteNoteOpen={setDeleteNoteOpen}
    
    noteTitle={noteTitle}
    setNoteTitle={setNoteTitle}
    
    noteId={NoteId}
    setNoteId={setNoteId}
    
    format={format}
    setFormat={setFormat}
    />
    
    <ViewNote isOpen={isPopOpen} onClose={closePop}>
      <div className="max-sm:w-[21.5rem] max-md:w-[25rem] w-[30rem] max-sm:h-[31.5rem] max-md:h-[34] h-[36rem] overflow-scroll p-1">
        {NoteFormat}
      </div>
    </ViewNote>
    <div className=" w-full rounded-lg h-[6.8rem] md:h-[8rem] bg-gray-100 text-dark max-sm:p-2 p-4 md:px-6  flex flex-col justify-between opacity-[0.9]  shadow-sp hover:opacity-[1]">
    {/*first part*/}
       <div className="w-full flex justify-between">
           <div style={{width:"calc(100% - 2rem)"}} className=" text-[1.5rem] md:text-[1.8rem] font-bold overflow-auto h-[3rem] md:h-[3.5rem] mb-3">
      { note.title.split("")?.length < 14 ? 
          note.title :
         `${note.title.slice(0,14)}...`
      }
       </div>
        <p className="font-medium  opacity-[0.7] md:text-[1.3rem]">{note?.format}</p>
       </div>
       
    {/*2nd part*/}

       
    {/*3rd part*/}
       <div className="w-full h-[2rem] flex justify-between items-center">
          <div className="flex justify-center items-center rounded-md shadow-sp overflow-hidden">
           <span onClick={openPop} className="flex justify-center items-center hover:bg-light w-[2rem] md:h-[2.3rem] md:w-[2.3rem] h-[2rem]  hover:text-white">
            <IoMdEye size={20} />
           </span>
           <span onClick={preDelete} className="flex justify-center items-center w-[2rem] md:h-[2.3rem] md:w-[2.3rem] h-[2rem] hover:bg-light hover:text-white">
            <MdDelete size={20}/>
           </span>
         {!favorite ? <span onClick={changeFavorite} className="flex justify-center items-center  w-[2rem] md:h-[2.3rem] md:w-[2.3rem] h-[2rem]  ">
            <GoStar size={20}/>
           </span>
           :
           <span onClick={changeFavorite}  className="flex justify-center items-center rounded-md w-[2rem] md:h-[2.3rem] md:w-[2.3rem] h-[2rem]">
            <GoStarFill size={20}/>
           </span>
         }
          </div>
          
          <div className="w-[9rem] text-right overflow-x-auto">
           <p className="font-medium opacity-[0.7] ">{CreatedAt}</p>
          </div>
       </div>
       
    </div>
    </>
    )
}


export default Note;