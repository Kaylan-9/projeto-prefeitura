import { useContext, useEffect } from 'react';
import Header from "../components/header/Header";
import PagesGroups from "../components/listpages/PagesGroups";
import Pages from '../components/listpages/Pages';
import Reports from '../components/reports/Reports';
import { BsInfoSquareFill } from 'react-icons/bs';
import Footer from '../components/footer/Footer';
import Aside from '../components/aside/Aside';
import  AsideContentUser from '../components/aside/AsideContentUser';
import ContainerPages, { ContentPages } from '../components/listpages/ContainerPages';
import ContainerHomePageReports from '../components/reports/ContainerHomePageReports';
import NavItem, { BtnLogin, BtnLogOut, BtnTheme } from '../components/header/NavItem';
import { ContentContext, ContentContextType} from "../contexts/ContentContext";
import { ThemeProps } from '../styles/theme';
import styled from '@emotion/styled';

export const HomeStyle = styled.div`
  display: grid;
  gap: 25px;
  grid-template-areas: 'h' 'm' 'f';
  grid-template-columns: auto;
  grid-template-rows: min-content auto min-content;
  min-height: 100vh;
  background-color: ${({theme}: {theme?: ThemeProps}) => theme?.colors?.primary};
  box-sizing: border-box;
  max-width: 100%;
  main {
    align-items: flex-start;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 25px;
    grid-area: m;
  }
`;



export default () => {
  const {setMode}: ContentContextType = useContext(ContentContext);
  useEffect(() => {
    setMode("pages");
  }, []);
  return <HomeStyle>
    <Header >
      <BtnLogOut/>
      <BtnLogin/>
      <BtnTheme/>
    </Header>
    <main>
      <ContainerHomePageReports> 
        <Reports lenghtreport={2}/>
      </ContainerHomePageReports>
      <ContainerPages>
        <Aside>
          <AsideContentUser/>
        </Aside>
        <ContentPages>
          <Pages/>
          <PagesGroups/>
        </ContentPages>
      </ContainerPages>
    </main>
    <Footer/>
  </HomeStyle>;
}

