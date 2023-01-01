import {requestImport} from "../utils/request";
import {createContext, useEffect, useCallback, useState, ReactNode} from "react";

type IPType = {
  ip: string,
}

const initialValue = {
  ip: "",
}

export const IPContext = createContext<IPType>(initialValue);

export const IPProvider = ({children} : {children: ReactNode}) => {
  const [user, setUser] = useState<IPType>(initialValue);

  const init = useCallback(async () => {
    let userStorage: any = sessionStorage.getItem("ip");  
    let userData = {ip: ""};
    if(userStorage) {
      userData = JSON.parse(userStorage);
    } else {
      userData = await requestImport("https://api.ipify.org?format=json");
      sessionStorage.setItem("ip", JSON.stringify(userData));
    }
    setUser(userData);
  } ,[])

  useEffect(() => {
    init();
  }, []);

  return (<IPContext.Provider value={{ip: user.ip}}>
    {children}
  </IPContext.Provider>);
};