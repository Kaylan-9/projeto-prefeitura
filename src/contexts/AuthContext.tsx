import request from "../utils/request";
import {createContext, useEffect, useState, ReactNode, useCallback} from "react";

export type UserTypes = {
  _id?: string;
  name?: string;
  password?: string;
  msg?: string | number;
  exists?: boolean
}

export type AuthType = {
  user?: UserTypes;
  setUser?: (newState: UserTypes) => void;
  userMode?: UserTypes;
  setUserMode?:  any;
}

const initialValue = {
  user: {},
  setUser: () => {},
  userMod: {},
  setUserMod:  () => {}
}

export const AuthContext = createContext<AuthType>(initialValue);

export const AuthProvider = ({children} : {children: ReactNode}) => {
  let name= "";
  let password= "";
  let sessionUser: any = sessionStorage.getItem("user");

  sessionUser = sessionUser ? JSON.parse(sessionUser) : false;
  if(sessionUser.name!==undefined && sessionUser.password!==undefined) {
    name = sessionUser.name;
    password = sessionUser.password;
  }

  const [user, setUser] = useState<UserTypes>({name, password});
  const [userMode, setUserMode] = useState<UserTypes>(user);  

  const init = useCallback(async () => {
    const data = await request('adms/login', 'POST', userMode);
    console.log(data);
    if(data.exists) {
      sessionStorage.setItem("user", JSON.stringify(data));
      setUser(data);
    }
  }, [userMode]);
  

  useEffect(() => {
    init();
  }, [userMode]);

  return (<AuthContext.Provider value={{user, setUser, setUserMode}}>{children}</AuthContext.Provider>);
};