import styles from './SkillStyle.module.css';
import checkMarkIconDark from '../../assets/checkmark-dark.svg';
import checkMarkIconLight from '../../assets/checkmark-light.svg';
import SkillList from '../../common/SkillList';
import { useTheme } from '../../common/ThemeContext';

function Skill() {
  const { theme } = useTheme();
  const checkMarkIcon = theme === 'light' ? checkMarkIconLight : checkMarkIconDark;

  return (
    <section id="skills" className={styles.container}>
      <h1 className="sectionTitle">Skills</h1>
      
      <div className={styles.skillCategory}>
        <h3 className={styles.categoryTitle}>Frontend Technologies</h3>
        <div className={styles.skillList}>
          <SkillList src={checkMarkIcon} skill="HTML5" />
          <SkillList src={checkMarkIcon} skill="CSS3" />
          <SkillList src={checkMarkIcon} skill="JavaScript (ES6+)" />
          <SkillList src={checkMarkIcon} skill="TypeScript" />
          <SkillList src={checkMarkIcon} skill="React.js" />
          <SkillList src={checkMarkIcon} skill="Next.js" />
        </div>
      </div>
      
      <hr />
      
      <div className={styles.skillCategory}>
        <h3 className={styles.categoryTitle}>Styling & Design</h3>
        <div className={styles.skillList}>
          <SkillList src={checkMarkIcon} skill="Tailwind CSS" />
          <SkillList src={checkMarkIcon} skill="Styled Components" />
          <SkillList src={checkMarkIcon} skill="SASS/SCSS" />
          <SkillList src={checkMarkIcon} skill="Responsive Design" />
          <SkillList src={checkMarkIcon} skill="Framer Motion" />
        </div>
      </div>
      
      <hr />
      
      <div className={styles.skillCategory}>
        <h3 className={styles.categoryTitle}>Backend & Tools</h3>
        <div className={styles.skillList}>
          <SkillList src={checkMarkIcon} skill="Node.js" />
          <SkillList src={checkMarkIcon} skill="Express.js" />
          <SkillList src={checkMarkIcon} skill="MongoDB" />
          <SkillList src={checkMarkIcon} skill="Git & GitHub" />
          <SkillList src={checkMarkIcon} skill="Vite" />
          <SkillList src={checkMarkIcon} skill="npm/yarn" />
        </div>
      </div>
    </section>
  );
}

export default Skill;
