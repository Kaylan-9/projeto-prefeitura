import styled from "@emotion/styled";
import mqs from "../../styles/medias";

const AsideStyle = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 19px;
  ${mqs[3]} {
    flex-direction: row;
  }
`;

export default AsideStyle;