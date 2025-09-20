import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Analytics.module.css';

function Analytics({ isMobile = false }) {
  const [analytics, setAnalytics] = useState({
    pageViews: 0,
    timeOnPage: 0,
    scrollDepth: 0,
    interactions: 0,
    deviceType: 'desktop'
  });
  const [showAnalytics, setShowAnalytics] = useState(false);
  const location = useLocation();
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    // Reset start time and increment page views on location change
    startTimeRef.current = Date.now();
    setAnalytics(prev => ({ 
      ...prev, 
      pageViews: prev.pageViews + 1,
      timeOnPage: 0,
      scrollDepth: 0,
      interactions: 0,
      deviceType: window.innerWidth <= 768 ? 'mobile' : 'desktop'
    }));
  }, [location.pathname]);

  useEffect(() => {
    // Track time on page
    const timeInterval = setInterval(() => {
      const timeSpent = Math.floor((Date.now() - startTimeRef.current) / 1000);
      setAnalytics(prev => ({ ...prev, timeOnPage: timeSpent }));
    }, 1000);

    // Track scroll depth
    const handleScroll = () => {
      try {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? Math.floor((scrollTop / docHeight) * 100) : 0;
        setAnalytics(prev => ({ 
          ...prev, 
          scrollDepth: Math.max(prev.scrollDepth, Math.min(scrollPercent, 100))
        }));
      } catch (error) {
        console.warn('Scroll tracking error:', error);
      }
    };

    // Track interactions
    const handleInteraction = () => {
      setAnalytics(prev => ({ ...prev, interactions: prev.interactions + 1 }));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('click', handleInteraction, { passive: true });
    document.addEventListener('keydown', handleInteraction, { passive: true });

    return () => {
      clearInterval(timeInterval);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
    };
  }, []); // Empty dependency array - only run once

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getEngagementLevel = () => {
    if (analytics.timeOnPage > 120 && analytics.scrollDepth > 50) return 'High';
    if (analytics.timeOnPage > 60 && analytics.scrollDepth > 25) return 'Medium';
    return 'Low';
  };

  return (
    <div className={`${styles.container} ${isMobile ? styles.mobile : styles.desktop}`}>
      <button 
        className={styles.analyticsButton}
        onClick={() => setShowAnalytics(!showAnalytics)}
        title="View Analytics"
        aria-label="View Analytics"
      >
        📊
      </button>
      
      {showAnalytics && (
        <div className={styles.analyticsPanel}>
          <div className={styles.header}>
            <h4>Live Analytics</h4>
            <button 
              onClick={() => setShowAnalytics(false)}
              aria-label="Close Analytics"
            >
              ×
            </button>
          </div>
          
          <div className={styles.metrics}>
            <div className={styles.metric}>
              <span className={styles.label}>Page Views</span>
              <span className={styles.value}>{analytics.pageViews}</span>
            </div>
            
            <div className={styles.metric}>
              <span className={styles.label}>Time on Page</span>
              <span className={styles.value}>{formatTime(analytics.timeOnPage)}</span>
            </div>
            
            <div className={styles.metric}>
              <span className={styles.label}>Scroll Depth</span>
              <span className={styles.value}>{analytics.scrollDepth}%</span>
            </div>
            
            <div className={styles.metric}>
              <span className={styles.label}>Interactions</span>
              <span className={styles.value}>{analytics.interactions}</span>
            </div>
            
            <div className={styles.metric}>
              <span className={styles.label}>Device</span>
              <span className={styles.value}>{analytics.deviceType}</span>
            </div>
            
            <div className={styles.metric}>
              <span className={styles.label}>Engagement</span>
              <span className={`${styles.value} ${styles[getEngagementLevel().toLowerCase()]}`}>
                {getEngagementLevel()}
              </span>
            </div>
          </div>
          
          <div className={styles.chart}>
            <div className={styles.chartTitle}>Scroll Progress</div>
            <div className={styles.progressBar}>
              <div 
                className={styles.progress}
                style={{ width: `${analytics.scrollDepth}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Analytics;
