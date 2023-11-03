import { FC } from "react";
import { useContextTheme } from "../../context/ThemeContext";

const ThemeSwitcherButton: FC = () => {
  const { theme, setTheme } = useContextTheme();

  console.log("theme : ", theme);

  const handleThemeChange = (newTheme: ThemeType) => {
    setTheme(newTheme);
  };

  return (
    <div>
      <button onClick={() => handleThemeChange("light")} disabled={theme === "light"}>
        Light
      </button>
      <button onClick={() => handleThemeChange("dark")} disabled={theme === "dark"}>
        Dark
      </button>
    </div>
  );
};

export default ThemeSwitcherButton;
