import react,{useState} from "react"
import Spinner from 'react-spinner-material';

const SpinnerLoading =({color})=>{
  
  
  return(
    <div className="w-full flex justify-center items-center py-2">
    <div className="p-2 bg-white shadow-sp rounded-full">
      <Spinner radius={30} color={color || "#3f0634"} stroke={4} visible={true} />
    </div>
    </div>
    
    )
}


export default SpinnerLoading;