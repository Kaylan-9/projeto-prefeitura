import { useContext, useEffect, useState, useCallback, useRef } from 'react';
import { ContentContext, PageDataType, ContentContextType, GroupDataType } from '../../contexts/ContentContext';
import request from '../../utils/request';
import { ListPagesWithGroups, PagesStyle, TitlePages } from './Pages.style';
import { PageWithGroups } from './Pages';
import { EditContext } from '../../contexts/EditContext';
import LocalMarking from '../localmarking/LocalMarking';


const PagesGroups = () => {
  const {mode, contents, handleContents}: ContentContextType = useContext(ContentContext);
  const [updateRef, setUpdateRef] = useState<number>(0);
  const timer = useRef(0);
  const refObj = useRef<HTMLElement>(null);
  const {select, setSelect, dispatch, edit} = useContext(EditContext);

  const updateContent = useCallback(async () => {
    if(mode==='groups' || mode==='edit') {
      const currentPageData = (await request('groups/pages/all', 'POST', {n: contents.lists[mode].currentPage}));    
      const iDLastItemList =  contents.lists.groups.content[contents.lists.groups.content.length-1]?._id;
      const iDLastItemReq = await currentPageData[currentPageData.length-1]?._id;

      if(iDLastItemReq!==undefined && iDLastItemReq!==iDLastItemList) {
        handleContents({type: "content", mode, content: currentPageData});
        setUpdateRef(oldRef=> oldRef+1);
      }
    }
  }, [contents, updateRef, setUpdateRef, mode]);

  const capturaScreenReference = useCallback(async () => {
    const {innerHeight} = window;
    const renderReference = (refObj.current?.getBoundingClientRect().y ?? 0);
    const idealHeight = innerHeight - 650;
    const time = 100;
    clearTimeout(timer.current);
    if(idealHeight>=renderReference) {
      const currentPageRelativeScroll = (Math.trunc((renderReference<0 ? renderReference*(-1) : 0)/443))+2;
      if(currentPageRelativeScroll>contents.lists[mode].currentPage && updateRef===contents.lists[mode].currentPage) {
        timer.current = setTimeout(async () => {        
          updateContent();
        }, time);
      }
    }   
  }, [contents, mode, updateRef, updateContent]);

  useEffect(() => {
    document.removeEventListener("wheel", capturaScreenReference);
    if(contents.search===false) document.addEventListener("wheel", capturaScreenReference);
  }, [mode, updateRef, setUpdateRef, contents]);

  useEffect(() => {
    setUpdateRef(contents.lists[mode].currentPage);
    if(contents.lists[mode].currentPage===0) {
      updateContent();
    }
  }, [mode]);

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

  return ((mode==="groups" || mode==="edit") ? (<section ref={refObj}>
    <ListPagesWithGroups>{
      contents.lists[mode].content.map((group) => (
      (mode==="edit" || group.pages.length!==0)
      ?
        (<PagesStyle key={group._id} color={group.color}>
          <TitlePages>
            {group.name.toLowerCase()}
            {((mode==="edit") ?
              ((edit.flag==="g" || (edit.flag==='p' && edit.mod==='c')) ?
                (<LocalMarking name="checkbox-group" setCheck={select[group._id]} funcClick={
                  e => handleChecked(e, group)}/>) :
                null
              ) : null
            )}
          </TitlePages>
          <ul>{
            group.pages.map((page: PageDataType, index: number) => 
              <PageWithGroups 
                key={page._id}
                data={page}
                index={index}
              />
            )
          }</ul>
        </PagesStyle>)
        : null
      ))
    }</ListPagesWithGroups>
  </section>) : null);
}

export default PagesGroups;
