import { css } from '@emotion/css';
import { useTheme } from '@emotion/react';
import { FunctionComponent, ReactNode, useContext } from 'react';
import { BsGearWideConnected } from 'react-icons/bs';
import { IoMdMoon, IoMdSunny } from 'react-icons/io';
import { RiUserUnfollowFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { ModalContext } from '../../contexts/ModalContext';
import { ThemeToogleContext } from '../../contexts/ThemeToggleContext';
import { Button, LinkSt } from '../../styles/button';
import colors from '../../styles/colors';
import { ThemeProps } from '../../styles/theme';


interface NavItemModel {
  to?: any;
  onClick?: () => void;
  value?: string;
  Icon: React.FC;
  color?: string;
};

export const BtnTheme = () => {
  const {val_theme, setTheme} = useContext(ThemeToogleContext);
  const toggleTheme = () => {
    setTheme((value: string) => { 
      const response = value==="dark" ? "light" : "dark";
      sessionStorage.setItem("theme", JSON.stringify({theme: response}));
      return response;
    });
  };
  return <NavItem onClick={toggleTheme} Icon={val_theme==="dark" ? IoMdSunny : IoMdMoon}/>;
}

export const BtnLogOut = () => {
  const {user, setUserMod}: any = useContext(AuthContext);
  const logOut = () => {
    sessionStorage.removeItem("user");
    setUserMod({msg: 2});
  };
  return user.exists ?  <NavItem onClick={logOut} value="logout" Icon={RiUserUnfollowFill} color={colors.red}/> : null
}

export const BtnLogin = () => {
  const {setFormModal}: any = useContext(ModalContext);
  const {user}: any = useContext(AuthContext);
  const navigate = useNavigate();
  const navigateAdmin = () => {
    if(user.exists) navigate("/admin");        
    else setFormModal(true);
  };
  return <NavItem onClick={navigateAdmin} value="administrar" Icon={BsGearWideConnected}/>;
}


const NavItem: FunctionComponent<NavItemModel> = ({to, value, Icon, onClick, color}) => {
  const theme: ThemeProps = useTheme();
  const btnStyle = css`
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
    background-color: ${color ? color : theme?.colors?.secondary};
    color: white; 
    transition: background-color 500ms;
    transition: 1s;
    > svg > * {color: ${theme?.colors?.tertiary}}
    &:hover {
      transform: scale(1.1);
    }
  `;
  return <li>
    {onClick ?
      <Button className={btnStyle} onClick={onClick}>{value} <Icon/></Button> :
      <LinkSt className={btnStyle} to={to}>{value} <Icon/></LinkSt>
    }
  </li>;
};

export default NavItem;