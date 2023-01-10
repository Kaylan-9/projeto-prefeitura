import { useContext, useEffect, useState, useRef, useCallback, WheelEvent } from 'react';
import { MdFavorite } from 'react-icons/md';
import { IPContext } from '../../contexts/IPContext';
import { ContentContext, ContentContextType, PageDataType } from '../../contexts/ContentContext';
import request from '../../utils/request';
import { ListPagesWithoutGroups, PageStyle } from './Pages.style';
import server from '../../utils/server';
import { css } from '@emotion/css';
import colors from '../../styles/colors';
import styled from '@emotion/styled';
import { ThemeProps } from '../../styles/theme';
import { useTheme } from '@emotion/react';
import { BsFillBookmarkXFill } from 'react-icons/bs';
import { EditContext } from '../../contexts/EditContext';
import LocalMarking from '../localmarking/LocalMarking';

export type PageType = {
  data : PageDataType,
  index: number,
  ip?: string,
  color?: string
};

export const Page = ({data, index, ip, color, className}: PageType & {className?: string}) => {
  const {_id, name, imagename, link} = data;
  const {select, setSelect, dispatch, edit} = useContext(EditContext);
  const {likes, mode, handleContents, setLikes}: ContentContextType & { likes: string[], setLikes: any}  = useContext(ContentContext); 
  const [isOnline, setIsOnline] = useState("");
  const theme: ThemeProps = useTheme();

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

  const liked = useCallback(async () => {
    const pageData = await request('pages/item', 'POST', {_id});
    handleContents({type: "mark", newItem: pageData, index});
    setLikes((oldLikes: string[]) =>  [...oldLikes, _id]);
    await request(`users/mark`, 'POST', {ip, _idpage: _id});
  }, [setLikes, handleContents]);

  const disliked = useCallback(async () => {
    handleContents({type: "markoff", id: _id});
    setLikes((oldLikes: string[]) => oldLikes.filter((id: string) =>
      id != _id
    ));
    await request(`users/markoff`, 'DELETE', {ip, _idpage: _id});
  }, [setLikes, handleContents]);

  const websiteisonline = useCallback(async (): Promise<void> => {
    const isThereHistoryStr: null | string = sessionStorage.getItem("isOnline");
    let isThereHistory: null | {[id: string]: {ok: boolean}} = isThereHistoryStr ? JSON.parse(isThereHistoryStr) : null;
    const data = isThereHistory==null || isThereHistory[_id]==null ? await request("pages/isonline", 'POST', { link }) : isThereHistory[_id];
    if(isThereHistory==null) sessionStorage.setItem("isOnline", JSON.stringify({[_id]: data})); 
    else if(isThereHistory!=null && isThereHistory[_id]==null) {
      isThereHistory[_id] = data;
      sessionStorage.setItem("isOnline", JSON.stringify(isThereHistory));
    }
    const state = await data.ok ? "on.line" : "off.line";
    setIsOnline(state);
  }, [setIsOnline]);

  useEffect(() => {
    websiteisonline();
  }, []);

  return (<PageStyle className={className}
    key={_id} 
    color={color}
    pagesmode={mode}
    src={`'${server}/images/${imagename}.jpeg'`}
  >
    <a href={link} target="blank">{name}</a>
    {((!likes.includes(_id) || mode==="bookmarks" || mode==="edit") ?
      (<div className="image">
        <a href={link} target="blank"></a>
        <div className="tools">
          {(mode==="edit" ? 
            ((edit.flag==="p") ?
              (<LocalMarking name="checkbox-page" setCheck={select[_id]} funcClick={handleChecked}/>) :
              null
            ) :
            null
          )}
          {mode!=="edit" ?
            (<button className="btn-like" onClick={() => {
              if(mode=="pages") {
                liked();
              } else if(mode=="bookmarks") {
                disliked();
              }
            }}>
              {(mode=="pages" ?
                (<MdFavorite/>) :
                (<BsFillBookmarkXFill/>)
              )}
            </button>) :
            null
          }
          <span className={css`
            color: ${isOnline=="on.line" ? theme?.colors?.tertiary : colors.red} !important;
          `}>
            {isOnline}
          </span>
        </div>
      </div>) :
      (<div className='container-dislike'>
        <button className="btn-dislike" onClick={disliked}>
          <BsFillBookmarkXFill/>
        </button>
      </div>)
    )}
  </PageStyle>);
}

export const PageWithGroups = styled(Page)`
  box-shadow: none;
  a {
    background-color: transparent;
  }
  .container-dislike {
    border-radius: 21px !important;
  }
  .image {
    border-radius: 21px !important;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
`;


const Pages = () => {
  const {ip}: {ip: string} = useContext(IPContext);
  const {mode, contents, handleContents}: ContentContextType = useContext(ContentContext);
  const [updateRef, setUpdateRef] = useState<number>(0);
  const timer = useRef(0);
  const refObj = useRef<HTMLElement>(null);

  const updateContent = useCallback(async () => {
    if(mode==='pages' || mode==='bookmarks') {
      const currentPageData = (await request((mode==="bookmarks" ? 'users/pages' : 'pages/store'), 'POST', {ip, n: contents.lists[mode].currentPage}));    
      const iDLastItemList = contents.lists[mode].content[contents.lists[mode].content.length-1]?._id;
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
    if(!contents.search) document.addEventListener("wheel", capturaScreenReference);
  }, [mode, updateRef, setUpdateRef, contents]);

  useEffect(() => {
    setUpdateRef(contents.lists[mode].currentPage);
    if(contents.lists[mode].currentPage===0) {
      updateContent();
    }
  }, [mode]);

  return ((mode==="pages" || mode==="bookmarks") ? (<section ref={refObj}>
    <ListPagesWithoutGroups className={css`grid-template-columns: repeat(minmax(150px, 1fr));`}>{
      contents.lists[mode][!contents.search ? "content" : "content_search"]
        .map((page: PageDataType | any, index: number) =>  
          <Page 
            key={page._id}
            data={page}
            index={index}
            ip={ip}
          />
    )}</ListPagesWithoutGroups>
  </section>) : null);
}

export default Pages;

