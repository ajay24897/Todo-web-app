import { useEffect, useState } from "react";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";

import { TogglerCnt } from "./styled";
import { colors } from "./../../constants/color";

interface Iprops {
  handleDarkMode: (mode: boolean) => void;
}

const Toggler = ({ handleDarkMode }: Iprops) => {
  let [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    handleDarkMode(isDarkMode);
  }, [isDarkMode]);

  return (
    <TogglerCnt isDarkMode={isDarkMode}>
      <BsFillSunFill
        color={colors.sun}
        size={25}
        onClick={() => setIsDarkMode(false)}
      />
      <BsFillMoonFill
        color={colors.darkBlue}
        size={22}
        onClick={() => setIsDarkMode(true)}
      />
    </TogglerCnt>
  );
};

export default Toggler;
