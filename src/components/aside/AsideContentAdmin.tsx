import styled from "@emotion/styled";
import { FunctionComponent, useContext, useState, useCallback } from "react";
import { BiAddToQueue, BiGrid } from "react-icons/bi";
import { RiDeleteBinLine, RiEdit2Line, RiPagesLine } from "react-icons/ri";
import { VscGraph } from "react-icons/vsc";
import { TiEdit } from "react-icons/ti";
import { HiTrash } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { AsideNavContext } from "../../contexts/AsideNavContext";
import { ContentContext } from "../../contexts/ContentContext";
import { EditContext } from "../../contexts/EditContext";
import colors from "../../styles/colors";
import { ThemeProps } from "../../styles/theme";
import request from "../../utils/request";
import { css } from "@emotion/css";
import { css as csst, Theme } from "@emotion/react";


interface ItemModel {
  value: string;
  color?: string;
  Icon: React.FC;
  to?: string | false;
  Content?: React.FC | false | any;
  funcClick?: () => void;
};

const SubItemStyle = styled.div<{select: boolean, theme?: ThemeProps}>`
  display: flex;
  flex-direction: column;
  padding: 5px 20px;
  button {
    align-items: center;
    display: flex;
    gap: 12.5px;
    padding: 10px 25px;
    cursor: pointer;
    ${({select, theme}) => select ? `
      background-color: #00ff95;
      border-radius: 35px;
      cursor: default !important;
      * {color: ${theme?.colors?.primary};}
    ` : 
    ''}
  }
`;

const ItemStyle = styled.div<{toggle: boolean, theme?: ThemeProps}>`
  display: flex;
  flex-direction: column;
  padding: 25px 35px;
  padding-bottom: 0 !important;
  > button {
    align-items: center;
    display: flex;
    gap: 12.5px;
    padding: 15px 25px;
    cursor: pointer;
    ${({toggle, theme}) => toggle ? `
      background-color: #00ff95;
      border-radius: 35px;
      cursor: default !important;
      * {color: ${theme?.colors?.primary};}
    ` : 
    ''}
  }
`;


export const Item: FunctionComponent<ItemModel> = ({value, color, Icon, Content, to, funcClick}) => {
  const {toggle, setToggle} = useContext(AsideNavContext);
  const onclick = () => {
    if(typeof funcClick==="function") funcClick();
    setToggle(value);
  };
  return <ItemStyle color={color} toggle={toggle===value} onClick={onclick}> {to ?
    <Link to={to}><p>{value}</p> <Icon/></Link> :
    <button>
      <Icon/>
      <p>{value}</p> 
    </button>
    }{toggle===value ? Content : null}
  </ItemStyle>;
}

const AsideContentAdmin: FunctionComponent<{}> = () => {
  const {edit, dispatch, setSelect} = useContext(EditContext);
  const {setPages, setInfos}: any = useContext(ContentContext);
  const [select, setSelectSubItem] = useState<string>("remover");


  const SubItem: FunctionComponent<ItemModel> = useCallback(({value, color, Icon, to, funcClick}) => {
    const handleSubItem = () => {
      if(typeof funcClick === "function") funcClick();
      setSelectSubItem(value);
    };  
    return (<SubItemStyle color={color} onClick={handleSubItem} select={select===value}>
      {to ?
        <Link to={to}><p>{value}</p> <Icon/></Link> :
        <button><Icon/><p>{value}</p> </button>
      }
    </SubItemStyle>);
  }, [setSelectSubItem, select]);


  const Content = <>
    <SubItem value="adicionar" Icon={BiAddToQueue} funcClick={() => dispatch({type: "edit", mod: "c"})}/>
    <SubItem value="remover" Icon={RiDeleteBinLine} funcClick={() => dispatch({type: "edit", mod: "d"})}/>
    <SubItem value="editar" Icon={RiEdit2Line} funcClick={() => dispatch({type: "edit", mod: "u"})}/>
  </>;

  return <>
    <nav>
      <Item value="grupos" Icon={BiGrid} funcClick={() => dispatch({type: "flag", flag: "g"})} Content={Content}/>
      <Item value="páginas" Icon={RiPagesLine} funcClick={() => {dispatch({type: "flag", flag: "p"})}} Content={Content}/> 
      <Item value="estátisticas" Icon={VscGraph} />
      <Item value="gerenciar informes" Icon={TiEdit} Content={Content} funcClick={() => [dispatch({type: "flag", flag: "a"}), setSelect({})]}/>
    </nav>
    <nav className={css`
      padding: 25px;
    `}>
      {edit.mod==="d" ? 
        <button onClick={async () => {
          const typeitems: {[key: string]: string} = { 
            a: "articles",
            g: "groups",
            p: "pages"
          };
          const body = {_ids: edit.item};
          await request(`${typeitems[edit.flag]}/remove`, 'DELETE', body);
          if(edit.flag==="a") { 
            setInfos(await request('articles/store', 'GET'));
          } else { 
            setPages(await request('groups/pages/all', 'GET'));
          }
          dispatch({type: "reset"});
        }} className={css`
          font-weight: bold;
          font-size: 20px;
          border-radius: 100%;
          width: 100%;
          button {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
          cursor: pointer;
          * {
            fill: ${colors.red};
          }
        `}> 
          <HiTrash/>
        </button> 
        : null
      }
    </nav>
  </>;
}

export default AsideContentAdmin;