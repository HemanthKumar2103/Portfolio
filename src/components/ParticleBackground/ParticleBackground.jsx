import { useTheme } from '../../common/ThemeContext';
import styles from './ParticleBackground.module.css';

function ParticleBackground() {
  const { theme } = useTheme();

  return (
    <div className={`${styles.container} ${theme === 'dark' ? styles.dark : styles.light}`}>
      <div className={styles.particle}></div>
      <div className={styles.particle}></div>
      <div className={styles.particle}></div>
      <div className={styles.particle}></div>
      <div className={styles.particle}></div>
      <div className={styles.particle}></div>
      <div className={styles.particle}></div>
      <div className={styles.particle}></div>
      <div className={styles.particle}></div>
      <div className={styles.particle}></div>
    </div>
  );
}

export default ParticleBackground;
