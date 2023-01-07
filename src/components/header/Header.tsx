import { ReactNode } from 'react';
import HeaderStyle from './HeaderStyle';


const Header = ({children} : {children: ReactNode}) => {
  return <HeaderStyle>
    <a id='logo' href="/"><span>ESP TEC</span></a>
    <ul id='links'>{children}</ul>
  </HeaderStyle>;
}

export default Header;
