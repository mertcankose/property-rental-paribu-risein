import { createContext, useContext, useState, ReactNode, useEffect, FC } from "react";

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeType>(() => {
    const storedTheme = localStorage.getItem("theme");
    return (["dark", "light"] as ThemeType[]).includes(storedTheme as ThemeType) ? (storedTheme as ThemeType) : "light"; // Varsayılan tema değeri light
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const contextValue: ThemeContextType = {
    theme,
    setTheme,
  };

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};

export const useContextTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
