import React, { useState } from "react";
import HomeScreen from "./components/Welcome";
import GameScreen from "./components/GameScreen";
import ResultScreen from "./components/Result";
import "./App.css"; 

function App() {  const [stage, setStage] = useState("home");
  const [playerName, setPlayerName] = useState("");
  const [finalScore, setFinalScore] = useState(0);
  const [totalQ, setTotalQ] = useState(0);

  const handleStart = (name) => {
    setPlayerName(name);
    setStage("game");
  };

  const handleFinish = (score, total) => {
    setFinalScore(score);
    setTotalQ(total);
    setStage("result");
  };

  const handleRestart = () => {
    setStage("home");
    setFinalScore(0);
    setTotalQ(0);
    setPlayerName("");
  };

  return (
    <div className="App font-sans">
      {stage === "home" && <HomeScreen onStart={handleStart} />}

      {stage === "game" && (
        <GameScreen playerName={playerName} onFinish={handleFinish} />
      )}

      {stage === "result" && (
        <ResultScreen
          playerName={playerName}
          score={finalScore}
          total={totalQ}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}

export default App;
