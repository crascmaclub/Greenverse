import { useState } from "react";

function HomeScreen({ onStart }) {
  const [name, setName] = useState("");

  const handleStart = () => {
    if (name.trim() === "") return alert("Nhập tên của bạn trước nhé!");
    onStart(name);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-100 text-center">
      <h1 className="text-3xl font-bold mb-6 text-green-700">🌍 ECOHERO</h1>
      <p className="mb-4 text-gray-700">
        Trở thành anh hùng môi trường và cứu lấy Trái Đất!
      </p>

      <input
        type="text"
        placeholder="Nhập tên của bạn..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-2 border border-green-400 rounded-md mb-4 text-center"
      />

      <button
        onClick={handleStart}
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
      >
        Bắt đầu 🌱
      </button>
    </div>
  );
}

export default HomeScreen;
