import {useContext, useEffect, useState, useCallback, FunctionComponent} from 'react';
import AboutStyle from "./pages.style";
import Header from "../components/header/Header";
import { BiHome } from "react-icons/bi";
import parse from 'html-react-parser';
import { ModalContext } from '../contexts/ModalContext';
import { BsGearWideConnected } from 'react-icons/bs';
import { css } from '@emotion/css';
import { useParams } from 'react-router-dom';
import request from '../utils/request';
import { ThemeProps } from '../styles/theme';
import { useTheme } from '@emotion/react';
import { IPContext } from '../contexts/IPContext';
import { MainInfo } from '../components/main/Main.style';
import NavItem, { BtnLogin, BtnLogOut, BtnTheme } from '../components/header/NavItem';


const Info: FunctionComponent<{}> = () => {
  const {setFormModal} = useContext(ModalContext);
  const {ip} = useContext(IPContext);
  const [content, setContent] = useState<any>(<></>);
  const {id} = useParams();
  const theme: ThemeProps = useTheme();

  const loadTextContent = async () => { 
    setContent(parse((await request(`articles/content/${id}`, 'GET')).text));
  };

  const markAsViewer = useCallback(async () => { 
    await request(`users/view`, 'POST', {ip, _idinfo: id});
  }, [ip, id]);

  useEffect(() => {
    loadTextContent();
    markAsViewer();
  }, []);

  return <AboutStyle className = {css`
    background-color: ${theme?.colors?.secondary} !important;
  `}>
    <Header>
      <NavItem to="/" Icon={BiHome}/>
      <BtnLogin/>
      <BtnLogOut/>
      <BtnTheme/>
    </Header>
    <MainInfo>
      {content}
    </MainInfo>
  </AboutStyle>;
};

export default Info;