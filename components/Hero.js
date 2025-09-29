import styles from './Hero.module.css';

export default function Hero({ hero }) {
  if (!hero) {
    return null;
  }

  const backgroundStyle = hero.backdropPath
    ? { backgroundImage: `url(${hero.backdropPath})` }
    : undefined;

  return (
    <section className={styles.hero} style={backgroundStyle} id="top">
      <div className={styles.overlay} />
      <div className={styles.content}>
        <div className={styles.eyebrow}>
          {hero.mediaType === 'tv' ? 'Netflix Original Series' : 'Featured Film'}
        </div>
        <h1 className={styles.title}>{hero.title}</h1>
        <p className={styles.meta}>
          <span className={styles.badge}>New</span>
          <span>{new Date(hero.releaseDate).getFullYear() || 'TBA'}</span>
          <span className={styles.rating}>TV-14</span>
          <span>HD</span>
        </p>
        <p className={styles.overview}>{hero.overview}</p>
        <div className={styles.actions}>
          <button type="button" className={styles.primary}>
            <span aria-hidden="true">▶</span>
            Play
          </button>
          <button type="button" className={styles.secondary}>
            <span aria-hidden="true">ℹ</span>
            More Info
          </button>
        </div>
      </div>
    </section>
  );
}
