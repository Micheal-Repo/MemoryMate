import {createSelector, createEntityAdapter} from "@reduxjs/toolkit"
import {ApiSlice} from "../../features/apiSlice"


//const noteAdapter = createEntityAdapter({})

const noteAdapter = createEntityAdapter({
  sortComparer: (a, b) => {
    // Assuming createdAt is a valid date string or timestamp
    const timeA = new Date(a.createdAt).getTime();
    const timeB = new Date(b.createdAt).getTime();

    // Sort in descending order based on createdAt
    return timeA - timeB;
  },
});


const initialState = noteAdapter.getInitialState()

export const noteApiSlice = ApiSlice.injectEndpoints({
   endpoints:builder =>({
     
     getNotes :builder.query({
       query:() =>({
         url:"/dash/note",
        validateStatus:(response,result)=>{
          return response.status === 200 && !result.isError
        },
       }),
       transformResponse:responseData =>{
         const loadedNotes = responseData.map(note => {
           note.id = note._id
           return note
         });
         
        return noteAdapter.setAll(initialState,loadedNotes)
       },
       providesTags:(result,error,arg)=>{
         if(result?.ids){
            return [
              {type:"notes",id:"LIST"},
              ...result.ids.map(id => (
                {type:"notes",id}
             ))
           ]
         }else return [{type:"notes",id:"LIST"}]
         
       },
       
     }),
     
     addNote:builder.mutation({
       query: body =>({
         url:"/dash/note",
         method:"POST",
         body: body
       }),
       invalidatesTags:(result,error,arg)=> [
           {type:"notes",id:"LIST"}
         ]
     }),
     updateNote:builder.mutation({
       query: body =>({
         url:"/dash/note",
         method:"PUT",
         body: body
       }),
       invalidatesTags:(result,error,arg)=> [
           {type:"notes",id:"LIST"}
         ]
     }),
     deleteNote:builder.mutation({
       query: body =>({
         url:"/dash/note",
         method:"DELETE",
         body: body
       }),
       invalidatesTags:(result,error,arg)=> [
           {type:"notes",id:"LIST"}
         ]
     }),
     
   })
}) 



export const {
  useGetNotesQuery,
  useAddNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = noteApiSlice


// returns the query result object
export const selectNotesResult = noteApiSlice.endpoints.getNotes.select()

// creates memoized selector
const selectNotesData = createSelector(
    selectNotesResult,
    selectNotesResult => selectNotesResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectNotes,
    selectById: selectNoteById,
    selectIds: selectNoteIds
    // Pass in a selector that returns the notes slice of state
} = noteAdapter.getSelectors(state => selectNotesData(state) ?? initialState)