import styled from "@emotion/styled";

const ContainerReports = styled.ul`
  align-items: center;
  display: grid;
  gap: 25px;
  grid-template-columns: repeat(auto-fill, minmax(650px, 1fr));
  /* width: 100%; */
  box-sizing: border-box;
  li {
    border-radius: 17px;
  }
`;

export default ContainerReports;