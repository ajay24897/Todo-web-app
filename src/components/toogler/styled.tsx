import styled from "styled-components";
import { colors } from "../../constants/color";

interface Iprops {
  isDarkMode: boolean;
}

export const TogglerCnt = styled.div<Iprops>`
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 80px;
  border-radius: 20px;
  padding: 5px 0px;
  position: fixed;
  right: 5vw;
  bottom: 5vh;
  background: ${(props) => (props.isDarkMode ? colors.darkBlue : colors.white)};
  box-shadow: ${(props) =>
    props.isDarkMode
      ? `0 2px 10px 4px ${colors.darkModeShadow}`
      : `0 2px 10px 4px ${colors.shadow}`};

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: ${(props) => (props.isDarkMode ? "50%" : 0)};
    width: 50%;
    height: 100%;
    border-radius: 50%;
    background: #f2f2f2;
    z-index: -1;
    transition: all 0.3s;
  }
`;
