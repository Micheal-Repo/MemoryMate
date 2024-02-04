import { useState,useEffect } from 'react'


//library
import {Routes,Route,Link} from "react-router-dom"
import { ToastContainer, toast ,Zoom} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Auth
import {
  Register,
  Login,
  AuthLayout,
  Recover,
  VerifyEmail ,
  Reset,
  VerifyEmailPwd,
  
  TokenAuth,
  Prefetch
} from "./Auth/index"

//Dash
import {
  DashLayout,
  //collection 
  Collection,
  //categories 
  Category,
  NotesFolders,
  NoFile,
  //folders
  Folders,
  //notes
  Notes
} from "./dash/index"

import Testing from "./texting"
import Home from "./public/Home"
import NotFound from "./404"

function App() {
 

  return (
    <main className="App">
  
  <div className="max-sm:hidden w-screen h-screen grid place-content-center bg-dark text-[1.5rem] p-3 italic text-center text-white font-medium">
     Please this website can only be viewed on mobile devices 
  </div>
  
  <div className="sm:hidden">
    <ToastContainer
   position = "bottom-left"
   autoClose ={3000}
   theme= "light"
   newestOnTop={true}
   transition={Zoom}
   limit={3}
   rtl={false}
   pauseOnHover={true}
   />
    
        <Routes>
            <Route path="/" element={<Home/>}/>
        {/*Auth*/}
          <Route path="/auth" element={<AuthLayout/>}>
            <Route path="login" element={<Login/>}/>
            <Route path="register" element={<Register/>}/>
            <Route path="recover" element={<Recover/>}/>
            <Route path="verify-email" element={<VerifyEmail/>}/>
            <Route path="reset" element={<Reset/>}/>
            <Route path="verify-email-pwd" element={<VerifyEmailPwd/>}/>
            <Route path="testing" element={<Testing/>}/>
          </Route>
          
          

        {/*Dash*/} 
        {/*protected*/}
        <Route element={<TokenAuth/>}>
        <Route element={<Prefetch/>}>
        <Route path="/dash" element={<DashLayout/>}>
          <Route index element={<Collection/>}/>
          
        {/*Category*/} 
          <Route path="collection/:colleId" element={<Category/>}>
              <Route index element={<NoFile/>}/>
              {/*folder / notes*/}
              <Route path="notes/:cateId" element={<NotesFolders/>}>
              {/*folders*/}
                <Route path="" element={<Folders/>}>
                
               <Route path="notes/:folderId" element={<Notes/>}/>
            
                </Route>
             </Route>
              {/*end of folders*/}
          </Route>
        {/*end of Category*/} 
          
        </Route>
        </Route>
        </Route>
        {/*end of dash*/} 
          <Route path="*" element={<NotFound/>}/>
        </Routes>
    </div>
    </main>
  )
}

export default App
