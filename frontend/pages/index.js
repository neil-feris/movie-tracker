import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Card = () => {
  return (
    <div className={styles.card}>
      <h3>Card</h3>
      <p>Card content</p>
    </div>
  );
};

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.layout}>
        <main className={styles.main}>
          Main
          <Card />
          <Card />
          <Card />
        </main>
        <article className={styles.article}>
          Article
          <Card />
          <Card />
          <Card />
        </article>
      </div>
    </div>
  );
}
