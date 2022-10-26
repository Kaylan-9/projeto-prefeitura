import {useRef, useContext, useReducer} from 'react';
import {PagesRequestContext} from "../contexts/PagesRequest";
import {AuthenticationContext} from "../contexts/Authentication";
import {H2, H3, Btn, BoxRadio, Input, Submit, BoxMarking, TextArea} from '../styles/styles';
import {AdmStyle, AdmPanel, EditPanelStyle, Selectors, CadPageStyle, UnauthenticatedStyle} from '../styles/Adm.styles';
import {BsFillGearFill} from 'react-icons/bs';
import {FiLock} from "react-icons/fi";
import {MdOutlineManageAccounts} from 'react-icons/md';
const url = `http://localhost:8080`;
let item_cad_new={};

const selectDefault = {
  edit: "update",
  flag: "pages",
  item: [],
  checks: []
};

const selectReducer = (state, action) => {  
  switch(action.type) {
    case "flag":
      item_cad_new={};
      return {flag: action.flag, edit: state.edit, item: [], checks: []};
    case "edit":
      item_cad_new={};
      return {flag: state.flag, edit: action.edit, item: [], checks: []};
    case "item":
      return {flag: state.flag, edit: state.edit, item: action.item, checks: action.checks};
    case "reset":
      return {flag: state.flag, edit: state.edit, item: [], checks: []};
    default:
      return state;
  }
};

const BoxMarkBase = ({name, bg, flag, val, id, descricao, select, dispatch}) => (
  <BoxMarking 
    name={name} 
    pertence="pages" 
    style={{backgroundColor: bg}} 
    active={select.edit!=="create" && select.flag===flag || (select.edit==="create" && select.flag==="pages" && select.flag!==flag)}  
    type={select.edit==="remove" ? "checkbox" : "radio"}
    checked={select.checks.includes(id)}
    onChange = {()=> {
      const checked_ = () => {
        let checks = select.edit==="remove" ? select.checks : [];
        if(checks.includes(id)) checks.splice(checks.indexOf(id), 1);
        else checks.push(id);
        return checks;
      };
      const item_ = () => {
        let new_item = (select.flag==="conjuntos") ? {_id: id, name, descricao, color: bg} : {_id: id, name, link: val};
        let item = select.edit=="update" || (select.edit=="create" && select.flag=="pages")
          ? new_item : (select.item.length===undefined
          ? [] : select.item);
        if(Array.isArray(item)) {
          const typeitem = flag==="conjuntos" ? new_item._id : new_item.link;
          if(item.includes(typeitem)) item.splice(item.indexOf(typeitem), 1);
          else item.push(typeitem);
        }
        return item;
      };
      dispatch({type:"item", item: item_(), checks: checked_()});
    }}
  />
);

const Authenticated = () => {
  const {setUpdatePages} = useContext(PagesRequestContext);
  const {setUserMod} = useContext(AuthenticationContext);
  const [select, dispatch] = useReducer(selectReducer, selectDefault);
  const btnconfirm = useRef(null);

  const requestEdit = async () => {
    const res = await fetch(`${url}/${select.edit}/${select.flag}/`, {
      method: 'POST', 
      headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
      body: JSON.stringify(select.edit==="create" || select.edit==="update" ? item_cad_new : select.item)
    });
    const finaly_ = await res.json();    
    setUpdatePages(finaly_);
    dispatch({type: "reset"});
  };

  return (<AdmStyle>
    <AdmPanel>
      <Btn className="tool" onClick={() => [sessionStorage.removeItem("user"), setUserMod({msg: 2})]}><FiLock/> Sair  </Btn>
      <EditPanelStyle>
        <Btn className='tool'>
          <BsFillGearFill/>Gerenciar</Btn>
        <div>
          <H3>Manipular {select.flag}</H3>
          <Selectors>
            <BoxRadio name="Conjuntos" pertence="type_edit" onChange={()=>dispatch({type: "flag", flag: "conjuntos"})}/>
            <BoxRadio name="Páginas" pertence="type_edit" onChange={()=>dispatch({type: "flag", flag: "pages"})}/>
          </Selectors>
        </div>
        <div>
          <Selectors>
            <BoxRadio name="Editar" pertence="tool_edit" onChange={()=>dispatch({type: "edit", edit: "update"})}/>
            <BoxRadio name="Remover" pertence="tool_edit" onChange={()=>dispatch({type: "edit", edit: "remove"})}/>  
            <BoxRadio name="Adicionar" pertence="tool_edit" onChange={()=>dispatch({type: "edit", edit: "create"})}/>  
          </Selectors>
        </div>
        {
          (Array.isArray(select.item) && select.item.length!==0) || 
          select.item._id ||
          (select.edit==="create" && select.flag==="conjuntos") 
          ? <Btn key="btnconfirm" ref={btnconfirm} className="confirm" onClick={requestEdit}>
            <span>Confirmar</span>
          </Btn>
          : ""
        }
      </EditPanelStyle>
    </AdmPanel>

    {
      (select.edit==="create" && select.flag==='conjuntos') || 
      (select.edit==="create" && select.flag==="pages" && !Array.isArray(select.item)) ||
      (select.edit==="update" && !Array.isArray(select.item)) 
      ? <CadPage key="cadpage" select={select} dispatch={dispatch}/> 
      : <ListPages key="listpages" select={select} dispatch={dispatch}/>
    }

  </AdmStyle>);
};

