import {createContext, useEffect, useState} from "react";
const url = `http://localhost:8080`;

export const PagesRequestContext = createContext({
  pages: [],
  setUpdatePages: () => {}
});

export const PagesProvider = ({children}) => {
  const [pages, setPages] = useState([]);
  const [updatePages, setUpdatePages] = useState([]);

  useEffect(() => {
    async function pagesReq() {
      const res = await fetch(`${url}/pages`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
      });
      setPages(await res.json());
    }
    pagesReq();
  }, [updatePages]);

  return (<PagesRequestContext.Provider value={{pages, setUpdatePages}}>
    {children}
  </PagesRequestContext.Provider>);
};