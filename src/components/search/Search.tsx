import {FiSearch} from 'react-icons/fi'
import {FunctionComponent, useContext, useRef, useCallback } from 'react';
import { ContentContext, handlePagesType } from '../../contexts/ContentContext';
import SearchStyle from './Search.style';
import request from '../../utils/request';


const Search: FunctionComponent<{}> = () => {
  const searchInput = useRef<HTMLInputElement>(null);
  const {pages, handlePages}: handlePagesType = useContext(ContentContext);
  const handleSearch = useCallback(async () => {
    const searchText = searchInput.current?.value;
    const searchData = await request(`${pages.mode}/search`, 'POST', {search: searchText});
    handlePages({type: "search", search: searchText, content: searchData});
  }, [searchInput, pages]);

  return (pages.mode!=="bookmarks" ? (<SearchStyle className='search'> 
    <button className='search-btn' onClick={handleSearch}>
      <FiSearch/>
    </button>
    <input className='search-input'
      ref={searchInput} 
      type="text" 
      placeholder={`Pesquise ${ pages.mode==="groups" ? "os grupos desejados" : "as páginas desejadas"}`}
    />
  </SearchStyle>) : null);
};
 
export default Search;