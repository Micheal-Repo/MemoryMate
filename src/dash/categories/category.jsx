import react,{useState} from "react"

//library 
import {Outlet,useParams} from "react-router-dom"
import OutsideClickHandler from 'react-outside-click-handler';
import Spinner from 'react-spinner-material';

//components 
import {useGetCollesQuery} from "../collections/colleApiSlice"
import {useGetCatesQuery} from "./cateApiSlice"
import { toast } from 'react-toastify';
import {useSelector,useDispatch} from "react-redux"

//icons
import {MdAdd,MdClose} from "react-icons/md"
import {FaListUl,FaSearch} from "react-icons/fa"
import {BsFillGrid3X3GapFill,BsBriefcaseFill} from "react-icons/bs"
import {IoIosArrowDown,IoIosArrowUp} from "react-icons/io"
import {HiDotsVertical} from "react-icons/hi"

//components
import EachCategory from "./eachCategory"
import NewCategory from "./newCategory"
import EditCategory from "./editCategory"
import DeleteCategory from "./deleteCategory"



const Category =()=>{
  
      //search 
  const [search,setSearch] = useState("")
  
  const onSearch = (e)=>{
    setSearch(e.target.value)
  }
  
  const closeSearch=()=>{
    setSearch("")
  }
  
  
  
  const {colleId} = useParams()
  const {cateId} = useParams()
  
  //Colles
  const {colle} = useGetCollesQuery("colleList",{
      selectFromResult:({data})=>({
        colle: data?.entities[colleId]
      })
    })
 //cate   
  const {cate} = useGetCatesQuery("cateList",{
      selectFromResult:({data})=>({
        cate: data?.entities[cateId]
      })
    })
  
  //edit categories
  const [editCategoryOpen,setEditCategoryOpen] =useState(false)
  const [editCategoryName,setEditCategoryName] =useState("")
  const [editCategoryId,setEditCategoryId] =useState("")
  
  //deleteCategory
  const [deleteCategoryOpen,setdeleteCategoryOpen] = useState(false)
  const [deleteCategoryName,setdeleteCategoryName] = useState("")
  const [deleteCategoryId,setdeleteCategoryId] =useState("")
  
  //category droped
  const [isDroped,setIsDroped] = useState(false)
  //categories option index
  const [Option,setOption] = useState("")
  const [newCategoryOpen,setNewCategoryOpen] = useState(false)
  
    //useGetCatesQuery
    const {
    data,
    isLoading,
    isSuccess,
    isError,
    error
  }=useGetCatesQuery("cateList",{
    // pollingInterval:15000,
    // refetchOnFocus:true,
    // refetchOnMountOrArgChange:true
  })
  
 let content;

 
 if(!isLoading){
    content = <div className="w-full grid place-content-center">

    <div className="p-2 bg-light shadow-sp rounded-full w-fit">
      <Spinner radius={30} color={"#fff"} stroke={4} visible={true} />
    </div>
    </div>
  
 }
 
 //const [cateNo,setCateNo] = useState("0")
 let cateNo = 0
 const SetCateNo=(length)=>{
   //setCateNo(length)
   //alert(length)
   cateNo = length
 }
 
   
  if(isSuccess){
      const {ids,entities} = data;
      
    if(ids?.length){
      
   const filteredIds = ids.filter(cateId => entities[cateId].colleId === colleId)
   
   if(filteredIds?.length){   
      SetCateNo(filteredIds?.length)
      
     const searchFilter = !search ? filteredIds : filteredIds.filter(id => entities[id]?.title.toLowerCase().includes(search.toLowerCase())) 
    
    if(searchFilter?.length){
    content = searchFilter.map(CateId => 
       <EachCategory 
       CateId={CateId}
       setIsDroped={setIsDroped} 
       Option={Option}
       setOption={setOption}
       
       setEditCategoryOpen={setEditCategoryOpen}
       setEditCategoryName={setEditCategoryName}
       setEditCategoryId={setEditCategoryId}
       
       setdeleteCategoryOpen={setdeleteCategoryOpen}
       setdeleteCategoryName={setdeleteCategoryName}
       setdeleteCategoryId={setdeleteCategoryId}
       />
    )
    }else{
      content=<p className="w-full text-center text-gray-500 font-bold italic">No search result</p>
    }
   }else{
     content=<p className="w-full text-center text-gray-500 font-bold italic">No category</p>
   }
       
   
    }
  }
 
    if(isError){
    if(error?.data?.myError){
      toast.error(error?.data?.message,{
        toastId:"myError"
      })

    }else if(error?.status === "FETCH_ERROR"){
       
      toast.error("No internet connection",{toastId:"internetCateGet"})
    }else if(error?.data?.notFound){
      content=<p className="w-full text-center text-gray-500 font-bold italic">No category</p>
    }else if(error?.data?.jwtError ){
     navigate("/auth/login",{replace:true})
     localStorage.removeItem("loggedIn")
     
   }else{
     
     toast.error("something went wrong",{toastId:"cateGetWrong"})
    }
    }
  
  
  const handleClick=()=>{
    setIsDroped(!isDroped)
  }
  
  return(
    <>
    <NewCategory
      newCategoryOpen={newCategoryOpen}
      setNewCategoryOpen={setNewCategoryOpen}
    />
    
    <EditCategory
    editCategoryOpen = {editCategoryOpen}
  setEditCategoryOpen={setEditCategoryOpen}
  editCategoryName={editCategoryName}
  setEditCategoryName={setEditCategoryName}
  editCategoryId={editCategoryId}
  setEditCategoryId={setEditCategoryId}
    />
    
    <DeleteCategory
    deleteCategoryOpen={deleteCategoryOpen}
    setdeleteCategoryOpen={setdeleteCategoryOpen}
    deleteCategoryName={deleteCategoryName}
    setdeleteCategoryName={setdeleteCategoryName}
    deleteCategoryId={deleteCategoryId}
    setdeleteCategoryId={setdeleteCategoryId}
    />
    
    <div className="h-full w-full wrapper2">
    
      
 {/*First Part*/}
    {/*left*/}
      <div className=" w-full md:pt-[2rem] pt-[0.8rem] pb-[0.5rem] border-b-[2px] border-light px-2 flex justify-between items-end overflow-auto">
          <div className="flex flex-col   pr-2">
             <p className="italic max-md:text-[1rem] font-bold text-[1.2rem]">{colle?.title ? colle?.title :
               <span className="text-gray-400">collection</span>
             }</p>
          </div>
          
    {/*right*/}
          <div>

          </div>
          </div>
          
           {/*2nd Part*/}
          <div className="w-full  py-3 max-sm:py-2 relative">
            <div className="p-2 px-3 bg-light rounded-lg w-[11rem] md:w-[15rem] flex text-white justify-between items-center gap-2"
            
            >
              <p className="italic w-[10rem] md:w-[12rem] overflow-auto"
             onClick={handleClick} >{cate?.title ? 
             <input
             disabled 
             value={cate?.title} 
             className="bg-transparent"
             />
             : <span className="text-gray-400">Categories</span>}</p>
              <IoIosArrowUp 
              onClick={handleClick}
              className={`transition-all duration-200 ${isDroped && "rotate-180"}`} size={25}/>
            </div>
           
           {/*categories*/} 
           <OutsideClickHandler onOutsideClick={()=> setIsDroped(false)}>
          <div className="absolute top-[3.5rem] left-0 z-20 ">
              <div className={`shadow-md  border-gray-100 transition-all duration-200 rounded-2xl  ${isDroped ? "p-3 w-[15rem] md:w-[18rem] h-[30rem] max-md:h-[26rem]" : "w-[10rem] md:w-[15rem] h-0"} bg-dark  overflow-scroll`}>
              
               {/*search*/} 
              <div className="w-full p-2 rounded-lg bg-white flex gap-2 items-center">
               { !search ? <FaSearch size={20} className="text-gray-400"/>
               :
                <MdClose onClick={closeSearch} size={25} className="text-gray-400"/>
               }
                <input 
                value={search}
                onChange={onSearch}
                placeholder="search categories"
                className="outline-0 w-full h-full"
                />
              </div>
              
                {/*Total*/} 
              <div className="w-full py-2 font-bold text-white flex justify-between items-center">
               <p className="text-red-400">Total: {cateNo}</p>
                <p onClick={()=> setNewCategoryOpen(true)} className="font-bold bg-red-400 text-dark rounded-lg px-2 py-1 hover:bg-"> 
                <MdAdd size={26}/>
               
                </p>
              </div>
              
               {/*list of Category*/} 
             <div style={{height:"calc(100% - 6rem)"}} className="scroll w-full flex flex-col  pr-1  overflow-y-scroll rounded-lg">
               

             
                
                {content}
                
              

                
              
             </div>
          </div>
        </div>
          </OutsideClickHandler>
        </div>
      
      
        {/*3rd Part*/}
        
         <Outlet/>
        
    
    </div>
    </>
    
    )
}


export default Category;