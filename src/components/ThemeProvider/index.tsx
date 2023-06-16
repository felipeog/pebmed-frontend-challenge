import { ReactNode } from "react";

import "./index.css";

interface IThemeProviderProps {
  children: ReactNode;
}

function ThemeProvider({ children }: IThemeProviderProps) {
  return children;
}

export { ThemeProvider };
