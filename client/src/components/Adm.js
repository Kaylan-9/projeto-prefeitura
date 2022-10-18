import {styled, color, H2, H3, Btn, BoxRadio, Input, Submit, BoxMarking, TextArea} from '../styles/styles';
import {AdmStyle, EditPanelStyle, Selectors, SelectorsTool, CadPageStyle} from '../styles/Adm.styles';
import {BsFillGearFill} from 'react-icons/bs';
import {MdOutlineManageAccounts} from 'react-icons/md';
import {useState, useEffect} from 'react';

const EditPanel = () => {
  const [pages, setPages] = useState([]);
  const [typeselectedit, setYpeselectedit] = useState('');
  const [typeselect, setYpeselect] = useState('');
  const [selectupdate, setSelectupdate] = useState(false);
  const [msg, setMsg] = useState([]);
  const [inputs_cad, setInputs_cad] = useState({});

  let items_selecionados = [];
  let inputs_cadpage_new = {};
  let inputs_cadconju_new = {};

  useEffect(async () => {
    let req_config = {};
    req_config.method = 'POST';
    req_config.headers = {'Content-Type': 'application/json', 'Accept': 'application/json'};
    const res = await fetch('http://localhost:8080/pages', req_config);
    const data = await res.json();
    setPages(data);
  }, [msg]);

  const BoxMarkBase = ({nome, bg, typeselectflag, val, id, descricao}) => ( 
    <BoxMarking nome={nome} pertence="pages" style={{backgroundColor: bg}}
    active={(typeselectedit && typeselect)!='' ? (typeselect==typeselectflag ? 1 : 0) : 0}  
    type={typeselectedit=="update" ? "radio" : "checkbox"}
    change = {() => {
      if(!items_selecionados.includes(val)) { 
        if(typeselectedit=="update") { 
          setSelectupdate(true);
          items_selecionados = [];

          setInputs_cad((typeselect=="conjuntos" ?
          {
            nome,
            color: bg,
            descricao: descricao,
            _id: val
          }
          :
          {
            nome,
            link: val,
            _id: id,
          }
          ));
        }
        items_selecionados.push(val);
      }
      else items_selecionados.splice(items_selecionados.indexOf(val), 1);
    }}/>
  );

  return (<AdmStyle>
    <EditPanelStyle style={{gridArea: "editpanel"}}>
      <H2>
        <BsFillGearFill/>
        <span>Gerenciar páginas</span>
      </H2>
      <div>
        <H3>Manipular</H3>
        <Selectors>
          <BoxRadio nome="Conjuntos" pertence="type_edit" change={()=>setYpeselect('conjuntos')}/>
          <BoxRadio nome="Páginas" pertence="type_edit" change={()=>setYpeselect('pages')}/>
        </Selectors>
      </div>
      <div>
        <SelectorsTool>
          <BoxRadio nome="Editar" pertence="tool_edit" change={()=>setYpeselectedit('update')}/>
          <BoxRadio nome="Remover" pertence="tool_edit" change={()=>setYpeselectedit('remove')}/>  
          <BoxRadio nome="Adicionar" pertence="tool_edit" change={()=>setYpeselectedit('create')}/>  
        </SelectorsTool>

        <Btn className="btnadd" onClick={()=>console.log(items_selecionados)}> Ver </Btn>

        <Btn className="confirm" style={{display: (typeselectedit!='' ? 'flex' : 'none')}} onClick={async () => {
          let req_config = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
          };

          req_config.body= JSON.stringify(
            (typeselectedit==("create" || "update") ?
              (typeselect=="pages" ? {...inputs_cadpage_new} : {...inputs_cadconju_new}) 
            : {items_selecionados})
          );

          const res = await fetch(`http://localhost:8080/${typeselectedit}/${typeselect}/`, req_config);
          const finaly_ = await res.json();
          console.log(finaly_);
          setMsg(finaly_);
        }}>
          <span>Confirmar</span>
        </Btn>

      </div>

    </EditPanelStyle>

    { ((typeselectedit=="create" && typeselect!='') || (typeselectedit=="update" && selectupdate)) ?
    <CadPageStyle>
      <H3>
        {typeselectedit=="update" ? "Atualizar" : "Cadastrar"}{" "}
        {typeselect=="pages" ? '' : "conjunto de"} páginas
      </H3>
      {typeselect=="pages" ?
        [
          <Input type="text" placeholder="nome da página" defaultValue={inputs_cad.nome} onChange={(e)=>{inputs_cadpage_new.nome = e.target.value;}}/>,
          <Input type="text" placeholder="link da página" defaultValue={inputs_cad.link} onChange={(e)=>{inputs_cadpage_new.link = e.target.value;}}/>
        ]
      :
        [
          <div>
            <Input type="text" placeholder="escrito do conjunto" defaultValue={inputs_cad.nome} onChange={(e)=>{inputs_cadconju_new.nome = e.target.value;}}/>
            <div><input type="color" defaultValue={inputs_cad.color} onChange={(e)=>{inputs_cadconju_new.color = e.target.value;}}/></div>
          </div>,
          <TextArea placeholder="descrição do conjunto" defaultValue={inputs_cad.descricao} onChange={(e)=>{inputs_cadconju_new.descricao = e.target.value;}}/>
        ]
      }
      <Btn onClick={()=>{
        setSelectupdate(false);
        setInputs_cad({});
      }}>Cancelar</Btn>
    </CadPageStyle>
    :
    <ul style={{gridArea: "listconju"}}>{
      pages.map(item => <li>
        <BoxMarkBase nome={item.name} bg={item.color} typeselectflag="conjuntos" val={item._id} descricao={item.descricao}/>
        <ul className = "listpage">
          {Object.entries(item.pages).map(([name, link]) => <li>
            <BoxMarkBase nome={name} bg={"transparent"} typeselectflag="pages" val={link} id={item._id}/>
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
  