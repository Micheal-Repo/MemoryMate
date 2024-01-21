import {createSelector, createEntityAdapter} from "@reduxjs/toolkit"
import {ApiSlice} from "../../features/apiSlice"


const cateAdapter = createEntityAdapter({})

const initialState = cateAdapter.getInitialState()

export const cateApiSlice = ApiSlice.injectEndpoints({
   endpoints:builder =>({
     
     getCates :builder.query({
       query:() =>({
         url:`/dash/cate`,
         validateStatus:(response,result)=>{
           return response.status === 200 && !result.isError
         },
       }),
       transformResponse:responseData =>{
         const loadedCategories = responseData.map(cate => {
           cate.id = cate._id
           return cate
         });
         
        return cateAdapter.setAll(initialState,loadedCategories)
       },
       providesTags:(result,error,arg)=>{
         if(result?.ids){
            return [
              {type:"cates",id:"LIST"},
              ...result.ids.map(id => (
                {type:"cates",id}
             ))
           ]
         }else return [{type:"cates",id:"LIST"}]
         
       },
       
     }),
     
     addCate:builder.mutation({
       query: body =>({
         url:"/dash/cate",
         method:"POST",
         body: body
       }),
       invalidatesTags:(result,error,arg)=> [
           {type:"cates",id:"LIST"}
         ]
     }),
     updateCate:builder.mutation({
       query: body =>({
         url:"/dash/cate",
         method:"PUT",
         body: body
       }),
       invalidatesTags:(result,error,arg)=> [
           {type:"cates",id:"LIST"}
         ]
     }),
     deleteCate:builder.mutation({
       query: body =>({
         url:"/dash/cate",
         method:"DELETE",
         body: body
       }),
       invalidatesTags:(result,error,arg)=> [
           {type:"cates",id:"LIST"}
         ]
     }),
     
   })
}) 



export const {
  useGetCatesQuery,
  useAddCateMutation,
  useUpdateCateMutation,
  useDeleteCateMutation,
} = cateApiSlice


// returns the query result object
export const selectCatesResult = cateApiSlice.endpoints.getCates.select()

// creates memoized selector
const selectCatesData = createSelector(
    selectCatesResult,
    selectCatesResult => selectCatesResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectCates,
    selectById: selectCateById,
    selectIds: selectCateIds
    // Pass in a selector that returns the notes slice of state
} = cateAdapter.getSelectors(state => selectCatesData(state) ?? initialState)