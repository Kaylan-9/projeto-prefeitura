import {styled, color, H2, H3, Btn, BoxRadio, Input, Submit, BoxMarking, TextArea} from '../styles/styles';
import {AdmStyle, EditPanelStyle, Selectors, CadPageStyle} from '../styles/Adm.styles';
import {BsFillGearFill} from 'react-icons/bs';
import {MdOutlineManageAccounts} from 'react-icons/md';
import {useState, useEffect, useRef, useCallback} from 'react';
const url = `http://localhost:8080`;

const EditPanel = () => {
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

  const [pages, setPages] = useState([]);
  const [typeselectedit, setYpeselectedit] = useState('');
  const [typeselect, setYpeselect] = useState('');
  const [select, setSelect] = useState(false);
  const [msg, setMsg] = useState([]);
  const [inputs_cad, setInputs_cad] = useState({});
  let items_selecionados = [];
  let inputs_cadpage_new = {};
  let inputs_cadconju_new = {};

  useEffect(async () => {
    let req_config = {};
    req_config.method = 'POST';
    req_config.headers = {'Content-Type': 'application/json', 'Accept': 'application/json'};
    const res = await fetch(`${url}/pages`, req_config);
    const data = await res.json();
    setPages(data);
  }, [msg]);

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
          if(items_selecionados.length>=1) setSelect(true);
          else setSelect(false);
        } else if(typeselectedit=="update") {             
          setInputs_cad((typeselect=="conjuntos" ? {nome, color: bg, descricao: descricao, _id: val} : {nome, link: val, _id: id}));
          setSelect(true); 
        } else if(typeselectedit=="create" && typeselect=="pages") {
          setInputs_cad({nome, color: bg, descricao: descricao, _id: val});
          setSelect(true);
        } 
      }}
    />
  );

  return (<AdmStyle>
    <EditPanelStyle style={{gridArea: "editpanel"}}>
      <H3>
        <BsFillGearFill/>
        <span>Gerenciar</span>
      </H3>
      <div>
        <H3>Manipular</H3>
        <Selectors>
          <BoxRadio nome="Conjuntos" pertence="type_edit" change={()=>{
            setYpeselect('conjuntos');
            setSelect(false);
            setInputs_cad({});
          }}/>
          <BoxRadio nome="Páginas" pertence="type_edit" change={()=>{
            setYpeselect('pages');
            setSelect(false);
            setInputs_cad({});
          }}/>
        </Selectors>
      </div>
      <div>
        <Selectors>
          <BoxRadio nome="Editar" pertence="tool_edit" change={()=>{
            setYpeselectedit('update');
            setSelect(false);
            setInputs_cad({});
          }}/>
          <BoxRadio nome="Remover" pertence="tool_edit" change={()=>{
            setYpeselectedit('remove');
            setSelect(false);
            setInputs_cad({});
          }}/>  
          <BoxRadio nome="Adicionar" pertence="tool_edit" change={()=>{
            setYpeselectedit('create');
            setSelect(false);
            setInputs_cad({});
            if(typeselect=="conjuntos") {
              input.conjunto.nome.current.value = "";
              input.conjunto.color.current.value = "";
              input.conjunto.descricao.current.value = "";
            }
          }}/>  
        </Selectors>

        {typeselectedit!='' && (select || (typeselectedit=="create" && typeselect=="conjuntos")) ?
          <Btn className="confirm" onClick={async () => {
            let req_config = {
              method: 'POST',
              headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
            };

            req_config.body= JSON.stringify(
              ((typeselectedit=="create" || typeselectedit=="update") ?
                (typeselect=="pages" ? {...inputs_cadpage_new} : {...inputs_cadconju_new}) 
              : {items_selecionados})
            );

            const res = await fetch(`${url}/${typeselectedit}/${typeselect}/`, req_config);
            const finaly_ = await res.json();
            console.log(finaly_);
            setMsg(finaly_);
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
        :
          ""
        }

      </div>

    </EditPanelStyle>

    { ((typeselectedit=="create" && typeselect=='conjuntos') || (typeselectedit=="create" && typeselect=="pages" && select) || (typeselectedit=="update" && select)) ?
    <CadPageStyle>
      <H3>
        {typeselectedit=="update" ? "Atualizar" : "Cadastrar"}{" "}
        {typeselect=="pages" ? '' : "conjunto de"} páginas
      </H3>
      {typeselect=="pages" ?
        [
          <Input ref={input.page.nome} type="text" placeholder="nome da página" defaultValue={typeselectedit=="create" ? "" : inputs_cad.nome} onChange={(e)=>{
            inputs_cadpage_new.nome = e.target.value;
            if(typeselectedit=="update") inputs_cadpage_new._id = inputs_cad._id;
            else if(typeselectedit=="create") inputs_cadpage_new.conjunto_id = inputs_cad._id;
          }}/>,
          <Input ref={input.page.link} type="text" placeholder="link da página" defaultValue={typeselectedit=="create" ? "" : inputs_cad.link} onChange={(e)=>{
            inputs_cadpage_new.link = e.target.value;
            if(typeselectedit=="update") inputs_cadpage_new._id = inputs_cad._id;
            else if(typeselectedit=="create") inputs_cadpage_new.conjunto_id = inputs_cad._id;
          }}/>
        ]
      :
        [
          <div>
            <Input ref={input.conjunto.nome} type="text" placeholder="escrito do conjunto" defaultValue={inputs_cad.nome} onChange={(e)=>{
              inputs_cadconju_new.name = e.target.value;
              inputs_cadconju_new._id = inputs_cad._id;
            }}/>
            <div><input ref={input.conjunto.color} type="color" defaultValue={inputs_cad.color} onChange={(e)=>{
              inputs_cadconju_new.color = e.target.value;
              inputs_cadconju_new._id = inputs_cad._id;
            }}/></div>
          </div>,
          <TextArea ref={input.conjunto.descricao} placeholder="descrição do conjunto" defaultValue={inputs_cad.descricao} onChange={(e)=>{
            inputs_cadconju_new.descricao = e.target.value;
            inputs_cadconju_new._id = inputs_cad._id;
          }}/>
        ]
      }
      { typeselect=="conjuntos" && typeselectedit=="create" ? "" :
      <Btn onClick={()=>{
        setSelect(false);
        setInputs_cad({});
      }}>Cancelar</Btn> }
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
    </ul>}

  </AdmStyle>);
};


const Form = styled(({className}) => (<form {...{className}}>
  <H2>
    <MdOutlineManageAccounts/>
    <span>Acesso ao gerenciamento</span>
  </H2>
  <Input type="text" placeholder="user"/>
  <Input type="password" placeholder="senha"/>
  <Submit type="submit" value="Acessar"/>
</form>))`
  display: grid;
  flex-direction: column;
  > h2 {
    align-items: center;
    display: inline-flex;
    gap: 10px;
    margin: 0px auto;
    > * {color: ${color.light}}
  }
`;

const Adm = EditPanel;
export default () => <Adm/>;
  