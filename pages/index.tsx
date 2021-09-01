import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to LoLPA Next!
        </h1>

        <p className={styles.description}>
          Get started by checking out the {' '}
          <Link href="/champions"><a>Champions</a></Link> {' '}
          page
        </p>
      </main>
    </div>
  )
}
