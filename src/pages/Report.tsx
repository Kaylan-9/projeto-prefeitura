import {useContext, useEffect, useState, useCallback, FunctionComponent} from 'react';
import Header from "../components/header/Header";
import { BiHome } from "react-icons/bi";
import parse from 'html-react-parser';
import { css } from '@emotion/css';
import { useParams } from 'react-router-dom';
import request from '../utils/request';
import { ThemeProps } from '../styles/theme';
import { useTheme } from '@emotion/react';
import { IPContext } from '../contexts/IPContext';
import { MainInfo } from '../components/main/Main.style';
import NavItem, { BtnLogin, BtnLogOut, BtnTheme } from '../components/header/NavItem';
import { HomeStyle } from './Home';


const Info: FunctionComponent<{}> = () => {
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

  return <HomeStyle className = {css`
    background-color: ${theme?.colors?.secondary} !important;
  `}>
    <Header>
      <BtnLogOut/>
      <NavItem to="/" Icon={BiHome}/>
      <BtnLogin/>
      <BtnTheme/>
    </Header>
    <MainInfo>
      {content}
    </MainInfo>
  </HomeStyle>;
};

export default Info;