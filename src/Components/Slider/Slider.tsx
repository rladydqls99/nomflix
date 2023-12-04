import { AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { IMovies } from "../../api";
import { makeImagePath } from "../../utilis";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";

const rowVariants = {
  hidden: {
    // 윈도우의 width를 구하는 방법
    x: window.innerWidth,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.innerWidth,
  },
};
const BoxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.3,
      duration: 0.2,
    },
    type: "tween",
  },
};

const InfoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.3,
      duration: 0.2,
    },
  },
};
interface SliderProps {
  data: IMovies[] | undefined;
  index: number;
  offset: number;
  toggleLeaving: () => void;
}
const Slider: React.FC<SliderProps> = ({
  data,
  index,
  offset,
  toggleLeaving,
}) => {
  const history = useHistory();
  const onBoxClicked = (movieId: number) => {
    history.push(`/movies/${movieId}`);
  };

  return (
    <Container>
      {/* 컴포넌트가 render 되거나 destroy 될 떄 효과를 줌 */}
      <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
        <Row
          key={index}
          variants={rowVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ type: "tween", duration: 1 }}
        >
          {data &&
            data
              .slice(1)
              .slice(offset * index, offset * index + offset)
              .map((movie) => (
                <Box
                  layoutId={movie.id + ""}
                  key={movie.id}
                  bgphoto={makeImagePath(movie.backdrop_path, "w500")}
                  variants={BoxVariants}
                  whileHover="hover"
                  initial="normal"
                  transition={{ type: "tween" }}
                  onClick={() => onBoxClicked(movie.id)}
                >
                  {/* 부모의 variants는 자식에게 상속됨 */}
                  <Info variants={InfoVariants}>
                    <h4>{movie.title}</h4>
                  </Info>
                </Box>
              ))}
        </Row>
      </AnimatePresence>
    </Container>
  );
};

export default Slider;

const Container = styled.div`
  position: relative;
  top: -100px;
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  width: 100%;
  position: absolute;
`;

const Box = styled(motion.div)<{ bgphoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  /* background-position: center center; */
  height: 150px;

  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;
const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;

  position: absolute;
  width: 100%;
  bottom: 0;

  h4 {
    text-align: center;
    font-size: 18px;
  }
`;
