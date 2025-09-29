import Head from 'next/head';
import { Inter } from 'next/font/google';
import styles from './Layout.module.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800']
});

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Netflix C&C</title>
        <meta
          name="description"
          content="A polished Netflix landing page recreation built with Next.js and the TMDb API."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={`${inter.className} ${styles.page}`}>{children}</div>
    </>
  );
}

