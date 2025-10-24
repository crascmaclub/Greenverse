import { useState } from "react";

function HomeScreen({ onStart }) {
  const [name, setName] = useState("");

  const handleStart = () => {
    if (name.trim() === "") return alert("Nhập tên của bạn trước nhé!");
    onStart(name);
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center h-screen bg-[#f8f9ee] bg-contain bg-no-repeat bg-center"
      style={{
        backgroundImage: `url('/Enter name.png')`,
        imageRendering: "pixelated",
      }}
    >
      <input
        type="text"
        placeholder= "Enter name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="absolute top-[52%] w-[300px] h-[50px] text-center rounded-md text-lg font-[Press_Start_2P]
                   bg-[#a3e7b6]/90 border-4 border-green-700 focus:outline-none"
      />

      <button
        onClick={handleStart}
        className="absolute top-[65%] w-[200px] h-[50px] text-center text-green-900 font-[Press_Start_2P]
                   bg-gradient-to-b from-[#b9f074] to-[#87cf4a] border-4 border-green-700 rounded-md 
                   hover:scale-105 active:scale-95 transition"
      >
        PLAY
      </button>
    </div>
  );
}

export default HomeScreen;
