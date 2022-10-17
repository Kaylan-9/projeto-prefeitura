import {styled, color, H2, H3, btn, BoxRadio, BoxCheck} from '../styles/styles';
import {BsFillGearFill} from 'react-icons/bs';
import {MdOutlineManageAccounts} from 'react-icons/md';
import {useState, useEffect} from 'react';

const Btn = styled.button`
  ${btn}
  cursor: pointer;
  justify-content: center;
  margin: 0px auto;
  margin-top: 10px;
  font-size: 15px !important;
  &:hover {
    background-color: ${color.dois};
  }
`;

const EditPanelStyle = styled.div`
  background: ${color.tres};
  border-radius: 15px; 
  min-width: 255px;
  padding: 20px;
  > h2 {
    align-items: center;
    color: ${color.light};
    display: inline-flex;
    gap: 10px;
  }
  > h3 {color: ${color.facebook}}
`;

const EditPanel = styled(({className}) => {
  const [pages, setPages] = useState([]);
  const [msg, setMsg] = useState([]);
  let items_selecionados = [];

  useEffect(async () => {
    let req_config = {};
    req_config.method = 'POST';
    req_config.headers = {'Content-Type': 'application/json', 'Accept': 'application/json'};
    const res = await fetch('http://localhost:8080/pages', req_config);
    const data = await res.json();
    setPages(data);
  }, [msg]);

  return (<div {...{className}}>
    <EditPanelStyle style={{gridArea: "editpanel"}}>
      <H2>
        <BsFillGearFill/>
        <span>Gerenciar páginas</span>
      </H2>

      <H3>Qual deles?</H3>
      <BoxRadio nome="Conjuntos" pertence="type_edit"/>
      <BoxRadio nome="Páginas" pertence="type_edit"/>
      <br/>
      <Btn>adicionar</Btn>

      <Btn onClick={async () => {
        let req_config = {};
        req_config.method = 'POST';
        req_config.body = JSON.stringify({items_selecionados});
        req_config.headers = {'Content-Type': 'application/json', 'Accept': 'application/json'};
        const res = await fetch(`http://localhost:8080/remove/pages/`, req_config);
        const url_tmp = URL.createObjectURL(await res.blob());
        setMsg(url_tmp);
      }}>remover</Btn>

      <Btn>editar</Btn>
      
    </EditPanelStyle>
    <ul style={{gridArea: "listconju"}}>{
      pages.map(item => <li>
        <BoxCheck nome={item.name} pertence="pages" style={{backgroundColor: item.color}} click={() => {
          items_selecionados.push(item._id);
        }}/>
      </li>)}
    </ul>
  </div>);
})`
  display: grid;
  gap: 25px;
  grid-template-areas: 'editpanel listconju';
  grid-template-columns: min-content auto;
  > ul {
    align-items: center;
    display: inline-flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 25px;
    justify-content: center;
    > li {min-width: 200px}
  }
`;


const AdmStyle = styled.div`
  align-items: center;
  border-radius: 15px;
  box-sizing: border-box;
  margin: 0px auto;
  max-width: ${props => props.maxsize ? `${props.maxsize}px` : "1250px"};
`;

const Input = styled.input`
  ${btn}
  background-color: ${color.um};
  color: ${color.facebook};
  font-size: 17px;
  font-weight: bold;
  text-align: center;
  margin: 0px auto;
  margin-bottom: 10px;
  max-width: 260px;
`;

const Submit = styled(Input)`
  background-color: transparent;
  border: solid 2px ${color.seis};
  color: ${color.seis};
  font-size: 15px;
  padding: 8px 15px;
  cursor: pointer;
  &:hover {
    background-color: ${color.seis};
    color: ${color.white};
    transition: 1s;
  }
`;

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

export default () => <AdmStyle>
  <EditPanel/>
  {/* <Form/> */}
</AdmStyle>;