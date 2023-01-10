import { useEffect, useContext, useCallback, useRef, FC } from 'react';
import { BiSearch } from 'react-icons/bi';
import { ContentContext, ContentContextType } from '../../contexts/ContentContext';
import request from '../../utils/request';
import SearchStyle from './SearchStyle';

const Search: FC = () => {
  const inputSearch = useRef<HTMLInputElement>(null);
  const { mode, contents, handleContents }: ContentContextType = useContext(ContentContext);

  const handleSearch = useCallback(async () => {
    const value: string = inputSearch.current?.value ?? "";
    const results = await request(`${mode}/search`, 'POST', { search: value });
    handleContents({type: "search", search: value, mode, content_search: results});
  }, [contents, mode]);

  useEffect(() => {
    inputSearch.current?.focus();
  }, []);

  return (mode!=="bookmarks") ? (<SearchStyle>
    <h3 className="message">
      Busque as páginas que você deseja com a barra de pesquisa e o menu de navegação.
    </h3>
    <div className='search'>
      <button type="button" onClick={handleSearch}>
        <BiSearch/>
      </button>
      <input type="text" placeholder={`Buscar por ${(mode==="pages") ? "Páginas" : "Grupos"}`} ref={inputSearch}/>
    </div>
  </SearchStyle>) : null;
}

export default Search;