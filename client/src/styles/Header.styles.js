import {styled, color, font, mq} from '../styles/styles';

export const Title  = styled('div')`
  gap: 15px;
  grid-template-columns: min-content auto;
  color: ${color.light};
  display: grid;
  h1 {
    font-family: Arial;  
    font-size: 35px;
    font-weight: bolder;
  }
  div {
    letter-spacing: 1px;
    margin-top: 3px;
    h4 {    
        font-family: ${font.Oswald};  
        font-size: 13px;
        font-weight: lighter;
        line-height: 20px;
        text-transform: uppercase;
    }
    h5 {
        font-family: ${font.Oswald};  
        font-size: 11px;
        font-weight: lighter;
        line-height: 12.5px;
    }
  }
  ${mq[0]} {
    font-size:25px;  
  }
`;
  
export const HeaderStyle  = styled.header`
  padding: 9px 5vw;
  display: grid;
  max-width: ${props => props.maxsize ? `${props.maxsize}px` : "1250px"};
  margin: 0px auto;
  grid-template-areas: 'hi hn bpb';
  grid-template-columns: max-content auto min-content;
  .headinfo{
    grid-area: hi;
    align-items: center;
    display: flex;
    gap: 10px;
    img {width: 32px;}
  }
  ${mq[0]} {
    background: ${color.tres};
    padding: 25px;
    grid-template-areas: 'hi' 'hn';
    grid-template-columns: auto;
    .headinfo{
      gap: 5px;
      margin: 0px auto;
    }
  }
`;

