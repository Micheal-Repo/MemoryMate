import react,{useState,useEffect} from "react"
import {store} from "../../features/store"

//ApiSlice
import {colleApiSlice} from "../../dash/collections/colleApiSlice"
import {cateApiSlice} from "../../dash/categories/cateApiSlice"
import {folderApiSlice} from "../../dash/folders/folderApiSlice"
import {noteApiSlice} from "../../dash/notes/noteApiSlice"

//library
import {Outlet} from "react-router-dom"

const Prefetch =()=>{
  
  useEffect(()=>{
    store.dispatch(colleApiSlice.util.prefetch("getColles","colleList",{force:true}))
    store.dispatch(cateApiSlice.util.prefetch("getCates","cateList",{force:true}))
    store.dispatch(folderApiSlice.util.prefetch("getFolders","folderList",{force:true}))
    store.dispatch(noteApiSlice.util.prefetch("getNotes","noteList",{force:true}))
  },[])
  
  return <Outlet/>
}


export default Prefetch;