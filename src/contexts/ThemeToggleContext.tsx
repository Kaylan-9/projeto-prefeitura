import {createContext, useState, ReactNode, useEffect} from "react";

type ThemeToogleType = {
  val_theme: string, 
  setTheme: (value: any) => void | any
}

const initialValue = {
  val_theme: "dark", 
  setTheme: () => {}
}

export const ThemeToogleContext = createContext<ThemeToogleType>(initialValue);

export const ThemeToogleProvider = ({children} : {children: ReactNode}) => {
  const [val_theme, setTheme] = useState<string>(initialValue.val_theme);  
  useEffect(() => {
    const initTheme = async () => {
      const themeStorage = sessionStorage.getItem("theme");
      if (themeStorage!=null) {
        const themeFinal = JSON.parse(themeStorage).theme; 
        setTheme(themeFinal);
      }
    };
    initTheme();
  }, []);

  return (<ThemeToogleContext.Provider value={{val_theme, setTheme}}>
    {children}
  </ThemeToogleContext.Provider>);
};