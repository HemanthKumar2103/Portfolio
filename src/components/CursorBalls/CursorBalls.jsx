import { useEffect, useState } from 'react';
import { useTheme } from '../../common/ThemeContext';
import styles from './CursorBalls.module.css';

function CursorBalls() {
  const [balls, setBalls] = useState([]);
  const { theme } = useTheme();
  let ballIdCounter = 0;

  useEffect(() => {
    const handleMouseMove = (e) => {
      const colors = theme === 'dark' 
        ? ['#667eea', '#764ba2', '#9f7aea'] 
        : ['#667eea', '#764ba2', '#f093fb'];
      
      const newBall = {
        id: `ball-${Date.now()}-${++ballIdCounter}`,
        x: e.clientX,
        y: e.clientY,
        color: colors[Math.floor(Math.random() * colors.length)]
      };

      setBalls(prev => [...prev.slice(-4), newBall]);

      setTimeout(() => {
        setBalls(prev => prev.filter(ball => ball.id !== newBall.id));
      }, 1000);
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [theme]);

  return (
    <div className={styles.container}>
      {balls.map(ball => (
        <div
          key={ball.id}
          className={styles.ball}
          style={{
            left: ball.x,
            top: ball.y,
            background: `radial-gradient(circle, ${ball.color}, transparent)`
          }}
        />
      ))}
    </div>
  );
}

export default CursorBalls;
