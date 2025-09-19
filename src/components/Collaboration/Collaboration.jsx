import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './Collaboration.module.css';

function Collaboration() {
  const [visitors, setVisitors] = useState([]);
  const [currentUser] = useState(() => {
    try {
      let user = JSON.parse(localStorage.getItem('portfolioUser') || 'null');
      if (!user) {
        user = {
          id: uuidv4(),
          name: `Visitor ${Math.floor(Math.random() * 1000)}`,
          color: `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`,
          joinedAt: Date.now()
        };
        localStorage.setItem('portfolioUser', JSON.stringify(user));
      }
      return user;
    } catch (error) {
      console.warn('User initialization error:', error);
      return {
        id: uuidv4(),
        name: `Visitor ${Math.floor(Math.random() * 1000)}`,
        color: `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`,
        joinedAt: Date.now()
      };
    }
  });
  const [cursors, setCursors] = useState({});
  const [showVisitors, setShowVisitors] = useState(false);
  const [totalVisitors, setTotalVisitors] = useState(1);

  const updateVisitorCount = useCallback(() => {
    try {
      const visitCount = parseInt(localStorage.getItem('portfolioVisitCount') || '0') + 1;
      localStorage.setItem('portfolioVisitCount', visitCount.toString());
      setTotalVisitors(visitCount);
    } catch (error) {
      console.warn('Visitor count update error:', error);
    }
  }, []);

  const getActiveVisitors = useCallback(() => {
    const hour = new Date().getHours();
    const baseVisitors = Math.floor(Math.random() * 3) + 1;
    const timeMultiplier = hour >= 9 && hour <= 17 ? 2 : 1;
    return Math.min(baseVisitors * timeMultiplier, 8);
  }, []);

  const simulateActiveVisitors = useCallback(() => {
    try {
      const activeCount = getActiveVisitors();
      const mockVisitors = [];
      
      const names = ['Alex', 'Sarah', 'Mike', 'Emma', 'John', 'Lisa', 'David', 'Anna'];
      const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd'];
      
      for (let i = 0; i < activeCount; i++) {
        mockVisitors.push({
          id: `visitor-${i}`,
          name: names[i % names.length],
          color: colors[i % colors.length],
          lastSeen: Date.now() - Math.random() * 300000,
          isActive: Math.random() > 0.3
        });
      }
      
      setVisitors(mockVisitors);
    } catch (error) {
      console.warn('Visitor simulation error:', error);
    }
  }, [getActiveVisitors]);

  useEffect(() => {
    updateVisitorCount();
    simulateActiveVisitors();
    
    const interval = setInterval(simulateActiveVisitors, 30000);

    const handleMouseMove = (e) => {
      try {
        setCursors(prev => ({
          ...prev,
          [currentUser.id]: {
            x: e.clientX,
            y: e.clientY,
            user: currentUser,
            timestamp: Date.now()
          }
        }));
      } catch (error) {
        console.warn('Mouse tracking error:', error);
      }
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      clearInterval(interval);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [currentUser, updateVisitorCount, simulateActiveVisitors]);

  const getTimeAgo = (timestamp) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    return `${Math.floor(seconds / 3600)}h ago`;
  };

  const activeVisitors = visitors.filter(v => v.isActive);

  return (
    <div className={styles.container}>
      {/* Collaborative Cursors */}
      {Object.entries(cursors).map(([id, cursor]) => (
        id !== currentUser.id && Date.now() - cursor.timestamp < 5000 && (
          <div
            key={id}
            className={styles.cursor}
            style={{
              left: cursor.x,
              top: cursor.y,
              borderColor: cursor.user.color
            }}
          >
            <div 
              className={styles.cursorLabel}
              style={{ backgroundColor: cursor.user.color }}
            >
              {cursor.user.name}
            </div>
          </div>
        )
      ))}

      {/* Visitors Panel */}
      <div className={styles.visitorsPanel}>
        <button 
          className={styles.visitorsButton}
          onClick={() => setShowVisitors(!showVisitors)}
          aria-label={`${activeVisitors.length + 1} active visitors`}
        >
          👥 {activeVisitors.length + 1}
        </button>
        
        {showVisitors && (
          <div className={styles.visitorsDropdown}>
            <h4>Active Visitors ({activeVisitors.length + 1})</h4>
            <div className={styles.visitorsList}>
              <div className={styles.visitor}>
                <div 
                  className={styles.visitorDot}
                  style={{ backgroundColor: currentUser.color }}
                />
                <span>{currentUser.name} (You)</span>
                <span className={styles.status}>online</span>
              </div>
              {activeVisitors.map(visitor => (
                <div key={visitor.id} className={styles.visitor}>
                  <div 
                    className={styles.visitorDot}
                    style={{ backgroundColor: visitor.color }}
                  />
                  <span>{visitor.name}</span>
                  <span className={styles.status}>
                    {getTimeAgo(visitor.lastSeen)}
                  </span>
                </div>
              ))}
            </div>
            <div className={styles.totalVisits}>
              Total visits: {totalVisitors}
            </div>
          </div>
        )}
      </div>

      {/* Live Activity Feed */}
      <div className={styles.activityFeed}>
        <div className={styles.activity}>
          <span className={styles.activityDot}></span>
          <span>{activeVisitors.length + 1} visitors exploring</span>
        </div>
      </div>
    </div>
  );
}

export default Collaboration;
