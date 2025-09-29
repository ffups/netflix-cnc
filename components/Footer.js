import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copy}>
        Built for the Craft & Code reassessment using data sourced from{' '}
        <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer">
          TMDb
        </a>
        . This project is an educational Netflix landing page recreation.
      </p>
      <div className={styles.links}>
        <a href="#top">Back to top</a>
        <a href="https://github.com/" target="_blank" rel="noreferrer">
          View Source
        </a>
      </div>
    </footer>
  );
}
