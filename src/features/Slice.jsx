import {createSlice} from "@reduxjs/toolkit"

const initialState = {
  value:"welcom",
  
}

const MySlice = createSlice({
  name:"mySlice",
  initialState,
  reducers:{
    
  }
})


//export const { } = MySlice.actions

export default MySlice.reducer

//export const selectCurrentToken =(state)=> state.mySlice.token