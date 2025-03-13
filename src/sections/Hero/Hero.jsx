import styles from './Styles.module.css'
import heroImg from '../../assets/img.png'
import sun from '../../assets/sun.svg'
import moon from '../../assets/moon.svg'
import twitterLight from '../../assets/twitter-light.svg'
import twitterDark from '../../assets/twitter-dark.svg'
import githubLight from '../../assets/github-light.svg'
import githubDark from '../../assets/github-dark.svg'
import linkdinLight from '../../assets/linkedin-light.svg'
import linkdinDark from '../../assets/linkedin-dark.svg'
import CV from '../../assets/My_Resume.pdf'
import { useTheme } from '../../common/ThemeContext'
function Hero() {
    const {theme, toggleTheme} = useTheme();

    const themeIcon = theme === 'light' ? sun : moon;
    const twitterIcon = theme === 'light' ? twitterLight : twitterDark;
    const githubIcon = theme === 'light' ? githubLight : githubDark;
    const linkdinIcon = theme === 'light' ? linkdinLight : linkdinDark;

  return (
    <section id="hero" className={styles.container}>
        <div className={styles.colorModeContainer}>
            <img 
            className={styles.hero} 
            src={heroImg} 
            alt="profile pic" 
            />
            <img 
            className={styles.colorMode}
            src={themeIcon} 
            alt="color mode icon" 
            onClick={toggleTheme} />
        </div>
        <div className={styles.info}>
            <h1>Kolla 
                <br/>
                 Hemanth
                <br/>
                Kumar
            </h1>
            <h2>Frontend developer</h2>
            <span className='span'>
                <a href="https://x.com/kanna_143225" target='/'>
                <img src={twitterIcon} alt="Twitter icon" />
                </a>
                <a href="https://github.com/HemanthKumar2103" target='/'>
                <img src={githubIcon} alt="github icon" />
                </a>
                <a href="https://www.linkedin.com/in/kolla-hemanth-kumar-773320222/" target='/'>
                <img src={linkdinIcon} alt="linkdin icon" />
                </a>
            </span>
            <p
            className={styles.description}>With a passion on creating modern apps and making projects of my own using latest technologies</p>
            <a href={CV} target='/'>
                <button className='hover'>Resume</button>
            </a>
        </div>
    </section>
  )
}

export default Hero