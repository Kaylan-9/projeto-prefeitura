import { useContext, useRef, useEffect, useCallback } from 'react';
import Input from '../input/Input';
import { EditContext } from '../../contexts/EditContext';
import { ContentContext, ContentContextType } from '../../contexts/ContentContext';
import request from '../../utils/request';
import FormStyle from './FormStyle';


type PageDataType = {
  _id?: string,
  name?: string,
  link?: string
};

const FormPage = () => {
  const {edit, dispatch} : any = useContext(EditContext);
  const {setResetContent, handleContents}: ContentContextType = useContext(ContentContext);
  const pagename = useRef<HTMLInputElement>(null!);
  const pagelink = useRef<HTMLInputElement>(null!);

  const handleForm = useCallback(async (e: any) => {
    e.preventDefault();
    let body: PageDataType = {};
    let name = ""; 
    let link = "";
    if(edit.mod==="u") {
      name = edit.item[0].name;
      link = edit.item[0].link;
    }

    const mode = edit.mod==="u" ? "update" : "create";
    const method = edit.mod==="u" ? "PUT" : "POST";

    body._id = edit.item[0]._id;
    if(name!==pagename.current.value && pagename.current.value!=="") body.name= pagename.current.value;
    if(link!==pagelink.current.value && pagename.current.value!=="") body.link= pagelink.current.value;

    await request("pages/"+mode, method, body);
    console.log(body);
    handleContents({type: "modifyItems"});
    setResetContent((oldResetContent: boolean) => !oldResetContent);
    dispatch({type: "reset"});
  }, [setResetContent]);

  useEffect(() => {
    if(edit.mod==="u") {
      const {name, link} = edit.item[0];
      pagename.current.value = name;
      pagelink.current.value = link;
    }
  }, [edit]);

  return <FormStyle>
    <div className="main">
      <Input ref={pagename} id="pagename" value="nome da página"/>
      <Input ref={pagelink} id="pagelink" value="link da página"/>
      {edit.mod==="u" ?
        <div className="btns">
          <input id="btnsecondary" type="submit" value="Cancelar" onClick={e => [e.preventDefault(), dispatch({type: "reset"})]}/>   
          <input id="btfirst" type="submit" value="Atualizar" onClick={handleForm}/>
        </div> :
        <input id="btfirst" type="submit" value="Adicionar" onClick={handleForm}/>   
      }
    </div>
  </FormStyle>;
}

export default FormPage;