import Layout from '../components/Layout';
import Header from '../components/Header';
import Hero from '../components/Hero';
import MovieRow from '../components/MovieRow';
import Footer from '../components/Footer';
import { getHomePageData } from '../lib/tmdb';
import styles from '../styles/Home.module.css';

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

export default function Home({ hero, rows }) {
  const safeRows = Array.isArray(rows) ? rows : [];
  const enrichedRows = safeRows.map((row, index) => ({
    ...row,
    anchorId: slugify(row.title) || `section-${index + 1}`
  }));
  const navSections = enrichedRows.map((row) => ({
    label: row.title,
    href: `#${row.anchorId}`
  }));

  return (
    <Layout>
      <Header sections={navSections} />
      <Hero hero={hero} />
      <main className={styles.main}>
        {enrichedRows.map((row) => (
          <MovieRow
            key={row.title}
            title={row.title}
            items={row.items}
            anchorId={row.anchorId}
          />
        ))}
      </main>
      <Footer />
    </Layout>
  );
}

export async function getServerSideProps() {
  const data = await getHomePageData();

  return {
    props: {
      hero: data.hero,
      rows: data.rows
    }
  };
}
