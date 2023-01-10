import styled from "@emotion/styled";
import mqs from "../../styles/medias";
import { ThemeProps } from "../../styles/theme";
import ContainerReports from "./ContainerReports";


const ContainerHomePageReports = styled(ContainerReports)<{theme?: ThemeProps}>`
  width: 75%;
  margin: 0 auto;
  align-items: flex-start;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  box-sizing: border-box;
  padding: 20px 25px 20px 35px;
  ${mqs[3]} {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
  ${mqs[2]} {
    grid-template-columns: auto;
    padding: 0 15px;
  }
`;

export default ContainerHomePageReports;

