import { useContext, useEffect, useState } from 'react';
import { IPContext } from '../../contexts/IPContext';
import { ContentContext, PageDataType, PagesDataType } from '../../contexts/ContentContext';
import request from '../../utils/request';
import { ListPagesWithGroups, PagesStyle, PageStyle, TitlePages } from './Pages.style';

import server from '../../utils/server';
import { css } from '@emotion/css';
import colors from '../../styles/colors';
import LocalMarking from '../localmarking/LocalMarking';
import { EditContext } from '../../contexts/EditContext';

export type PageType = {
  data: {
    _id: string, 
    name: string,
    imagename: string,
    link: string,
  }
  ip?: string,
  color?: string
};

const Page = ({data, color}: PageType) => {
  const {_id, name, imagename, link} = data;
  const {select, setSelect, dispatch, edit} = useContext(EditContext);
  const [isOnline, setIsOnline] = useState("");

  const handleChecked = (e:  React.ChangeEvent<HTMLInputElement>) => {  
    const {checked} = e.target;
    let item;
    if(edit.mod==="d") { 
      setSelect((oldSelect: any) => ({...oldSelect, [_id]: checked}));
      item = _id;
    } else if(edit.mod==="u") { 
      setSelect({[_id]: checked});
      item = data;
    } 

    dispatch({type: "item", item});
  }

  useEffect(() => {
    async function websiteisonline(): Promise<void> {
      const data = await request("pages/isonline", 'POST', { link });
      const state = data.ok ? "on.line" : "off.line";
      setIsOnline(state);
    }
    websiteisonline();
  }, []);

  return <PageStyle 
    key={_id} 
    color={color}  
    src={`"${server}/images/${imagename}.jpeg"`}
  >
    <a href={link} target="blank">{name}</a>
    <a href={link} target="blank" className="image"></a>
    <div className="tools">
      {
        edit.flag==="p" ?
        <LocalMarking name="checkbox-page" setCheck={select[_id]} funcClick={handleChecked}/> :
        null
      }
      <span className={css`
        color: ${isOnline==="on.line" ? colors.green : colors.red} !important;
      `}>{isOnline}</span>
    </div>
  </PageStyle>;
}

const Pages = () => {
  const {ip}: {ip: string} = useContext(IPContext);
  const {pages}: {pages: PageDataType[]} = useContext(ContentContext);
  const {select, setSelect, dispatch, edit} = useContext(EditContext);

  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>, data: any) => { 
    const {checked} = e.target;
    let item;
    if(edit.mod==="d") { 
      setSelect((oldSelect: any) => ({...oldSelect, [data._id]: checked}));
      item = data._id;
    } else if(edit.mod==="u") { 
      setSelect({[data._id]: checked});
      item = data;
    } else if(edit.mod==="c") {
      setSelect({[data._id]: checked});
      item = data._id;
    }

    dispatch({type: "item", item});
  };

  return <section>
    <ListPagesWithGroups>{
      pages.map((item: PagesDataType | any) => 
        <PagesStyle key={item._id} color={item.color}>
          <TitlePages>
            {item.name}
            {
              edit.flag==="g" || (edit.flag==='p' && edit.mod==='c') ?
              <LocalMarking name="checkbox-group" setCheck={select[item._id]} funcClick={e => handleChecked(e, item)}/> :
              null
            }
          </TitlePages>
          <ul>{
            item.pages.map((page: PageDataType | any) => 
              <Page key={page._id} data={page} ip={ip}/>
            )
          }</ul>
        </PagesStyle>
      )
    }</ListPagesWithGroups>
  </section>;
}

export default Pages;
