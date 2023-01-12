import styled from "@emotion/styled";
import { FunctionComponent, useContext, useState, useCallback } from "react";
import { BiAddToQueue, BiGrid } from "react-icons/bi";
import { RiDeleteBinLine, RiEdit2Line, RiPagesLine } from "react-icons/ri";
import { VscGraph } from "react-icons/vsc";
import { TiEdit } from "react-icons/ti";
import { HiTrash } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { AsideNavContext } from "../../contexts/AsideNavContext";
import { ContentContext, ContentContextType } from "../../contexts/ContentContext";
import { EditContext } from "../../contexts/EditContext";
import colors from "../../styles/colors";
import { ThemeProps } from "../../styles/theme";
import request from "../../utils/request";
import { css } from "@emotion/css";
import mqs from "../../styles/medias";

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
  margin-left: 50px;
  button {
    font-size: 15px !important;
    font-weight: bold !important;
    align-items: center;
    display: flex;
    gap: 12.5px;
    padding: 10px 25px;
    cursor: pointer;
    ${({select, theme}) => select ? `
      background-color: ${theme?.colors?.primary};
      border-radius: 35px;
      cursor: default !important;
    ` : 
    ''}
  }
`;

const ItemStyle = styled.div<{toggle: boolean, theme?: ThemeProps}>`
  display: flex;
  flex-direction: column;
  padding-bottom: 0 !important;
  font-size: 15px;
  font-weight: bold;
  > button {
    font-size: 15px !important;
    font-weight: bold !important;
    align-items: center;
    display: flex;
    gap: 12.5px;
    padding: 15px 25px;
    cursor: pointer;
    ${({toggle, theme}) => toggle ? `
      background-color: ${theme?.colors?.primary};
      border-radius: 35px;
      cursor: default !important;
      font-weight: bold;
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
  const {mode, setResetContent, handleContents, setInfos}: ContentContextType = useContext(ContentContext);
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
    <nav className={css`
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: center;
      ${mqs[3]} {
        flex-direction: row;
        padding: 0 25px;
      }
    `}>
      <Item value="grupos" Icon={BiGrid} funcClick={() => dispatch({type: "flag", flag: "g"})} Content={Content}/>
      <Item value="páginas" Icon={RiPagesLine} funcClick={() => {dispatch({type: "flag", flag: "p"})}} Content={Content}/> 
      <Item value="estátisticas" Icon={VscGraph} />
      <Item value="gerenciar informes" Icon={TiEdit} Content={Content} funcClick={() => [dispatch({type: "flag", flag: "a"}), setSelect({})]}/>
    </nav>
    <nav>
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
            setResetContent((setResetContent: boolean) => !setResetContent);
            handleContents({type: "modifyItems"});
          }
          dispatch({type: "reset"});
        }} className={css`
          font-weight: bold;
          font-size: 20px;
          border-radius: 100%;
          width: 100%;
          padding: 0 25px;
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