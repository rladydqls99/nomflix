import { useQuery } from "react-query";
import { IGetMoivesResult, getMovies } from "../../api";
import { makeImagePath } from "../../utilis";
import { useState } from "react";
import { Wrapper, Loader, Banner, Title, Overview } from "./Styles";
import Slider from "../../Components/Slider/Slider";
import MovieModal from "../../Components/MovieModal/MovieModal";

const offset = 6;

function Home() {
  const { data, isLoading } = useQuery<IGetMoivesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );

  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMoives = data.results.length - 1;
      const maxIndex = Math.floor(totalMoives / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const toggleLeaving = () => setLeaving(!leaving);

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading</Loader>
      ) : (
        <>
          <Banner
            onClick={increaseIndex}
            bgphoto={makeImagePath(data?.results[0].backdrop_path || "")}
          >
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Slider
            data={data}
            index={index}
            offset={offset}
            toggleLeaving={toggleLeaving}
          />
          <MovieModal data={data?.results} />
        </>
      )}
    </Wrapper>
  );
}

export default Home;
