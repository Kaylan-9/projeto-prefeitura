import { useContext, useEffect, useState, useCallback, useRef, WheelEvent } from 'react';
import { IPContext } from '../../contexts/IPContext';
import { ContentContext, handlePagesType, PageDataType, PagesDataType } from '../../contexts/ContentContext';
import request from '../../utils/request';
import { ListPagesWithGroups, PagesStyle, TitlePages } from './Pages.style';
import { PageWithGroups } from './Pages';
import { EditContext } from '../../contexts/EditContext';
import LocalMarking from '../localmarking/LocalMarking';
import { css } from '@emotion/css';

const PagesGroups = () => {
  const {pages, handlePages}: handlePagesType = useContext(ContentContext);
  const {select, setSelect, dispatch, edit} = useContext(EditContext);
  const {ip}: {ip: string} = useContext(IPContext);
  const refObj = useRef<HTMLElement>(null);
  const timer = useRef(0);

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

  const load_page_groups = useCallback(async () => {
    if(pages.history.groups.content.length==0) {
      if(pages.mode=="groups") {
        const pageGroupData = await Promise.all(await request('groups/pages/all', 'POST', {n: 0}));
        handlePages({type: "content", content: pageGroupData});
      }
    }
  }, [pages]);

  const load_page_edit = useCallback(async () => {
    if(pages.history.edit.content.length==0) {
      if(pages.mode=="edit") {
        const pageGroupData = await Promise.all(await request('groups/pages/all', 'POST', {n: 0}));
        handlePages({type: "content", content: pageGroupData});
      }
    }
  }, [pages]);

  const handleWheel = useCallback(async () => {
    if(pages.mode==="edit" || pages.mode==="groups") {
      const {scrollY} = window;
      
      const currentPageRelativeScroll = refObj.current?.querySelector("ul:last-child")?.scrollHeight ?? 0;
      const height = refObj.current?.querySelector("ul:last-child")?.clientHeight ?? 0;
      const idealHeight = currentPageRelativeScroll-height;

      const ms = 1050;

      if(scrollY>=idealHeight) {
        timer.current = setTimeout(async () => {         
          if(!pages.search) {
            const current_page_data = await Promise.all(await request('groups/pages/all', 'POST', {n: pages.currentPage}));
            handlePages({type: "content", content: current_page_data});
          }
        }, ms);
      }
    }    
  }, [handlePages, pages, refObj]);

  useEffect(() => {
  clearTimeout(timer.current);
    if(pages.mode==="groups" || pages.mode==="edit") document.addEventListener("scroll", handleWheel);
    else document.removeEventListener("scroll", handleWheel);
    load_page_groups();
    load_page_edit();
  }, [pages]);

  return ((pages.mode=="groups" || pages.mode=="edit") ? (<section ref={refObj}>
    <div className={css`
      position: sticky;
      top: 0;
      background-color: blue;
    `}>{pages.currentPage}</div>
    <ListPagesWithGroups>{
      pages.content?.map((group: PagesDataType | any) => ((
        pages.mode==="edit" || group.pages.length!==0
      ) ?
        (<PagesStyle key={group._id} color={group.color}>
          <TitlePages>
            {group.name.toLowerCase()}
            {((pages.mode==="edit") ?
              ((edit.flag==="g" || (edit.flag==='p' && edit.mod==='c')) ?
                (<LocalMarking name="checkbox-group" setCheck={select[group._id]} funcClick={e => handleChecked(e, group)}/>) :
                null
              ) : null
            )}
          </TitlePages>
          <ul>{group.pages.map((page: PageDataType) => <PageWithGroups 
            key={page._id}
            data={page}
            ip={ip}
          />)}</ul>
        </PagesStyle>)
        : null
      ))
    }</ListPagesWithGroups>
  </section>) : null);
}

export default PagesGroups;
