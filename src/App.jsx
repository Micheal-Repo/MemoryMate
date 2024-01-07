import { useState } from 'react'


//library
import {Routes,Route,Link} from "react-router-dom"

//Auth
import {
  Register,
  Login,
  AuthLayout,
  Recover,
  VerifyEmail ,
  Reset,
  VerifyEmailPwd
} from "./Auth/index"

//Dash
import {
  DashLayout,
  NotesFolders,
  //collection 
  Collection,
  //categories 
  Category,
  NoFile,
  //notes
  Notes
} from "./dash/index"

function App() {
 

  return (
    <main className="App">
        <Routes>
        {/*Auth*/}
          <Route path="/" element={<AuthLayout/>}>
            <Route index element={<Login/>}/>
            <Route path="register" element={<Register/>}/>
            <Route path="recover" element={<Recover/>}/>
            <Route path="verify-email" element={<VerifyEmail/>}/>
            <Route path="reset" element={<Reset/>}/>
            <Route path="verify-email-pwd" element={<VerifyEmailPwd/>}/>
          </Route>
          
          

        {/*Dash*/} 
        <Route path="/dash" element={<DashLayout/>}>
          <Route index element={<Collection/>}/>
          
        {/*Category*/} 
          <Route path="collection/:colleId" element={<Category/>}>
              <Route index element={<NoFile/>}/>
              <Route path="notes/:cateId" element={<NotesFolders/>}/>
          </Route>
        {/*end of Category*/} 
          
        </Route>
        {/*end of dash*/} 
        
        </Routes>
    </main>
  )
}

export default App
