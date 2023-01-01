import {FunctionComponent, useContext} from 'react';
import AboutStyle from "./pages.style";
import Header from "../components/header/Header";
import NavItem, { BtnLogin, BtnLogOut, BtnTheme } from "../components/header/NavItem";
import { BiHome } from "react-icons/bi";
import Arts from "../components/reports/Reports";
import { ModalContext } from '../contexts/ModalContext';
import { BsGearWideConnected } from 'react-icons/bs';
import { MainInfos } from '../components/main/Main.style';

const Infos: FunctionComponent<{}> = () => {
  const {setFormModal} = useContext(ModalContext);
  return <AboutStyle>
    <Header>
      <NavItem to="/" value='home' Icon={BiHome}/>    
      <BtnLogin/>
      <BtnLogOut/>
      <BtnTheme/>
    </Header>

    <MainInfos>
      <h2>Informes</h2>
      <ul>
        <Arts/>
      </ul>
    </MainInfos>
  </AboutStyle>;
};

export default Infos;