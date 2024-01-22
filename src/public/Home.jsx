 import react,{useState} from "react"
import {Link, useNavigate} from "react-router-dom"
import UseTitle from "../Accessories/useTitle"



const HomePage = () => {
  UseTitle("Memory-Mate | Ultimate note-taking Companion")
  
  const navigate = useNavigate()
  
  return (
    <div className="min-h-screen flex items-center justify-center text-white bg-dark">
      <div className="max-w-3xl p-6  shadow-md rounded-md bg-dark ">
        <h1 className="text-4xl font-bold mb-4 text-center text-white">
          Welcome to MemoryMate
        </h1>
        
        <div className="w-full grid place-content-center">
          <div className="border-2 border-red-300 w-[8rem] h-[8rem] overflow-hidden rounded-full"><img src="/memory.jpg" className="w-full h-full rounded-full"/></div>
        </div>
        
        <p className="mt-2 italic text-lg text-red-300 mb-8 text-center">
          Your Ultimate Note-Taking Companion!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature Cards */}
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-light p-4 rounded-md shadow-sp hover:shadow-lg transition duration-300"
            >
              <h2 className="text-xl font-semibold mb-2">{feature.title}</h2>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
        <div onClick={()=> navigate("auth/login")}  className="mt-8 text-center">
          <button className="bg-red-400 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-500 transition duration-300">
            Sign Up and Start Learning
          </button>
        </div>
      </div>
    </div>
  );
};

const features = [
  {
    id: 1,
    title: 'Effortless Note-Taking',
    description: 'Seamlessly jot down your thoughts, lecture summaries, and important details.',
  },
  {
    id: 2,
    title: 'Intelligent Organization',
    description: 'Categorize your notes by subjects, topics, or however you prefer, ensuring a structured and easy-to-access repository.',
  },
  {
    id: 3,
    title: 'Memory Enhancement',
    description: 'Leverage features that aid memory recall, helping you retain and remember crucial information effortlessly.',
  },
];

export default HomePage;