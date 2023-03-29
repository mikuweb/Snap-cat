import type { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import "semantic-ui-css/semantic.min.css";
import { Loader } from "semantic-ui-react";

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
  const [isLoarding, setIsLoarding] = useState(false);

  const handleClick = async () => {
    setIsLoarding(true);
    const catImage = await fetchCatImage();
    setCatImageUrl(catImage.url);
    setIsLoarding(false);
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

      {isLoarding ? (
        <Loader active size="huge" inline="centered" />
      ) : (
        <img
          style={{ margin: "20px" }}
          src={catImageUrl}
          width={500}
          height="auto"
        />
      )}
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
