import * as React from 'react';
import Head from 'next/head';
import { CenterModal, ModalTitle, ModalCloseTarget } from 'react-spring-modal';

// Where is the CSS import for react-spring-modal?
// Next.js requires that you move all global CSS imports from libraries to pages/_app.js

import styles from '../styles/Home.module.css';

export default function Home({ name }) {
  const [status, setStatus] = React.useState('idle');

  return (
    <div className={styles.container}>
      <Head>
        <title>Animated Modals</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <button onClick={() => setStatus('modal-open')} className={styles.card}>
            <h3>Open modal &rarr;</h3>
            <p>This is a modal using the Next.js framework and its SSR capabilities.</p>
          </button>

          <CenterModal isOpen={status === 'modal-open'} onDismiss={() => setStatus('idle')}>
            <ModalTitle>Just Modal Things</ModalTitle>

            <p className={styles.modalParagraph}>
              This is a modal made with <code className={styles.codeSmall}>react-spring-modal</code> and served via SSR.
              The modal itself is using the default styles for{' '}
              <code className={styles.codeSmall}>&lt;CenterModal&gt;</code> imported via{' '}
              <code className={styles.codeSmall}>react-spring-modal/styles.css</code>.
            </p>

            <p className={styles.modalParagraph}>
              Name loaded from SSR: <code>"{name}"</code>
            </p>

            <section className={styles.modalActions}>
              <a href="https://github.com/ChrisBrownie55" className={styles.modalButton}>
                View my GitHub
              </a>
              <ModalCloseTarget>
                <button className={styles.modalButton}>Exit</button>
              </ModalCloseTarget>
            </section>
          </CenterModal>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a href="https://github.com/vercel/next.js/tree/master/examples" className={styles.card}>
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>Instantly deploy your Next.js site to a public URL with Vercel.</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}

export async function getServerSideProps() {
  const { name } = await fetch('http://localhost:3000/api/hello')
    .then(res => res.json())
    .catch(() => ({ name: 'not loaded' }));
  return { props: { name } };
}