const ListPages = ({select, dispatch}) => {
  const {pages} = useContext(PagesRequestContext);
  return <ul style={{gridArea: "listconju"}}>
    {pages.map(item => <li key={item._id}>
      <BoxMarkBase name={item.name} bg={item.color} flag="conjuntos" id={item._id} descricao={item.descricao} select={select} dispatch={dispatch}/>
      <ul className = "listpage">
        {item.pages.map(page => <li key={page._id}>
          <BoxMarkBase name={page.name} bg={"transparent"} flag="pages" val={page.link} id={page._id} select={select} dispatch={dispatch}/>
        </li>)}
      </ul>
    </li>)}
  </ul>;
};

const CadPage = ({select, dispatch}) => {
  const inputTreatment = async e => {
    const name = e.target.getAttribute('name');
    item_cad_new[name] = e.target.value;
    if(select.edit==="update") item_cad_new._id = select.item._id;
    if(select.flag=="pages" && select.edit=="create") item_cad_new.conjunto_id = select.item._id;
    console.log(item_cad_new);
  };
  return <CadPageStyle>
    <H3>{select.edit=="update" ? "Atualizar" : "Cadastrar"} {select.flag}</H3>
    {
      select.flag=="pages" 
      ? [
      <Input key="input_name" type="text" name="name" placeholder="nome da página" defaultValue={select.flag=="pages" && select.edit=="create" ? "" : select.item.name} onChange={inputTreatment}/>,
      <Input key="input_link" type="text" name="link" placeholder="link da página" defaultValue={select.flag=="pages" ? select.item.link : ""} onChange={inputTreatment}/>
      ] 
      : [
      <div key="input_row">
        <Input type="text" name="name" placeholder="escrito do conjunto" defaultValue={select.item.name} onChange={inputTreatment}/>
        <div><input type="color" name="color" defaultValue={select.item.color} onChange={inputTreatment}/></div>
      </div>,
      <TextArea key="textarea" rows={10} name="descricao" placeholder="descrição do conjunto" defaultValue={select.item.descricao} onChange={inputTreatment}/>
      ]
    }
    {
      select.flag=="conjuntos" && select.edit=="create" 
        ? 
      "" 
        : 
      <Btn onClick={()=>[dispatch({type: "reset"}), () => item_cad_new={}]}>Cancelar</Btn> 
    }
  </CadPageStyle>;
};

const Unauthenticated = () => {
  const {user, setUserMod} = useContext(AuthenticationContext);
  const name = useRef("");
  const password = useRef("");
  return (<UnauthenticatedStyle>
    <H2>
      <MdOutlineManageAccounts/>
      <span>Acesso ao gerenciamento</span>
    </H2>
    <Input type="text" placeholder="user" onChange={e=>{name.current = e.target.value}}/>
    <Input type="password" placeholder="senha" onChange={e=>{password.current = e.target.value}}/>
    <Submit type="submit" value="Acessar" onClick={e=> {
      e.preventDefault();
      if(name.current!="" && password.current!="") {
        setUserMod({
          name: name.current,
          password: password.current
        });
      }
    }}/>
    {user.msg!=null ? <p key="usermsg">{user.msg}</p> : ""}
  </UnauthenticatedStyle>);
};

export default function Adm() { 
  const {user} = useContext(AuthenticationContext);
  return user.exists ? <Authenticated key="authenticated"/> : <Unauthenticated key="unauthenticated"/>;
};
  