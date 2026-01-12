import { useEffect, useState } from "react";

function ResultScreen({ score, total, onRestart }) {
  const [message, setMessage] = useState("");
  const [tips, setTips] = useState([]);
  const [bgImage, setBgImage] = useState("/bg.png");

  useEffect(() => {
    const ratio = score / total;

    if (ratio === 1) {
      setMessage("Bạn thật sự là người sống xanh chính hiệu! 🌱");
      setBgImage("/winrial.png");
      setTips([
        "Tiếp tục lan tỏa tinh thần bảo vệ môi trường đến mọi người nhé!",
        "Thử thách bản thân bằng việc sống 'zero waste' trong 1 ngày 💪",
      ]);
    } else if (ratio >= 0.6) {
      setMessage("Bạn có ý thức bảo vệ môi trường, cố lên nhé!");
      setBgImage("/winrial.png");
      setTips([
        "Hãy thử mang túi vải khi đi chợ 🛍️",
        "Giảm sử dụng chai nhựa bằng cách dùng bình cá nhân!",
      ]);
    } else {
      setMessage("Hmm… Có vẻ bạn cần chú ý hơn đến môi trường rồi 😅");
      setBgImage("/loserial.png");
      setTips([
        "Đừng vứt rác bừa bãi, hãy phân loại rác đúng cách ♻️",
        "Tắt điện khi ra khỏi phòng để tiết kiệm năng lượng ⚡",
      ]);
    }
  }, [score, total]);

  return (
  <div
    className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center text-white"
    style={{ backgroundImage: `url(${bgImage})` }}
  >
    <div className="mt-56 left-10 relative z-10 text-center">
      <div className="flex items-center justify-center gap-3">
        <h3 className="text-6xl font-bold drop-shadow-md">Score:</h3>
        <span className="text-6xl font-bold text-white-300 drop-shadow-md">
          {score}/{total}
        </span>
      </div>
    </div>
    <div className="relative z-10 mt-32 text-center px-6 max-w-lg">
      <div className="bg-black/40 border border-white/30 px-6 py-4 rounded-xl shadow-[0_0_25px_rgba(255,255,255,0.1)]">
        <h3 className="text-lg font-sans mb-2 text-green-200">
          Gợi ý cho bạn:
        </h3>
        <ul className="text-left space-y-2 list-disc list-inside text-gray-100 font-sans">
          {tips.map((tip, i) => (
            <li key={i}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
    <button
      onClick={onRestart}
      className="absolute bottom-6 right-6 bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg text-xl"
    >
      Replay
    </button>
  </div>
);

}

export default ResultScreen;
