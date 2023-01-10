import { useRef, useContext } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import request from '../../utils/request';
import { css } from '@emotion/css';
import { EditContext } from '../../contexts/EditContext';
import { ContentContext, ContentContextType } from '../../contexts/ContentContext';
import { text_content } from '../reports/Reports.style';


const FormAddInfo = ({area}: {area: string}) => {
  const editorRef = useRef<any>(null!);
  const {edit} = useContext(EditContext);
  const {setInfos}: ContentContextType = useContext(ContentContext);
  const initialText = "Digite o informe desejado!";

  const handleSend = async () => {
    if (editorRef.current) {
      const _content = editorRef.current.getContent();
      if(edit.mod==="c") {        
        await request("articles/create", 'POST', {_content});
      } else if(edit.mod==="u") { 
        const {_id} = edit.item[0];
        await request("articles/update", 'PUT', {_id, _content});
      }
      setInfos(await request('articles/store', 'GET'));
    }
  };

  const init = {
    height: 350,
    menubar: false,
    content_style: text_content,
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount'
    ],
    toolbar: 'undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify |'+
    'bullist numlist outdent indent | link image | forecolor backcolor emoticons | print preview media | customSend',
    setup: (editor: any) => {
      editor.ui.registry.addButton("customSend", {
        text: "Enviar para o sistema",
        onAction: handleSend
      })
    }
  };

  return <div 
    className={css`
      grid-area: ${area};
      width: 100%;
      h2 {
        text-align: center;
        margin-bottom: 50px;
      }
    `}>
    <h2>Crie um novo informe</h2>
    <Editor
      apiKey='pa4my3j5zn00jj35fn6v33epa2n1gfbl92h8gvt50u9t2bum'
      onInit={(_, editor: any) => editorRef.current = editor}
      initialValue={(edit.mod==="u" && edit.item[0]) ? edit.item[0]._content : `<p>${initialText}</p>`}
      init={init as {[key: string]: any}}
    />
  </div>;
}

export default FormAddInfo;