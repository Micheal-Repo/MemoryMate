import {createSelector, createEntityAdapter} from "@reduxjs/toolkit"
import {ApiSlice} from "../../features/apiSlice"


const folderAdapter = createEntityAdapter({})

const initialState = folderAdapter.getInitialState()

export const folderApiSlice = ApiSlice.injectEndpoints({
   endpoints:builder =>({
     
     getFolders :builder.query({
       query:() =>({
         url:"/dash/folder",
        validateStatus:(response,result)=>{
          return response.status === 200 && !result.isError
        },
       }),
       transformResponse:responseData =>{
         const loadedFolders = responseData.map(folder => {
           folder.id = folder._id
           return folder
         });
         
        return folderAdapter.setAll(initialState,loadedFolders)
       },
       providesTags:(result,error,arg)=>{
         if(result?.ids){
            return [
              {type:"folders",id:"LIST"},
              ...result.ids.map(id => (
                {type:"folders",id}
             ))
           ]
         }else return [{type:"folders",id:"LIST"}]
         
       },
       
     }),
     
     addFolder:builder.mutation({
       query: body =>({
         url:"/dash/folder",
         method:"POST",
         body: body
       }),
       invalidatesTags:(result,error,arg)=> [
           {type:"folders",id:"LIST"}
         ]
     }),
     updateFolder:builder.mutation({
       query: body =>({
         url:"/dash/folder",
         method:"PUT",
         body: body
       }),
       invalidatesTags:(result,error,arg)=> [
           {type:"folders",id:"LIST"}
         ]
     }),
     deleteFolder:builder.mutation({
       query: body =>({
         url:"/dash/folder",
         method:"DELETE",
         body: body
       }),
       invalidatesTags:(result,error,arg)=> [
           {type:"folders",id:"LIST"}
         ]
     }),
     
   })
}) 



export const {
  useGetFoldersQuery,
  useAddFolderMutation,
  useUpdateFolderMutation,
  useDeleteFolderMutation,
} = folderApiSlice


// returns the query result object
export const selectFoldersResult = folderApiSlice.endpoints.getFolders.select()

// creates memoized selector
const selectFoldersData = createSelector(
    selectFoldersResult,
    selectFoldersResult => selectFoldersResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectFolders,
    selectById: selectFolderById,
    selectIds: selectFolderIds
    // Pass in a selector that returns the notes slice of state
} = folderAdapter.getSelectors(state => selectFoldersData(state) ?? initialState)