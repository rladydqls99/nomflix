import styled from "styled-components";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
interface IProps {
  match: any;
  name: string;
}
function Item({ match, name }: IProps) {
  return (
    <Container>
      <Link to={name === "home" ? "/" : `/${name}`}>
        {name} {match?.isExact && <Circle layoutId="circle" />}
      </Link>
    </Container>
  );
}

export default Item;

const Container = styled.li`
  margin-right: 20px;
  color: ${(props) => props.theme.white.darker};
  transition: color 0.3s ease-in-out;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
`;
const Circle = styled(motion.span)`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 5px;
  bottom: -7px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.red};
`;
