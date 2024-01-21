  <div className=" w-full wrapper2 overflow-auto">
    <NewCollection
      newCollectionOpen={newCollectionOpen}
     setNewCollectionOpen={setNewCollectionOpen}
     setCollections={setCollections}
    />
    {/*First Part*/}
    {/*left*/}
      <div className="pt-[2rem] pb-[0.5rem] border-b-[2px] border-light px-2 flex justify-between items-end ">

      
          <div className="">
             <p className="max-md:text-[1rem] text-[1.2rem]">Collections
             <br/>
           
             </p>
          </div>
          
    {/*right*/}
          <div>
            <button className="p-1 px-4 bg-light text-white rounded-xl">
            
              <p onClick={()=> setNewCollectionOpen(true)} className="md:hidden flex justify-center items-center gap-1 py-1"> 
                <MdAdd size={23}/>
                <span>create</span>
              </p>
              
              <p className="max-md:hidden flex justify-center items-center gap-1">
              <MdAdd size={23}/>  
              <span>Add new collection </span>
              </p>
              
            </button>
          </div>
      </div>
      
          {/*2nd Part*/}
          {/*left*/}
      <div className="flex justify-between items-center p-3 md:px-8 py-4">
        <div className="flex justify-center items-center gap-2 sm:gap-4">
         <span className={`p-1 rounded-md border-[2px] ${ !isGrid && "border-primary"}`}> 
           <FaListUl 
           size={23} 
           onClick={()=> handleChangeView(false)}/>
         </span> 
         
         <span className={`p-1 rounded-md border-[2px] ${ isGrid && "border-primary"}`}> 
          <BsFillGrid3X3GapFill 
          size={23}
          onClick={()=> handleChangeView(true)}/>
         </span> 
       </div>
       
          {/*right*/}
       <div>
         <p>Total Collection : {length}</p>
       </div>
       
      </div>
      
          {/*3rd Part*/}
      
      <div className=" scroll collection overflow-y-scroll  rounded ">
         
      </div>
      
    </div>