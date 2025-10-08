import { useState } from "react";
import questions from "../data/questions.json";

function GameScreen({ playerName, onFinish }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");

  const currentQ = questions[currentIndex];

  // fake feedback (mock AI)
  function fakeFeedback(userAnswer, correctAnswer) {
    if (userAnswer === correctAnswer) {
      const positive = [
        "Tốt lắm! Bạn đang trên đường trở thành Anh hùng Bảo vệ môi trường!",
        "Tuyệt vời! Bạn chọn chính xác rồi",
        "Chính xác! Môi trường cảm ơn bạn",
      ];
      return positive[Math.floor(Math.random() * positive.length)];
    } else {
      const negative = [
        "Oops! Lần sau hãy chú ý ký hiệu tái chế nhé!",
        "Không sao, hãy thử suy nghĩ lại về nhãn 'xanh' này!",
        "Sai rồi! Nhưng bạn đang học được điều mới",
      ];
      return negative[Math.floor(Math.random() * negative.length)];
    }
  }

  function handleAnswer(option) {
    const correct = option === currentQ.answer;
    if (correct) setScore(score + 1);

    const fb = fakeFeedback(option, currentQ.answer);
    setFeedback(fb);

    setTimeout(() => {
      setFeedback("");
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex(currentIndex + 1);
      } else {
        onFinish(score + (correct ? 1 : 0), questions.length);
      }
    }, 1500);
  }

  return (
    <div className="p-6 text-center min-h-screen bg-green-50">
      <h2 className="text-2xl font-bold mb-3 text-green-700">
        Câu hỏi {currentIndex + 1}/{questions.length}
      </h2>
      <p className="text-gray-700 mb-6">{currentQ.question}</p>

      {currentQ.options.map((opt, idx) => (
        <button
          key={idx}
          onClick={() => handleAnswer(opt)}
          className="block w-full max-w-md mx-auto mb-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          {opt}
        </button>
      ))}

      {feedback && (
        <div className="mt-4 p-3 bg-yellow-100 rounded shadow inline-block">
          {feedback}
        </div>
      )}
    </div>
  );
}

export default GameScreen;
