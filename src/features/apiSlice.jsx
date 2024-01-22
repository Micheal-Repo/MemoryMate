import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {setToken} from "./Slice"
import {useNavigate} from "react-router-dom"




const baseQuery = fetchBaseQuery({ 
  baseUrl: "https://memorymate-api.onrender.com",
  credentials:"include",
  prepareHeaders:(headers,{getState})=>{
    
    const token = getState().mySlice.token
    
    if(token){
      headers.set("authorization",`Bearer ${token}`)
    }
    return headers
  },
  
})


const baseQueryReAuth =async(args,api,extraOptions)=>{
  
  let result = await baseQuery(args,api,extraOptions)
  
  if(result?.error?.data?.AccessError){
    
    //sending refresh token
    const refreshResult = await baseQuery("auth/refresh",api,extraOptions)
    
    if(refreshResult?.data?.success){
      //store accessToken
      api.dispatch(setToken(refreshResult?.data?.accessToken))
      
      //retry original request
      const resultRetry = await baseQuery(args,api,extraOptions)
      
      
      return resultRetry
    }else if(refreshResult?.error?.data?.jwtError){
        
        return refreshResult
    }
    
    
    }
  
  
  return result
  
}

export const ApiSlice = createApi({
  reducerPath: 'ApiSlice',
  baseQuery:baseQueryReAuth,
  tagTypes:["colles","cates","folders","notes"],
  endpoints: (builder) => ({}),
  });

