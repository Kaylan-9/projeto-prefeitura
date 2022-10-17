import {styled, mq} from "../styles/styles";

const Main = styled.main`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  row-gap: 125px;
  grid-area: ${props => props.area ? props.area : ""};
  grid-template-rows: repeat(3, auto);
  padding: 125px 5vw;
  ${mq[0]} {
    row-gap: 75px;
    padding: 25px 0vw;
  }
`;

export default Main;