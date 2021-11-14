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
      ? `0 2px 10px 4px ${colors.darkModeShadow}`
      : `0 2px 10px 4px ${colors.shadow}`};
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
`;
