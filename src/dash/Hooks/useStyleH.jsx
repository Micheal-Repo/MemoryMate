import react,{useState} from "react"


const useStyleH =(size)=>{
  const Style= {
    height :`calc(100% - ${size})`
  }
  
  return Style 
}


export default useStyleH;