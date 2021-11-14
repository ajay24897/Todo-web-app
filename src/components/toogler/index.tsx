import { useEffect, useState } from "react";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";

import { TogglerCnt } from "./styled";

interface Iprops {
  handleDarkMode: (mode: boolean) => void;
}

const Toogler = ({ handleDarkMode }: Iprops) => {
  let [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    handleDarkMode(isDarkMode);
  }, [isDarkMode]);

  return (
    <TogglerCnt isDarkMode={isDarkMode}>
      <BsFillSunFill
        color="#fc9601"
        size={25}
        onClick={() => setIsDarkMode(false)}
      />
      <BsFillMoonFill
        color="#22395d"
        size={22}
        onClick={() => setIsDarkMode(true)}
      />
    </TogglerCnt>
  );
};

export default Toogler;
