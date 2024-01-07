import react,{useState} from "react"


const List =({collections})=>{
  
  let content;
  content =collections.map((collection,index)=>(
              <tr className="list ">
            <td>{index + 1}</td>
            <td>{collection.title}</td>
            <td>20</td>
            <td>23</td>
            <td>14</td>
            <td>15 minutes</td>
          </tr>
    ))
  
  return(
    
      <table className="bg-amber-100 text-left w-full">
        <thead className="w-full">
          <tr className="hover:bg-light list bg-light text-white ">
            <th>S/N</th>
            <th>Title</th>
            <th>Categories</th>
            <th>Folders</th>
            <th>Notes</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
           {content}
        </tbody>
      </table>
      
    
    
    )
}


export default List;