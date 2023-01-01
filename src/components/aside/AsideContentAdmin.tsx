import styled from "@emotion/styled";
import { FunctionComponent, useContext, useState, useCallback } from "react";
import { BiAddToQueue, BiGrid } from "react-icons/bi";
import { RiDeleteBinLine, RiEdit2Line, RiPagesLine } from "react-icons/ri";
import { VscGraph } from "react-icons/vsc";
import { TiEdit } from "react-icons/ti";
import { BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";
import { AsideNavContext } from "../../contexts/AsideNavContext";
import { ContentContext } from "../../contexts/ContentContext";
import { EditContext } from "../../contexts/EditContext";
import colors from "../../styles/colors";
import { ThemeProps } from "../../styles/theme";
import request from "../../utils/request";
import { css } from "@emotion/css";
import { css as csst } from "@emotion/react";


interface ItemModel {
  value: string;
  color?: string;
  Icon: React.FC;
  to?: string | false;
  Content?: React.FC | false | any;
  funcClick?: () => void;
};

const SubItemStyle = styled.div`
  > button {
    ${({select} : {select?: boolean}) => select ? csst`
      background-color: rgba(0,255,174,0.2497373949579832);
    ` : ``}
    justify-content: space-between;
    align-items: center;
    display: flex;
    font-size: 16px;
    font-weight: 500;
    width: 100%;
    cursor: pointer;
    > svg {
      color: ${colors.green};
      padding: 15px;
      margin-left: 25px;
      font-size: 16px;
      * {color: ${({theme}: {theme?: ThemeProps}) => theme?.colors?.tertiary}}
    }
    > p {
      margin: 0 auto;
      width: 180px;
      color:  ${({theme}: {theme?: ThemeProps}) => theme?.colors?.tertiary};
    }
    :hover {
      background-color: #1d7761;
    }
  }
`;

const ItemStyle = styled(SubItemStyle)<{toggle: boolean}>`
  > button {
    > p {
      font-size: 16px;
      font-weight: bold;
      color: ${({theme}: {theme?: ThemeProps}) => theme?.colors?.tertiary};
    }
    > svg {
      * {color: ${({theme}: {theme?: ThemeProps}) => theme?.colors?.tertiary}}
      font-size: 19px;
    }
  ${({toggle}: {toggle?: boolean}) => toggle ? csst`
    svg {
      padding: 15px;
      margin-top: 15px;
      margin-bottom: 15px;
      background: rgb(0,255,174);
      border-radius: 100%;  
    }
  ` : ''}
    :hover {
      background: rgb(0,255,174);
      color: ${({theme} : {theme?: ThemeProps}) => theme?.colors?.quaternary};
      svg {
        transition: padding-left 250ms;
      }
    }
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
          background-color: ${colors.red};
          border-radius: 100%;
          padding: 15px;
          cursor: pointer;
          * {
            fill: white;
          }
        `}> 
          <BiTrash/>
        </button> 
        : null
      }
    </nav>
  </>;
}

export default AsideContentAdmin;