import styled from "@emotion/styled";
import mqs from "../../styles/medias";
import ContainerReports from "./ContainerReports";


const ContainerHomePageReports = styled(ContainerReports)`
  width: 100%;
  align-items: center;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  width: 100%;
  box-sizing: border-box;
  padding: 0 35px;
  border-radius: 15px;
  ${mqs[3]} {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
  ${mqs[2]} {
    grid-template-columns: auto;
    padding: 0 15px;
  }
`;

export default ContainerHomePageReports;

