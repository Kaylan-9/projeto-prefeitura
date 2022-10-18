import {styled, color, mq} from '../styles/styles';

export default styled.ul`
  grid-area: hn;
  align-items: center;
  column-gap: 5vw;
  display: ${props => props.display};
  flex-direction: row;
  justify-content: flex-end;
  ${mq[0]} {
    align-items: flex-start;
    gap: 0px;
    flex-direction: column;
    margin-top: 25px
  }
`;

export const BtnPanelBar  = styled(({ className, click, icon }) => (
  <button {...{className}} onClick = {click}> {icon} </button>
))`
  grid-area: bpb;
  color: ${color.green};
  display: none !important;
  flex-direction: row;
  align-items: center;
  margin-top: 5px;
  cursor: pointer;
  ${mq[4]} {
    padding: 0px;
  }
`;