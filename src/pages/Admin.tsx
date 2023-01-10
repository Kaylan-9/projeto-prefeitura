import { useContext, useEffect } from "react";
import Header from "../components/header/Header";
import { EditContext } from "../contexts/EditContext";
import FormPage from "../components/forms/FormPage";
import FormGroup from "../components/forms/FormGroup";
import Aside from "../components/aside/Aside";
import AsideContentAdmin from "../components/aside/AsideContentAdmin";
import { AsideNavContext, AsideNavContextProvider } from "../contexts/AsideNavContext";
import FormAddInfo from "../components/forms/FormAddInfo";
import Reports from "../components/reports/Reports";
import { css } from "@emotion/css";
import { BiHome } from "react-icons/bi";
import { BsInfoSquareFill } from "react-icons/bs";
import DashBoard from "../components/dashboard/Dashboard";
import ContainerReports from "../components/reports/ContainerReports";
import  NavItem, { BtnLogOut, BtnTheme } from "../components/header/NavItem";
import PagesGroups from "../components/listpages/PagesGroups";
import ContainerPages, { ContentPages } from "../components/listpages/ContainerPages";
import { ContentContext, ContentContextType } from "../contexts/ContentContext";
import styled from "@emotion/styled";
import { ThemeProps } from "../styles/theme";


const MainContent = () => {
  const {edit} = useContext(EditContext);
  const {toggle} = useContext(AsideNavContext);
  const verStates = {
    formpage: ((edit.flag==="p" && edit.mod==="c") || (edit.flag==="p" && edit.mod==="u")) && edit.item.length===1,
    formgroup: (edit.flag==="g" && edit.mod==="c") || (edit.flag==="g" && edit.mod==="u" && edit.item.length===1),
    reports: toggle==="gerenciar informes",
    estaticas: toggle==="estátisticas"
  };

  return (
    (verStates.reports) ? 
      (<div className={css`
        display: flex;
        flex-wrap: wrap;
        gap: 35px;
      `}>
        {((edit.mod==="c" || (edit.mod==="u" && edit.item[0])) ? 
          (<FormAddInfo area="editor"/>) :
          null
        )}
        <ContainerReports>
          <Reports editable={true} lenghtreport={2}/>
        </ContainerReports>
      </div>) :
      (verStates.estaticas) ?
        (<DashBoard/>) :
        (verStates.formpage) ? 
          (<section><FormPage/></section>) :
          (verStates.formgroup) ? 
            (<section><FormGroup/></section>) :
            (<ContentPages>
              <PagesGroups/>
            </ContentPages>)
  ) 
};

export const AdminStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 45px;
  min-height: 100vh;
  background-color: ${({theme}: {theme?: ThemeProps}) => theme?.colors?.primary};
  padding-bottom: 30px;
`;

const Admin = () => {
  const {setMode}: ContentContextType = useContext(ContentContext);
  useEffect(() => {
    setMode("edit");
  }, []);
  return <AdminStyle>
    <Header>
      <BtnLogOut/>
      <NavItem to="/" value="home" Icon={BiHome}/>
      <NavItem to="/infos" value="informes" Icon={BsInfoSquareFill}/>
      <BtnTheme/>
    </Header>
    <AsideNavContextProvider>
      <ContainerPages className={css`
        padding: 35px !important;
      `}>
        <Aside>
          <AsideContentAdmin/>
        </Aside>
        <MainContent/>
      </ContainerPages>
    </AsideNavContextProvider>
  </AdminStyle>;
}

export default Admin;
