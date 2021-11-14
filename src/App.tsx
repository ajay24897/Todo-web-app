import { useEffect, useState } from "react";
import styled from "styled-components";

import Todo from "./components/todo";
import Toggler from "./components/toggler";
import { colors } from "./constants/color";

import "./scss/index.scss";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    console.log(isDarkMode);
  }, [isDarkMode]);

  const handleDarkMode = (mode: boolean) => {
    setIsDarkMode(mode);
  };

  return (
    <StyledDiv className="App" isDarkMode={isDarkMode}>
      <Todo isDarkMode={isDarkMode} />
      <Toggler handleDarkMode={handleDarkMode} />
    </StyledDiv>
  );
}

export default App;

interface Iprops {
  isDarkMode: Boolean;
}

const StyledDiv = styled.div<Iprops>`
  background: ${(props) => (props.isDarkMode ? colors.darkBlue : colors.white)};
  color: ${(props) => (props.isDarkMode ? colors.white : colors.black)};
`;
