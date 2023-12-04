import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { useRouteMatch } from "react-router-dom";
import { useViewportScroll } from "framer-motion";
import { useHistory } from "react-router-dom";
import { makeImagePath } from "../../utilis";
import { IMovies } from "../../api";

interface MovieModalProps {
  data: IMovies[] | undefined;
}
const MovieModal: React.FC<MovieModalProps> = ({ data }) => {
  const bigMovieMatch = useRouteMatch<{ movieId: string }>("/movies/:movieId");
  const history = useHistory();
  const onOverlayClick = () => history.push("/");
  const { scrollY } = useViewportScroll();

  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    data?.find((movie) => movie.id === +bigMovieMatch.params.movieId);
  return (
    <AnimatePresence>
      {bigMovieMatch ? (
        <>
          <Overlay
            onClick={onOverlayClick}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
          <BigMovie
            style={{ top: scrollY.get() + 100 }}
            layoutId={bigMovieMatch.params.movieId + ""}
          >
            {clickedMovie && (
              <>
                <BigCover
                  style={{
                    backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                      clickedMovie.backdrop_path,
                      "w500"
                    )})`,
                  }}
                />
                <BigTitle>{clickedMovie.title}</BigTitle>
                <BigOverview>{clickedMovie.overview}</BigOverview>
              </>
            )}
          </BigMovie>
        </>
      ) : null}
    </AnimatePresence>
  );
};

export default MovieModal;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  background-color: ${(props) => props.theme.black.lighter};
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 10px;
  font-size: 25px;
  position: relative;
  top: -60px;
`;

const BigOverview = styled.p`
  padding: 20px;
  color: ${(props) => props.theme.white.lighter};
  top: -60px;
  position: relative;
`;
