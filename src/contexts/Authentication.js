import {createContext, useEffect, useState, useRef} from "react";
const url = `http://localhost:8080`;

export const AuthenticationContext = createContext();

export const AuthProvider = ({children}) => {
  let name = "";
  let password = "";
  let msg = 0;
  let sessionUser = sessionStorage.getItem("user");
  sessionUser = sessionUser!=null ? JSON.parse(sessionUser) : null;
  if(sessionUser!=null) {
    name = sessionUser.name;
    password = sessionUser.password;
    msg = 1;
  }

  const [user, setUser] = useState({name, password, msg});
  const [userMod, setUserMod] = useState(user);

  useEffect(() => {
    async function authCheck() {
      let reqconfig = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
      };
      reqconfig.body = JSON.stringify(userMod);
      const res = await fetch(`${url}/login`, reqconfig);
      const data = await res.json();
      if(data.exists) sessionStorage.setItem("user", JSON.stringify(data));
      setUser(data);
    }
    authCheck();
  }, [userMod]);

  return (<AuthenticationContext.Provider value={{user, setUser, setUserMod}}>
    {children}
  </AuthenticationContext.Provider>);
};