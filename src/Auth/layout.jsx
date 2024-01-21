import react,{useState} from "react"
import "../Css/auth.css"
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

//library 
import {Link,Outlet} from "react-router-dom"
import {Swiper, SwiperSlide} from "swiper/react"
import {Autoplay,Pagination,EffectFade, Navigation} from "swiper/modules"

//components
import {ImagesAuth} from "./helper/imageMap"

const AuthLayout =()=>{
  const [activeSlide,setActiveSlide] = useState("")
  
  return(
    <div className="overflow-auto AuthLayout relative">
    
  
    <Swiper 
    effect={"fade"}
    loop={true}
    autoplay={{
      delay:2500,
      disableOnInteraction:false
    }}
    pagination={{clickable:true}}
    modules={[Autoplay,Pagination,EffectFade, Navigation]}
    className=" w-full h-full flex justify-center items-center text-center">
    {ImagesAuth.map((img)=>(
      <SwiperSlide className=" flex justify-center items-center overflow-hidden">
        <div
        style={{
        backgroundImage:`linear-gradient(to bottom,rgba(7, 11, 43, 0.8), rgba(7, 11, 23, 0.8)),url(${img.image})`,
        backgroundSize:"cover",
        backgroundPosition:"center",
        }}
        className=" w-full h-full">
        </div>
      </SwiperSlide>
    ))}

    </Swiper>
    
     <div className=" py-6 overflow-auto absolute w-full h-full top-0 left-0 z-50 flex justify-center items-center">
     <div className=" overflow-auto max-md:w-[80%] w-[28rem] md:p-12 authBg  flex justify-center items-center  rounded-lg bg-color1 shadow-md border-2 border-gray-700 p-5 py-3">
    
       <Outlet/>
     </div>
     </div>
    
    
     
    </div>
    
    )
}


export default AuthLayout;