function ResultScreen({ playerName, score, total, onRestart }) {
  const ratio = score / total;
  const message =
    ratio > 0.7
      ? "🌈 Trái Đất đang hồi sinh nhờ bạn! Tiếp tục nhé, EcoHero!"
      : ratio > 0.4
      ? " Bạn đang trên đường trở thành Anh hùng bảo vệ môi trường rồi, cố lên!"
      : " Trái Đất đang gặp nguy hiểm! Hãy thử lại và làm tốt hơn!";

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-100 text-center">
      <h1 className="text-3xl font-bold mb-4 text-green-700">
        Kết quả của {playerName}
      </h1>

      <p className="text-xl mb-2">
        Điểm của bạn: <span className="font-semibold">{score}</span> / {total}
      </p>
      <p className="text-lg mb-6">{message}</p>

      <button
        onClick={onRestart}
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
      >
        Chơi lại 
      </button>
    </div>
  );
}

export default ResultScreen;
