import { useState, useEffect } from "react";
import GameScreen from "./components/GameScreen";
import ResultScreen from "./components/Result";
import ChooseChar from "./components/ChooseChar"; 
import "./App.css"; 

function App() {  
  // Mặc định vào thẳng màn hình chọn nhân vật
  const [stage, setStage] = useState("choose");
  const [playerName, setPlayerName] = useState("");
  const [playerCharacter, setPlayerCharacter] = useState(null); 
  const [finalScore, setFinalScore] = useState(0);
  const [totalQ, setTotalQ] = useState(0);
  
 // 2. LOGIC NHẠC NỀN
  useEffect(() => {
    // Đường dẫn tới file nhạc trong thư mục public/sounds/
    const bgMusic = new Audio("/bgmusic.mp3");
    bgMusic.loop = true;
    bgMusic.volume = 0.2; // Để âm lượng 30% cho vừa phải

    const playMusic = () => {
      bgMusic.play().catch(err => console.log("Chờ click để phát nhạc..."));
      // Sau khi nhạc phát, gỡ bỏ sự kiện click để không chạy lại
      window.removeEventListener("click", playMusic);
    };

    window.addEventListener("click", playMusic);

    return () => {
      bgMusic.pause();
      window.removeEventListener("click", playMusic);
    };
  }, []);

  // Xử lý khi chọn xong nhân vật: Bỏ qua VS, vào thẳng Game
  const handleCharacterSelect = (character, nameInput) => {
    setPlayerCharacter(character);
    setPlayerName(nameInput || character.name); 
    
    // CHỈNH Ở ĐÂY: Nhảy thẳng vào màn hình game
    setStage("game"); 
  };

  const handleFinish = (score, total) => {
    setFinalScore(score);
    setTotalQ(total);
    setStage("result");
  };

  const handleRestart = () => {
    setStage("choose");
    setFinalScore(0);
    setTotalQ(0);
    setPlayerCharacter(null);
  };

  return (
    <div className="App font-pixel">
      {/* 1. Màn hình chọn nhân vật (Khởi đầu) */}
      {stage === "choose" && (
        <ChooseChar onCharacterLock={handleCharacterSelect} />
      )}

      {/* 2. Màn hình Game (Sử dụng dữ liệu nhân vật đã chọn) */}
      {stage === "game" && (
        <GameScreen 
          playerName={playerName} 
          playerCharacter={playerCharacter} 
          onFinish={handleFinish} 
        />
      )}

      {/* 3. Màn hình kết quả */}
      {stage === "result" && (
        <ResultScreen
          playerName={playerName}
          playerCharacter={playerCharacter}
          score={finalScore}
          total={totalQ}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}

export default App;