import {createSlice} from "@reduxjs/toolkit"

const initialState = {
  token : "",
  userInfo:{},
  colleIds:""
}

const MySlice = createSlice({
  name:"mySlice",
  initialState,
  reducers:{
    setToken :(state,action)=>{
      state.token = action.payload
    },
    
    setUserInfo :(state,action)=>{
      state.userInfo = action.payload
    },
    
    setColleIds :(state,action)=>{
      state.colleIds = action.payload
    },
    
    
  }
})


export const {
  setToken,
  setUserInfo,
  setColleIds
} = MySlice.actions

export default MySlice.reducer

export const selectToken =(state)=> state.mySlice.token
export const selectUserInfo =(state)=> state.mySlice.userInfo
export const selectColleIds =(state)=> state.mySlice.colleIds