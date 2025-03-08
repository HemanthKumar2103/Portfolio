import styles from './RightsStyle.module.css'

function Rights() {
    const currentYear=new Date().getFullYear();
  return (
    <section id="footer" className={styles.container}>
    <p>
      &copy; {currentYear} Kolla Hemanth Kumar. <br />
      All rights reserved.
    </p>
  </section>
);
}

export default Rights