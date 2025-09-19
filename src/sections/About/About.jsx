import styles from './AboutStyles.module.css';

function About() {
  return (
    <section id="about" className={styles.container}>
      <h1 className="sectionTitle">About Me</h1>
      <div className={styles.content}>
        <div className={styles.textContent}>
          <p className={styles.intro}>
            I'm a passionate Frontend Developer with a strong foundation in modern web technologies. 
            I love creating intuitive, responsive, and visually appealing user interfaces that provide 
            exceptional user experiences.
          </p>
          
          <div className={styles.highlights}>
            <div className={styles.highlight}>
              <h3>🎯 What I Do</h3>
              <p>
                I specialize in building modern web applications using React, JavaScript, and CSS. 
                I focus on writing clean, maintainable code and following best practices.
              </p>
            </div>
            
            <div className={styles.highlight}>
              <h3>🚀 My Approach</h3>
              <p>
                I believe in continuous learning and staying updated with the latest technologies. 
                I enjoy solving complex problems and turning ideas into functional, beautiful applications.
              </p>
            </div>
            
            <div className={styles.highlight}>
              <h3>💡 Goals</h3>
              <p>
                Currently expanding my skills in full-stack development and exploring new frameworks. 
                I'm always open to collaborating on interesting projects and learning from other developers.
              </p>
            </div>
          </div>
        </div>
        
        <div className={styles.stats}>
          <div className={styles.stat}>
            <h3>10+</h3>
            <p>Projects Completed</p>
          </div>
          <div className={styles.stat}>
            <h3>2+</h3>
            <p>Years Learning</p>
          </div>
          <div className={styles.stat}>
            <h3>5+</h3>
            <p>Technologies</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
