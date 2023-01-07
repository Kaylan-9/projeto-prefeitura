import styled from "@emotion/styled";
import mqs from "../../styles/medias";
import { ThemeProps } from "../../styles/theme";

export const HeaderStyle = styled.header<{theme?: ThemeProps}>`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 35px;
  padding-top: 25px;
  box-sizing: border-box;
  gap: 10px;
  grid-area: h;
  #logo {
    grid-area: logo;
    span {
      font-weight: bolder;
      font-family: 'Rubik', sans-serif;
      font-family: 98px;
    }
  }
  #links {
    grid-area: links;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    ${mqs[2]} {
      gap: 0px;
      justify-content: space-between;
      width: 100%;
    }
  }
  ${mqs[2]} {
    padding: 15px;
  }
`;

export default HeaderStyle;