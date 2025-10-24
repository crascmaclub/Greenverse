import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import questionsData from "../data/questions.json";

function GameScreen({ playerName, onFinish }) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [explanation, setExplanation] = useState("");
  const [answered, setAnswered] = useState(false);
  const [emoji, setEmoji] = useState("/earth.png");
  const [userInput, setUserInput] = useState("");
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const shuffled = [...questionsData].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
  }, []);

  if (questions.length === 0) return null;
  const currentQ = questions[currentIndex];

  function handleAnswer(option) {
    let correct = false;

    if (currentQ.type === "multiple") {
      correct = option === currentQ.answer;
    } else if (currentQ.type === "text") {
      correct = userInput
        .trim()
        .toLowerCase()
        .includes(currentQ.answer.toLowerCase());
    }

    const newScore = correct ? score + 1 : score;
    setScore(newScore);
    setEmoji(correct ? "/earth_happy.png" : "/earth_sad.png");
    setExplanation(currentQ.explanation);
    setAnswered(true);

    if (correct) {
      setTimeout(() => {
        nextQuestion(newScore);
      }, 2500);
    } else {
      setIsPaused(true);
    }
  }

  function nextQuestion(updatedScore = score) {
    setExplanation("");
    setAnswered(false);
    setEmoji("/earth.png");
    setUserInput("");
    setIsPaused(false);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onFinish(updatedScore, questions.length);
    }
  }

  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url('/bg.png')`, imageRendering: "pixelated" }}
    >
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[3px]"></div>

      <img
        src="/logo.png"
        alt="Greenverse logo"
        className="absolute top-4 left-6 w-52 sm:w-64 md:w-72 drop-shadow-xl"
      />
      <motion.img
        key={emoji}
        initial={{ scale: 0.8, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        src={emoji}
        alt="Earth emoji"
        className="absolute top-6 right-[45%] w-20 sm:w-24 md:w-28 drop-shadow-lg"
      />

      {/* --- Question box --- */}
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 max-w-3xl bg-gradient-to-br from-white/25 to-white/10 p-6 sm:p-8 rounded-2xl border border-white/30 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.15)] text-center mx-4"
      >
        <p className="text-white text-base sm:text-lg md:text-xl font-semibold leading-relaxed drop-shadow-[1px_1px_2px_#000000] font-sans font-bold">
          {currentQ.question}
        </p>
      </motion.div>

      {!isPaused && (
        <>
          {currentQ.type === "multiple" ? (
            <motion.div
              className="relative z-10 flex flex-row flex-nowrap gap-6 mt-10 w-full max-w-4xl justify-center px-4 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {currentQ.options.map((opt, idx) => (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  key={idx}
                  onClick={() => !answered && handleAnswer(opt)}
                  disabled={answered}
                  className={`font-sans flex-1 min-w-[130px] sm:min-w-[160px] md:min-w-[180px] px-6 py-3 sm:px-8 sm:py-4 
                    text-base sm:text-lg text-white border-2 rounded-xl backdrop-blur-sm transition-all duration-300
                    ${
                      answered
                        ? opt === currentQ.answer
                          ? "bg-green-600/80 border-white shadow-[0_0_15px_#22c55e]"
                          : "bg-gray-500/40 border-gray-300"
                        : "bg-gray-500/60 border-white hover:bg-green-500/80 hover:shadow-[0_0_15px_#22c55e]"
                    }`}
                >
                  {opt}
                </motion.button>
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="relative z-10 flex flex-col items-center mt-8 gap-4 w-full max-w-md px-4 font-sans"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Nhập câu trả lời của bạn..."
                className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400 backdrop-blur-md border border-white/30"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => !answered && handleAnswer(userInput)}
                disabled={answered || userInput.trim() === ""}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg transition-all disabled:bg-gray-400 disabled:cursor-not-allowed shadow-md font-sans"
              >
                Gửi câu trả lời
              </motion.button>
            </motion.div>
          )}
        </>
      )}

      <AnimatePresence>
        {explanation && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.4 }}
            className="absolute bottom-10 bg-black/30 border border-white/20 px-8 py-5 rounded-xl backdrop-blur-lg text-white font-semibold max-w-2xl text-center flex flex-col items-center gap-4 shadow-[0_0_25px_rgba(255,255,255,0.1)] font-sans"
          >
            <p className="text-sm sm:text-base md:text-lg">{explanation}</p>
            {isPaused && (
              <motion.button
                whileHover={{ scale: 1.08 }}
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                onClick={() => nextQuestion(score)}
                className="mt-2 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold shadow-md font-sans"
              >
                Tiếp tục
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default GameScreen;
