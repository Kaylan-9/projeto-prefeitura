import { useContext, useRef, useEffect } from 'react';
import Input, { InputColor } from '../input/Input';
import { EditContext } from '../../contexts/EditContext';
import { ContentContext } from '../../contexts/ContentContext';
import request from '../../utils/request';
import FormStyle from './Form.style';

const FormGroup = () => {
  const {edit, dispatch} : any = useContext(EditContext);
  const {setPages} = useContext(ContentContext);
  const groupname = useRef<HTMLInputElement>(null!);
  const groupdescricao = useRef<HTMLInputElement>(null!);
  const groupcolor = useRef<HTMLInputElement>(null!);
  const handleForm = async (e: any) => {
    e.preventDefault();
    const mode = edit.mod==="u" ? "update" : "create";
    const method = edit.mod==="u" ? "PUT" : "POST";

    let body: {
      _id?: string,
      name?: string,
      descricao?: string,
      color?: string
    } = {};

    if(edit.mod==="u") {
      const {_id, name, descricao, color} = edit.item[0];
      body._id = _id;
      if(name!==groupname.current.value) body.name= groupname.current.value;
      if(descricao!==groupdescricao.current.value) body.descricao= groupdescricao.current.value;
      if(color!==groupcolor.current.value) body.color= groupcolor.current.value;
    }
    if(edit.mod==="c") {
      if(groupname.current.value!=="") body.name= groupname.current.value;
      if(groupdescricao.current.value!=="") body.descricao= groupdescricao.current.value;
      if(groupcolor.current.value!=="") body.color= groupcolor.current.value;
    } 

    await request("groups/"+mode, method, body);
    setPages(await request('groups/pages/all', 'GET'));
    dispatch({type: "reset"});
  };
  
  useEffect(() => {
    if(edit.mod==="u") {
      const {name, descricao, color} = edit.item[0];
      groupname.current.value = name;
      groupdescricao.current.value = descricao;
      groupcolor.current.value = color;
    }
  }, [edit]);

  return <FormStyle css={``}>
    <div className="main">
      <Input ref={groupname} id="groupname" value="nome do grupo"/>
      <Input ref={groupdescricao} id="groupdescricao" value="descrição do grupo"/>
      <InputColor ref={groupcolor} name="cor do grupo"/>
      {edit.mod==="u" ?
        <div className="btns">
          <input id="btnsecondary" type="submit" value="Cancelar" onClick={e => [e.preventDefault(), dispatch({type: "reset"})]}/>   
          <input id="btnfirst" type="submit" value="Atualizar" onClick={handleForm}/>
        </div> :
        <input id="btnfirst" type="submit" value="Adicionar" onClick={handleForm}/>   
      }
    </div>
  </FormStyle>;
}

export default FormGroup;