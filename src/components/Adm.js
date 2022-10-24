import {useState, useLayoutEffect, useRef, useContext, useEffect} from 'react';
import {PagesRequestContext} from "../contexts/PagesRequest";
import {AuthenticationContext} from "../contexts/Authentication";
import {H2, H3, Btn, BoxRadio, Input, Submit, BoxMarking, TextArea} from '../styles/styles';
import {AdmStyle, EditPanelStyle, Selectors, CadPageStyle, UnauthenticatedStyle} from '../styles/Adm.styles';
import {BsFillGearFill} from 'react-icons/bs';
import {MdOutlineManageAccounts} from 'react-icons/md';
const url = `http://localhost:8080`;

const Authenticated = () => {
  const {pages, setUpdatePages} = useContext(PagesRequestContext);
  const {setUserMod} = useContext(AuthenticationContext);

  const btnconfirm = useRef(null);
  const input = {
    page : {
      nome: useRef(null),
      link: useRef(null)
    },
    conjunto : {
      nome: useRef(null),
      descricao: useRef(null),
      color: useRef(null)
    }
  };

  const [typeselectedit, setYpeselectedit] = useState('');
  const [typeselect, setYpeselect] = useState('');
  const [select, setSelect] = useState(false);
  let inputs_cadpage_new = {};
  let inputs_cadconju_new = {};
  let items_selecionados = [];

  useLayoutEffect(() => {
    btnconfirm.current.display = "none";
  }, [select]);

  const BoxMarkBase = ({nome, bg, typeselectflag, val, id, descricao}) => ( 
    <BoxMarking 
      nome={nome} 
      pertence="pages" 
      style={{backgroundColor: bg}}
      active={(typeselectedit && typeselect)!='' ? (typeselect==(typeselect=="pages" && typeselectedit=="create" ? (typeselectflag=="conjuntos" ? "pages" : "conjuntos") : typeselectflag) ? 1 : 0) : 0}  
      type={typeselectedit=="update" || typeselectedit=="create" && typeselect=="pages" ? "radio" : "checkbox"}
      change = {() => {
        if(typeselectedit=="remove") {
          if(items_selecionados.includes(val)) items_selecionados.splice(items_selecionados.indexOf(val), 1);
          else items_selecionados.push(val); 
        } else if(typeselectedit=="update") {             
          setSelect(typeselect=="conjuntos" ? {nome, color: bg, descricao: descricao, _id: val} : {nome, link: val, _id: id}); 
        } else if(typeselectedit=="create" && typeselect=="pages") {
          setSelect({nome, color: bg, descricao: descricao, _id: val});
        } 
      }}
    />
  );

  return (<AdmStyle>
    
    <EditPanelStyle>
      <Btn className="confirm" onClick={() => [sessionStorage.removeItem("user"), setUserMod({msg: 2})]}>
        Sair
      </Btn>
      <H3>
        <BsFillGearFill/>
        <span>Gerenciar</span>
      </H3>
      <div>
        <H3>Manipular</H3>
        <Selectors>
          <BoxRadio nome="Conjuntos" pertence="type_edit" change={()=>[setYpeselect('conjuntos'), setSelect(false)]}/>
          <BoxRadio nome="Páginas" pertence="type_edit" change={()=>[setYpeselect('pages'), setSelect(false)]}/>
        </Selectors>
      </div>
      <div>
        <Selectors>
          <BoxRadio nome="Editar" pertence="tool_edit" change={()=>[setYpeselectedit('update'), setSelect(false)]}/>
          <BoxRadio nome="Remover" pertence="tool_edit" change={()=>[setYpeselectedit('remove'), setSelect(false)]}/>  
          <BoxRadio nome="Adicionar" pertence="tool_edit" change={()=>{
            setYpeselectedit('create');
            setSelect(false);
            if(typeselect=="conjuntos") {
              input.conjunto.nome.current.value = "";
              input.conjunto.color.current.value = "";
              input.conjunto.descricao.current.value = "";
            }
          }}/>  
        </Selectors>
      </div>
      <Btn ref={btnconfirm} className="confirm" onClick={async () => {
        let reqconfig = {
          method: 'POST',
          headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
        };


        reqconfig.body= JSON.stringify(
          ((typeselectedit=="create" || typeselectedit=="update") ?
          (typeselect=="pages" ? inputs_cadpage_new : inputs_cadconju_new) 
          : items_selecionados)
        );
        const res = await fetch(`${url}/${typeselectedit}/${typeselect}/`, reqconfig);
        const finaly_ = await res.json();

        setUpdatePages(finaly_);
        setSelect(false);
        if(typeselectedit=="create" || typeselectedit=="update") {
          if(typeselect=="conjuntos"){
            input.conjunto.nome.current.value = "";
            input.conjunto.color.current.value = "";
            input.conjunto.descricao.current.value = "";
          } else if(typeselect=="pages") {
            input.page.nome.current.value = "";
            input.page.link.current.value = "";
          }
        }
      }}>
        <span>Confirmar</span>
      </Btn>
    </EditPanelStyle>

    {
      (typeselectedit=="create" && typeselect=='conjuntos') || 
      (typeselectedit=="create" && typeselect=="pages" && select) ||
      (typeselectedit=="update" && select) 
    ?
    <CadPageStyle>
      <H3>
        {typeselectedit=="update" ? "Atualizar" : "Cadastrar"}{" "}
        {typeselect=="pages" ? '' : "conjunto de"} páginas
      </H3>
      {typeselect=="pages" ?
        [
          <Input ref={input.page.nome} type="text" placeholder="nome da página" defaultValue={typeselectedit=="create" ? "" : select.nome} onChange={(e)=>{
            inputs_cadpage_new.nome = e.target.value;
            if(typeselectedit=="update") inputs_cadpage_new._id = select._id;
            else if(typeselectedit=="create") inputs_cadpage_new.conjunto_id = select._id;
          }}/>,
          <Input ref={input.page.link} type="text" placeholder="link da página" defaultValue={typeselectedit=="create" ? "" : select.link} onChange={(e)=>{
            inputs_cadpage_new.link = e.target.value;
            if(typeselectedit=="update") inputs_cadpage_new._id = select._id;
            else if(typeselectedit=="create") inputs_cadpage_new.conjunto_id = select._id;
          }}/>
        ]
      :
        [
          <div>
            <Input ref={input.conjunto.nome} type="text" placeholder="escrito do conjunto" defaultValue={select.nome} onChange={(e)=>{
              inputs_cadconju_new.name = e.target.value;
              inputs_cadconju_new._id = select._id;
            }}/>
            <div><input ref={input.conjunto.color} type="color" defaultValue={select.color} onChange={(e)=>{
              inputs_cadconju_new.color = e.target.value;
              inputs_cadconju_new._id = select._id;
            }}/></div>
          </div>,
          <TextArea rows={10} ref={input.conjunto.descricao} placeholder="descrição do conjunto" defaultValue={select.descricao} onChange={(e)=>{
            inputs_cadconju_new.descricao = e.target.value;
            inputs_cadconju_new._id = select._id;
          }}/>
        ]
      }
      { typeselect=="conjuntos" && typeselectedit=="create" ? "" :
      <Btn onClick={()=>setSelect(false)}>Cancelar</Btn> }
    </CadPageStyle>
    :
    <ul style={{gridArea: "listconju"}}>
      {pages.map(item => <li key={item._id}>
        <BoxMarkBase nome={item.name} bg={item.color} typeselectflag="conjuntos" val={item._id} descricao={item.descricao}/>
        <ul className = "listpage">
          {item.pages.map(page => <li key={page._id}>
            <BoxMarkBase nome={page.name} bg={"transparent"} typeselectflag="pages" val={page.link} id={page._id}/>
          </li>)}
        </ul>
      </li>)}
    </ul>
    }

  </AdmStyle>);
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
    <Input type="text" placeholder="user" onChange={(e)=>{name.current = e.target.value}}/>
    <Input type="password" placeholder="senha" onChange={(e)=>{password.current = e.target.value}}/>
    <Submit type="submit" value="Acessar" onClick={(e)=> {
      e.preventDefault();
      if(name.current!="" && password.current!="") setUserMod({
        name: name.current,
        password: password.current
      });
    }}/>
    {user.msg!=null ? <p key="usermsg">{user.msg}</p> : ""}
  </UnauthenticatedStyle>);
};

export default () => { 
  const {user} = useContext(AuthenticationContext);
  return user.exists ? <Authenticated/> : <Unauthenticated/>;
};
  