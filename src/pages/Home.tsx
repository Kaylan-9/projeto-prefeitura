import { useContext, useEffect } from 'react';
import Header from "../components/header/Header";
import PagesGroups from "../components/listpages/PagesGroups";
import Pages from '../components/listpages/Pages';
import Reports from '../components/reports/Reports';
import Footer from '../components/footer/Footer';
import Aside from '../components/aside/Aside';
import  AsideContentUser from '../components/aside/AsideContentUser';
import ContainerPages, { ContentPages } from '../components/listpages/ContainerPages';
import ContainerHomePageReports from '../components/reports/ContainerHomePageReports';
import { BtnLogin, BtnLogOut, BtnTheme } from '../components/header/NavItem';
import { ContentContext, ContentContextType} from "../contexts/ContentContext";
import { ThemeProps } from '../styles/theme';
import Search from '../components/search/Search';
import styled from '@emotion/styled';

export const HomeStyle = styled.div<{theme?: ThemeProps}>`
  display: grid;
  grid-template-areas: 'h' 'm' 'f';
  grid-template-columns: auto;
  grid-template-rows: min-content auto min-content;
  min-height: 100vh;
  z-index: -2;
  box-sizing: border-box;
  max-width: 100%;
  background-color: ${({theme}) => theme?.colors?.secondary};
  main {
    align-items: flex-start;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    grid-area: m;
  }
`;

export default () => {
  const {setMode}: ContentContextType = useContext(ContentContext);
  useEffect(() => {
    setMode("pages");
  }, []);
  return <HomeStyle>
    <Header>
      <BtnLogOut/>
      <BtnLogin/>
      <BtnTheme/>
    </Header>
    <main>
      <ContainerHomePageReports> 
        <Reports lenghtreport={2}/>
      </ContainerHomePageReports>
      <Search/>
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

