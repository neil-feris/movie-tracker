import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

import { CardHeader, CardContent } from "@mui/material";

import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Login from "../components/Login";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);

  const { data: session } = useSession();

  const Card = (movie) => {
    return (
      <div className={styles.card}>
        <div
          className={styles.image}
          style={{
            backgroundImage: `url(${movie.poster_path})`,
            backgroundSize: "cover",
          }}
        ></div>
        <div>
          <CardHeader title={movie.title} />
          <CardContent>
            <p>{movie.overview}</p>
          </CardContent>
        </div>
      </div>
    );
  };

  useEffect(() => {
    // set loading to true
    setLoading(true);

    // get movie data from API at localhost:3001/api/movies
    fetch("/api/movies")
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        console.log(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.layout}>
        <Login />
        {session && (
          <>
            <main className={styles.main}>
              {loading ? (
                <p>Loading...</p>
              ) : (
                movies.map((movie) => <Card key={movie.id} {...movie} />)
              )}
            </main>
            <article className={styles.article}>
              {loading ? (
                <p>Loading...</p>
              ) : (
                movies.map((movie) => <Card key={movie.id} {...movie} />)
              )}
            </article>
          </>
        )}
      </div>
    </div>
  );
}
