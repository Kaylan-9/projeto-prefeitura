import { useContext, useEffect } from 'react';
import { HomeStyle } from "./pages.style";
import Header from "../components/header/Header";
import PagesGroups from "../components/listpages/PagesGroups";
import Pages from '../components/listpages/Pages';
import Search from '../components/search/Search';
import Reports from '../components/reports/Reports';
import { BsInfoSquareFill } from 'react-icons/bs';
import Footer from '../components/footer/Footer';
import Aside from '../components/aside/Aside';
import  AsideContentUser from '../components/aside/AsideContentUser';
import ContainerPages, { ContentPages } from '../components/listpages/ContainerPages';
import ContainerHomePageReports from '../components/reports/ContainerHomePageReports';
import NavItem, { BtnLogin, BtnLogOut, BtnTheme } from '../components/header/NavItem';
import { ContentContext, ContentContextType} from "../contexts/ContentContext";
import { css } from '@emotion/css';


export default () => {
  const {setMode}: ContentContextType = useContext(ContentContext);

  useEffect(() => {
    setMode("pages");
  }, []);

  return <HomeStyle>
    <Header >
      <NavItem to="/infos" value="informes" Icon={BsInfoSquareFill}/>
      <BtnLogin/>
      <BtnLogOut/>
      <BtnTheme/>
    </Header>

    <main>
      {/* <ContainerHomePageReports> 
        <Reports lenghtreport={2}/>
      </ContainerHomePageReports> */}

      <ContainerPages>
        <Aside>
          <AsideContentUser/>
        </Aside>
        <ContentPages>
          <Pages/>

        </ContentPages>
      </ContainerPages>
    </main>
    
    <Footer/>
  </HomeStyle>;
}

