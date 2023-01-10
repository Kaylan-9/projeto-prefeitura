import styled from "@emotion/styled";
import mqs, { sizes } from "../../styles/medias";
import { ThemeProps } from "../../styles/theme";

const ContainerPages = styled.div<{theme?: ThemeProps}>`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 100%;
  gap: 20px;
  padding: 200px 35px 0 35px;
  box-sizing: border-box;
  background-color: ${({theme}) => theme?.colors?.primary};
  ${mqs[4]} {
    justify-content: space-between;
  }
  ${mqs[2]} {
    padding: 25px 15px;
  }
`;

export const ContentPages = styled.div`
  display: grid;
  box-sizing: border-box;
  width: 100%;
  gap: 20px;
  max-width: ${sizes[3]}px;
  margin-left: calc(50% - (355px) - (${sizes[3]}px / 2));
  margin-bottom: 231px;
  ${mqs[5]} {
    margin-left: 0;
    max-width: calc(100% - 360px);
  }
  ${mqs[3]} {
    margin-left: 0;
    max-width: none;
  }
`;

export default ContainerPages;