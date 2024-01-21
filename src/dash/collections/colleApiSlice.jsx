import {createSelector, createEntityAdapter} from "@reduxjs/toolkit"
import {ApiSlice} from "../../features/apiSlice"


const colleAdapter = createEntityAdapter({})

const initialState = colleAdapter.getInitialState()

export const colleApiSlice = ApiSlice.injectEndpoints({
   endpoints:builder =>({
     
     getColles :builder.query({
       query:() =>({
         url:`/dash/colle`,
         validateStatus:(response,result)=>{
           return response.status === 200 && !result.isError
         },
       }),
       transformResponse:responseData =>{
         const loadedCollections = responseData.map(colle => {
           colle.id = colle._id
           return colle
         });
         
        return colleAdapter.setAll(initialState,loadedCollections)
       },
       providesTags:(result,error,arg)=>{
         if(result?.ids){
            return [
              {type:"colles",id:"LIST"},
              ...result.ids.map(id => (
                {type:"colles",id}
             ))
           ]
         }else return [{type:"colles",id:"LIST"}]
         
       },
       
     }),
     
     addColle:builder.mutation({
       query: body =>({
         url:"/dash/colle",
         method:"POST",
         body: body
       }),
       invalidatesTags:(result,error,arg)=> [
           {type:"colles",id:"LIST"}
         ]
     }),
     updateColle:builder.mutation({
       query: body =>({
         url:"/dash/colle",
         method:"PUT",
         body: body
       }),
       invalidatesTags:(result,error,arg)=> [
           {type:"colles",id:"LIST"}
         ]
     }),
     deleteColle:builder.mutation({
       query: body =>({
         url:"/dash/colle",
         method:"DELETE",
         body: body
       }),
       invalidatesTags:(result,error,arg)=> [
           {type:"colles",id:"LIST"}
         ]
     }),
     
   })
}) 



export const {
  useGetCollesQuery,
  useAddColleMutation,
  useUpdateColleMutation,
  useDeleteColleMutation,
} = colleApiSlice


// returns the query result object
export const selectCollesResult = colleApiSlice.endpoints.getColles.select()

// creates memoized selector
const selectCollesData = createSelector(
    selectCollesResult,
    selectCollesResult => selectCollesResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectColles,
    selectById: selectColleById,
    selectIds: selectColleIds
    // Pass in a selector that returns the notes slice of state
} = colleAdapter.getSelectors(state => selectCollesData(state) ?? initialState)