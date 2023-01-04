import styled from "@emotion/styled";
import mqs, { sizes } from "../../styles/medias";

const ContainerPages = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 100%;
  gap: 20px;
  padding: 0px 35px;
  box-sizing: border-box;
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