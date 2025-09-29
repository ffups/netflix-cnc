import Link from 'next/link';
import styles from './Header.module.css';

export default function Header({ sections = [] }) {
  const navItems = [{ label: 'Home', href: '#top' }, ...sections];

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <span className={styles.logo} aria-hidden="true">
          Netflix
        </span>
        <span className={styles.beta}>Clone & Craft</span>
      </div>
      <nav className={styles.nav} aria-label="Primary">
        {navItems.map((link) => (
          <Link key={link.href} href={link.href} className={styles.navLink}>
            {link.label}
          </Link>
        ))}
      </nav>
      <div className={styles.actions}>
        <button type="button" className={styles.search} aria-label="Search">
          <span className={styles.searchIcon} aria-hidden="true">
            🔍
          </span>
        </button>
        <button type="button" className={styles.signIn}>
          Sign In
        </button>
      </div>
    </header>
  );
}
