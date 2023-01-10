import {createContext, ReactNode, useState} from "react";


type AsideNavContextType = {
  toggle: string,
  setToggle: (newToggle: string) => void
}

const initialValue = {
  toggle: "grupos",
  setToggle: () => {}
}

export const AsideNavContext = createContext<AsideNavContextType>(initialValue);

export const AsideNavContextProvider = ({children} : {children: ReactNode}) => {
  const [toggle, setToggle] = useState<string>(initialValue.toggle);
  return <AsideNavContext.Provider value={{toggle, setToggle}}>{children}</AsideNavContext.Provider>;
}