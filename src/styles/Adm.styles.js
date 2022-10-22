import {styled, color, font} from './styles';

export const EditPanelStyle = styled.div`
  width: 180px;
  > h3 {
    align-items: center;
    background: ${color.tres};
    border-radius: 8px;
    color: ${color.light};
    display: inline-flex;
    gap: 10px;
    justify-content: space-around;
    margin-bottom: 10px !important;
    padding: 10px 0px;
    width: 100%;
  }
  > div {
    background: ${color.tres};
    border-radius: 8px;
    overflow: hidden !important; 
    > h3 {
      color: ${color.facebook};
      margin: 10px 0px;
      text-align: center;
    }
    ~ div {margin-top: 10px}
  }
`

export const AdmStyle = styled.div`
  display: grid;
  gap: 25px;
  grid-template-areas: 'editpanel listconju';
  grid-template-columns: min-content auto;
  margin: 0px auto;
  max-width: ${props => props.maxsize ? `${props.maxsize}px` : "1250px"};
  button.confirm {
    border-radius: 0px !important;
    display: inline;
    padding: 12.5px 10px;
    width: 100% !important;
    > span {text-align: center}
    &:hover {
      background-color: ${color.facebook};
    }
  }
  > ul {
    align-items: flex-start;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 30px;
    justify-content: center;
    > li {
      min-width: 200px;
      > ul.listpage {
        display: flex;
        flex-direction: column;
        margin: 20px 0px;
        > li {
          color: ${color.white};
          font-family: ${font.Kantumruy};
          font-size: 15px;
          min-width: 280px;
        }
      }
    }
  }
`;

export const CadPageStyle = styled.div`
  align-items: center;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  justify-content: center;
  padding: 10px;
  > h3 {
    color: ${color.facebook};
    text-align: center;
    margin: 0px;
  }
  > input[type="text"] {min-width: 350px}
  > div {
    > input {min-width: 0px}
    > input[type="text"] {min-width: 300px}
    > div {
      overflow: hidden;
      border-radius: 100%;
      input[type="color"] {
        height: 40px;
        transform: scale(3);  
        width: 40px;
      }
    }
    display: grid;
    gap: 10px;
    grid-template-columns: auto min-content;
  }
`;


export const Selectors = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  > div {
    box-sizing: border-box;
    min-width: 100%;
  }
`;
