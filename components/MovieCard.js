import Image from 'next/image';
import styles from './MovieCard.module.css';

export default function MovieCard({ item }) {
  const year = item.releaseDate ? new Date(item.releaseDate).getFullYear() : null;

  return (
    <article className={styles.card}>
      <div className={styles.posterWrapper}>
        {item.posterPath ? (
          <Image
            src={item.posterPath}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 40vw, (max-width: 1200px) 20vw, 15vw"
            className={styles.poster}
          />
        ) : (
          <div className={styles.posterFallback} aria-hidden="true">
            {item.title}
          </div>
        )}
        <div className={styles.overlay}>
          <button type="button" className={styles.play} aria-label={`Play ${item.title}`}>
            ▶
          </button>
        </div>
      </div>
      <h3 className={styles.title}>{item.title}</h3>
      <p className={styles.meta}>
        <span className={styles.badge}>{item.mediaType === 'tv' ? 'Series' : 'Film'}</span>
        {year && <span>{year}</span>}
      </p>
    </article>
  );
}
