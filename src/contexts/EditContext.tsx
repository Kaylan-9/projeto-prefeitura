import {createContext, useReducer, ReactNode, useState} from "react";

type EditType = {
  edit: {
    mod: string,
    flag: string,
    item: any
  },
  dispatch: (props: object) => void,
  select: {[key: string]: boolean},
  setSelect: (oldSelect: any) => void,
}

const initialValue = {
  edit: {
    mod: "d",
    flag: "g",
    item: []
  },
  dispatch: () => {},
  select: {},
  setSelect: () => {}
}

const addItem = (items: any, mod: string, item: any) => {
  if(mod==="d") {
    let new_list = [];
    let exist = false;
    for(let item_atual of items) {
      if(item_atual===item) {
        exist = true;
        break;
      }
    }
    if(exist) new_list = items.filter((item_atual: any) => item_atual!==item);
    else new_list = [...items, item]; 
    return new_list; 
  }
  return [item]; 
};


const editReducer = (state: any | object, action: any | object) => {  
  switch(action.type) {
    case "flag": return {flag: action.flag, mod: state.mod, item: []};
    case "edit": return {flag: state.flag, mod: action.mod, item: []};
    case "item": return {flag: state.flag, mod: state.mod, item: addItem(state.item, state.mod, action.item)};
    case "reset": return {flag: "", mod: "", item: []};
    default: return state;
  }
};

export const EditContext = createContext<EditType>(initialValue);

export const EditProvider = ({children} : {children: ReactNode}) => {
  const [edit, dispatch] = useReducer(editReducer, initialValue.edit);
  const [select, setSelect] = useState<{[key: string]: boolean} | {}>({});
  return (<EditContext.Provider value={{edit, dispatch, select, setSelect}}>
    {children}
  </EditContext.Provider>);
};