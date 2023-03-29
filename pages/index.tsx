import Head from "next/head";
import type { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { request } from "http";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

interface SearchCatImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

interface IndexPagePops {
  initialCatImageUrl: string;
}

const fetchCatImage = async (): Promise<SearchCatImage> => {
  const res = await fetch(" https://api.thecatapi.com/v1/images/search");
  const result = await res.json();
  //console.log(result[0]);
  return result[0];
};

const Home: NextPage<IndexPagePops> = ({ initialCatImageUrl }) => {
  const [catImageUrl, setCatImageUrl] = useState(initialCatImageUrl);

  const handleClick = async () => {
    const catImage = await fetchCatImage();
    setCatImageUrl(catImage.url);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <h1>🐈Snap cat App🐈</h1>
      <img
        style={{ margin: "20px" }}
        src={catImageUrl}
        width={500}
        height="auto"
      />
      <button onClick={handleClick}>Next cat</button>
    </div>
  );
};

//SSR
export const getServerSideProps: GetServerSideProps<
  IndexPagePops
> = async () => {
  const catImage = await fetchCatImage();
  return {
    props: {
      initialCatImageUrl: catImage.url,
    },
  };
};

export default Home;
