import styled, { css } from "styled-components";

import { colors } from "../../constants/color";

interface Iprops {
  isDarkMode: Boolean;
}

const commnCss = css<Iprops>`
  background: ${(props) => (props.isDarkMode ? colors.darkBlue : colors.white)};
  color: ${(props) => (props.isDarkMode ? colors.white : colors.black)};
  box-shadow: ${(props) =>
    props.isDarkMode
      ? `0 2px 5px 2px ${colors.darkModeShadow}`
      : `0 2px 5px 2px ${colors.shadow}`};
`;

export const StyledInput = styled.input<Iprops>`
  ${commnCss}
`;

export const StyledTodoList = styled.div<Iprops>`
  ${commnCss}
`;

export const StyleAddIcon = styled.div<Iprops>`
  ${commnCss}
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    box-shadow: ${(props) =>
      props.isDarkMode
        ? `0 2px 5px 2px ${colors.darkModeShadow}`
        : `0 2px 5px 2px ${colors.shadow}`};
  }
`;

interface props {
  isToogled: Boolean;
}
interface Props2 {
  isDarkMode: Boolean;
}

export const StyledArrowCnt = styled.div<props>`
  width: 15px;
  height: 15px;
  transform: ${(props) =>
    props.isToogled ? `rotate(-90deg)` : `rotate(0deg)`};
  transition: all 0.3s;
  cursor: pointer;
`;

export const StyledArrowIcon = styled.h4<Props2>`
  width: 15px;
  height: 15px;
  border-left: ${(props) =>
    props.isDarkMode
      ? `3px solid  ${colors.white}`
      : `3px solid  ${colors.black}`};
  border-top: ${(props) =>
    props.isDarkMode
      ? `3px solid  ${colors.white}`
      : `3px solid  ${colors.black}`};
  transform: rotate(-45deg);
  overflow: hidden;
  box-shadow: none;
`;
