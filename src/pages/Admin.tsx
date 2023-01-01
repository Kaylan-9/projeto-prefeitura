import { useContext, useEffect } from "react";
import Header from "../components/header/Header";
import { EditContext } from "../contexts/EditContext";
import FormPage from "../components/form/FormPage";
import FormGroup from "../components/form/FormGroup";
import Aside from "../components/aside/Aside";
import AsideContentAdmin from "../components/aside/AsideContentAdmin";
import { AsideNavContext, AsideNavContextProvider } from "../contexts/AsideNavContext";
import FormAddInfo from "../components/form/FormAddInfo";
import Reports from "../components/reports/Reports";
import { css } from "@emotion/css";
import { BiHome } from "react-icons/bi";
import { BsInfoSquareFill } from "react-icons/bs";
import DashBoard from "../components/dashboard/Dashboard";
import { MainAdmin } from "../components/main/Main.style";
import ContainerReports from "../components/reports/ContainerReports";
import  NavItem, { BtnLogOut, BtnTheme } from "../components/header/NavItem";
import PagesGroups from "../components/listpages/PagesGroups";
import { ContentPages } from "../components/listpages/ContainerPages";
import { ContentContext, handlePagesType } from "../contexts/ContentContext";
import { AdminStyle } from "./pages.style";

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

const Admin = () => {
  const {pages, handlePages}: handlePagesType = useContext(ContentContext);

  useEffect(() => {
    handlePages({type: "mode", mode: "edit"});
  }, [handlePages]);

  return <AdminStyle>
    <Header>
      <NavItem to="/" value="home" Icon={BiHome}/>
      <NavItem to="/infos" value="informes" Icon={BsInfoSquareFill}/>
      <BtnLogOut/>
      <BtnTheme/>
    </Header>

    <AsideNavContextProvider>
      <Aside>
        <AsideContentAdmin/>
      </Aside>
      <MainAdmin>
        <MainContent/>
      </MainAdmin>
    </AsideNavContextProvider>
  </AdminStyle>;
}

export default Admin;
