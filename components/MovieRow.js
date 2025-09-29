import MovieCard from './MovieCard';
import styles from './MovieRow.module.css';

export default function MovieRow({ title, items, anchorId, className }) {
  if (!items?.length) {
    return null;
  }

  const rowClassName = className ? `${styles.row} ${className}` : styles.row;

  return (
    <section className={rowClassName} id={anchorId}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <span className={styles.counter}>{items.length} titles</span>
      </div>
      <div className={styles.scroller}>
        {items.map((item) => (
          <MovieCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
