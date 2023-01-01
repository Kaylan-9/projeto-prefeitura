import request, { requestImport } from "../utils/request";
import { createContext, ReactNode, useState, useEffect, useReducer, useCallback, Dispatch } from "react";

export type PageDataType = {
  imagename: string;
  _id: string;
  name: string;
  link: string;
}

export type GroupDataType = {
  _id: string;
  name: string;
  descricao: string;
  color: string;
  pages: PageDataType[]
};

export type InfosDataType = {
  _id: string;
  resume: string;
  _content: string;
  data: string;
}


type listItemType = {
  currentPage: number,
};

interface contentsType {
  search: boolean,
  lists: {
    "pages": listItemType & {
      content: PageDataType[] 
    },
    "bookmarks": listItemType & {
      content: PageDataType[]
    }
    "groups": listItemType & {
      content: GroupDataType[]
    },
    "edit": listItemType & {
      content: GroupDataType[]
    },
    [key: string]: listItemType & {
      content: PageDataType[] | GroupDataType[] | void[]
    }
  }
}
 
export interface ContentContextType {
  contents: contentsType,
  handleContents: Dispatch<any>,
  mode: string,
  setMode: (newState: string) => void;
  infos: InfosDataType[] | [];
  setInfos: (newState: any) => void;
  likes: string[] | [];
  setLikes: (oldLikes: any) => void;
}

const initialValue = {
  mode: "pages",
  setMode: () => {},
  contents: {  
    search: false, 
    lists: {
      "pages": {
        currentPage: 0,
        content: []
      },
      "bookmarks": {
        currentPage: 0,
        content: []
      },
      "groups": {
        currentPage: 0,
        content: []
      },
      "edit": {
        currentPage: 0,
        content: []
      }
    }
  },
  handleContents: () => null,
  infos: [],
  setInfos: () => {},
  likes: [], 
  setLikes: () => {},
}


const contentsReducer = (state: any, action: any) => {
  let {lists} = state;      
  if(action.type==="content") {
    lists[action.mode] = {
      currentPage: (lists[action.mode].currentPage+1),
      content: [...lists[action.mode].content, ...action.content],
    }
  } else if(action.type==="mark") {
    if(((lists.bookmarks.currentPage)*9)-lists.bookmarks.content.lenght!==0) lists.bookmarks.content= [...lists.bookmarks.content, action.newItem]
  } else if(action.type==="markoff") {
    lists.bookmarks.content = lists.bookmarks.content.filter((bookmark: PageDataType) => bookmark._id != action.id);
    if(lists.bookmarks.content.length>0) {
      if(((lists.bookmarks.currentPage)*9)-lists.bookmarks.content.length===9) {
        lists.bookmarks.currentPage--;
      } else if(((lists.bookmarks.currentPage)*9)-lists.bookmarks.content.length===-9) {
        lists.bookmarks.currentPage++;
      }
    } else lists.bookmarks.currentPage--;
  }

  console.log(((lists.bookmarks.currentPage)*9)-lists.bookmarks.content.length)

  switch(action.type) {
    case "search": return {
      ...state,
    };
    case "mark": return {
      ...state,
      lists
    };
    case "markoff": return {
      ...state,
      lists
    }
    case "content": return {
      ...state,
      lists
    }

  }
};

export const ContentContext: any = createContext<ContentContextType>(initialValue);

export const ContentContextProvider = ({children}: {children: ReactNode}) => {
  const [infos, setInfos] = useState(initialValue.infos);
  const [likes, setLikes] = useState([]);
  const [mode, setMode] = useState(initialValue.mode);
  const [contents, handleContents] = useReducer(contentsReducer, initialValue.contents);

  const load_favorite_pages = useCallback(async () => { 
    let userStorage: any = sessionStorage.getItem("ip");  
    let userData = {ip: ""};
    if(userStorage) {
      userData = JSON.parse(userStorage);
    } else {
      userData = await requestImport("https://api.ipify.org?format=json");
      sessionStorage.setItem("ip", JSON.stringify(userData));
    }
    const favoritesData = await request('users/appointments', 'POST', {ip: userData.ip});
    setLikes(favoritesData);
  }, []);

  const load_new_reports = async () => { 
    const newReports = await request('articles/store', 'GET');
    setInfos(newReports);
  };

  useEffect(() => {
    load_new_reports();
    load_favorite_pages();
  }, []);

  return <ContentContext.Provider value={
    {
      contents, handleContents,
      likes, setLikes,
      infos, setInfos, 
      mode, setMode
    }
  }>
    {children}
  </ContentContext.Provider>;
}
    