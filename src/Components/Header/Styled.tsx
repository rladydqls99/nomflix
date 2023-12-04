import styled from "styled-components";
import { motion } from "framer-motion";

export const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;

  width: 100%;
  top: 0;
  font-size: 14px;
  padding: 20px 60px;
  box-sizing: border-box;
  color: white;
`;

export const Col = styled.div`
  display: flex;
  align-items: center;
`;

export const Items = styled.ul`
  display: flex;
  align-items: center;
`;

export const Search = styled.form`
  color: white;
  display: flex;
  align-items: center;
  position: relative;

  svg {
    height: 25px;
  }
`;

export const Input = styled(motion.input)`
  transform-origin: right center;
  position: absolute;
  right: 0px;
  padding: 5px 10px;
  padding-left: 40px;
  z-index: -1;
  color: white;
  font-size: 16px;
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.white.lighter};
`;
