import react,{useState,useEffect} from "react"

//library
import Spinner from 'react-spinner-material';
import {useParams,useNavigate} from "react-router-dom"
import {useSelector} from "react-redux"
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

//components
import {useAddNoteMutation} from "../noteApiSlice"
import {selectUserInfo} from "../../../features/Slice"


const Card =({
  setOpenAddNote,
    setNewNoteOpen,
})=>{
  
  const navigate = useNavigate()
  
  //ids
  const userInfo = useSelector(selectUserInfo)
  const {colleId} = useParams()
  const {cateId} = useParams()
  const {folderId} = useParams()
  
  //card data
  const [title,setTitle] = useState("")
  const [content,setContent] = useState("hello")
  const valid = title && content 
 
 
 //onChange evemt 
  const onTitleChange =(e)=>{
    setTitle(e.target.value)
  }
  
  const onContentChange =(value)=>{
    setContent(value)
  }
  
  //add new
  const [addNote,{
    data,
    isLoading,
    isSuccess,
    isError,
    error
  }]=useAddNoteMutation()
  
  //AddNewNote
  const AddNewNote =async()=>{
    
    if(folderId){
    await addNote({
      userId:userInfo.id,
      colleId,
      cateId,
      folderId,
      inFolder:true,
      format:"card",
      title,
      content,
    })
    }else{
    await addNote({
      userId:userInfo.id,
      colleId,
      cateId,
      inFolder:false,
      format:"card",
      title,
      content,
    })
    }
  }
  
  
     useEffect(()=>{
  if(isSuccess){
    if(data?.success){
      
      toast.success(data?.message,{
        toastId:"addNotewr"
      });
      setTitle(""),
      setContent("")
     setOpenAddNote(false)
    setNewNoteOpen(false)
      
    }else{
      toast.error("something went wrong",{
        toastId:"CateWrong"
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
  
   //react quill
 const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video',
    'color', // Include color format
  ];
  
  const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote'],

  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent


  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],

  ['clean']                                         // remove formatting button
];

  
  const modules = {
    toolbar:toolbarOptions
  };
  
// const isLoading=true 
  return(
    <div style={{height:"calc(100% - 3rem)"}}  className="h-full ">
    
       <div>
         <textarea
         value={title}
         placeholder="Title"
         row="2"
         onChange={onTitleChange}
         className="w-full bg-dark p-2 rounded-lg text-white font-bold h-[3.5rem] focus:bg-white focus:text-dark outline-dark text-[1.2rem]"
         />
       </div>
       
       
        {/* <textarea
         style={{height:"calc(100% - 7.5rem)"}} 
         placeholder="content"
         value={content}
         onChange={onContentChange}
         className="text-black shadow-sp cardSroll scroll w-full bg-gray-200 p-3 rounded-lg   h-[4rem] focus:bg-white outline-8 outline-dark"
         />*/}
      <ReactQuill 
      theme="snow" 
      modules={modules}
      formats={formats}
      value={content}
      onChange={onContentChange}
      placeholder="content"
      className="h-[17.5rem] mb-[6.2rem]"
      />
      <div className="w-full flex justify-end">
         <button disabled={!valid}  onClick={AddNewNote} className={`${ valid ? "text-white bg-red-400 " : "shadow-sp text-black"} p-2 px-3  shadow-sp rounded-lg font-bold text-right  transition duration-200`}>
             {!isLoading ? " Done" :
               <Spinner radius={30} color={"#fff"} stroke={4} visible={true} />
             }
              </button>
      </div>
    </div>
    
    )
}


export default Card;