import { ReactNode } from 'react';
import HeaderStyle from './HeaderStyle';


const Header = ({children, search} : {children: ReactNode, search?: ReactNode}) => {
  return <HeaderStyle>
    <a id='logo' href="/"><span>ESP TEC</span></a>
    {search}
    <ul id='links'>{children}</ul>
  </HeaderStyle>;
}

export default Header;
