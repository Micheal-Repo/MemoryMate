import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import {ApiSlice } from './apiSlice'
import MySlice from './Slice'

export const store = configureStore({
  reducer: {

    [ApiSlice.reducerPath]: ApiSlice.reducer,
    mySlice : MySlice
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ApiSlice.middleware),
  
  devTools: false
})


setupListeners(store.dispatch)