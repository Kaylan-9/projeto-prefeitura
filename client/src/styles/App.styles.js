import {styled} from './styles';

export default styled.div`
  background: ${props => props.bg};
  box-sizing: border-box;
  min-height: 100vh;
  display: grid;
  grid-template-areas: 'header' 'main' 'footer';
  grid-template-rows: min-content auto min-content;
`;