import { useState, useEffect } from 'react';
import Hero from '../sections/Hero/Hero';
import heroImg from '../assets/img.png';
import styles from './Home.module.css';

function Home() {
  const [showHero, setShowHero] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [targets, setTargets] = useState([]);
  const [gameComplete, setGameComplete] = useState(false);

  useEffect(() => {
    if (gameStarted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameComplete(true);
    }
  }, [gameStarted, timeLeft]);

  useEffect(() => {
    if (gameStarted && timeLeft > 0) {
      const interval = setInterval(() => {
        const newTarget = {
          id: Date.now(),
          x: Math.random() * 80 + 10,
          y: Math.random() * 60 + 20,
        };
        setTargets(prev => [...prev.slice(-2), newTarget]);
        
        setTimeout(() => {
          setTargets(prev => prev.filter(t => t.id !== newTarget.id));
        }, 2000);
      }, 800);
      
      return () => clearInterval(interval);
    }
  }, [gameStarted, timeLeft]);

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setTimeLeft(10);
    setGameComplete(false);
    setTargets([]);
  };

  const hitTarget = (targetId) => {
    setScore(score + 1);
    setTargets(targets.filter(t => t.id !== targetId));
  };

  const enterPortfolio = () => {
    setShowHero(true);
  };

  if (showHero) {
    return (
      <main>
        <Hero />
      </main>
    );
  }

  if (!gameStarted && !gameComplete) {
    return (
      <main className={styles.container}>
        <div className={styles.welcome}>
          <h1 className={styles.title}>Welcome! 🎮</h1>
          <p className={styles.subtitle}>Let's play "Catch Hemanth!" before exploring my portfolio</p>
          <div className={styles.gameInfo}>
            <p>🎯 Click on my moving photos to score</p>
            <p>⏱️ You have 10 seconds</p>
            <p>🏆 Complete the game to unlock my portfolio!</p>
          </div>
          <button className={styles.startBtn} onClick={startGame}>
            Start Game
          </button>
          <button className={styles.skipBtn} onClick={enterPortfolio}>
            Skip to Portfolio
          </button>
        </div>
      </main>
    );
  }

  if (gameStarted && !gameComplete) {
    return (
      <main className={styles.container}>
        <div className={styles.gameArea}>
          <div className={styles.gameHeader}>
            <div className={styles.score}>Score: {score}</div>
            <div className={styles.timer}>Time: {timeLeft}s</div>
          </div>
          <div className={styles.playArea}>
            {targets.map(target => (
              <img
                key={target.id}
                src={heroImg}
                alt="Hemanth"
                className={styles.target}
                style={{ left: `${target.x}%`, top: `${target.y}%` }}
                onClick={() => hitTarget(target.id)}
              />
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <div className={styles.result}>
        <h2 className={styles.resultTitle}>🎉 Game Complete!</h2>
        <p className={styles.resultScore}>Final Score: {score}</p>
        <p className={styles.resultMessage}>
          {score >= 8 ? "Amazing reflexes! Welcome to my portfolio! 🏆" : 
           score >= 5 ? "Well done! Ready to explore my work? 👏" : 
           "Good try! Let's check out my portfolio! 😊"}
        </p>
        <div className={styles.resultButtons}>
          <button className={styles.enterBtn} onClick={enterPortfolio}>
            Enter Portfolio
          </button>
          <button className={styles.playAgainBtn} onClick={startGame}>
            Play Again
          </button>
        </div>
      </div>
    </main>
  );
}

export default Home;
