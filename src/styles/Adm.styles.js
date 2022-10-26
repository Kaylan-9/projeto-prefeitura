import {styled, color, font} from './styles';

export const EditPanelStyle = styled.div`
  width: 200px;
  display: grid;
  gap: 10px;
  > h3 {
    align-items: center;
    background: ${color.tres};
    border-radius: 8px;
    color: ${color.light};
    display: inline-flex;
    gap: 10px;
    justify-content: space-around;
    margin-bottom: 0px !important; 
    padding: 10px 0px;
    width: 100%;
  }
  > div { 
    border-radius: 8px;
    overflow: hidden !important; 
    > h3 {
      color: ${color.light};
      margin: 10px 0px;
    }
  }
  button.confirm {
    background-color: ${color.facebook};
    &:hover {background-color: ${color.tres} !important}
  }
`;

export const AdmStyle = styled.div`
  display: grid;
  gap: 25px;
  grid-template-areas: 'admpanel listconju';
  grid-template-columns: min-content auto;
  margin: 0px auto;

  button.confirm {
    border-radius: 8px;
    padding: 10px !important;
    width: 100%;
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

export const AdmPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  grid-area: "admpanel";
  button.tool {
    align-items: center;
    background: ${color.tres};
    border-radius: 8px;
    color: ${color.light};
    display: inline-flex;
    font-family: ${font.Kantumruy};
    font-size: 17px;
    font-weight: 100;
    gap: 30px;
    justify-content: flex-start;
    width: 100%;
  }
`;

export const CadPageStyle = styled.div`
  align-items: center;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 20px;
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
      border-radius: 8px;
      input[type="color"] {
        height: 40px;
        transform: scale(3);  
        width: 40px;
      }
    }
    display: grid;
    gap: 20px;
    grid-template-columns: auto min-content;
  }
`;


export const Selectors = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  gap: 5px;
  > div {
    box-sizing: border-box;
    min-width: 100%;
  }
`;

export const UnauthenticatedStyle = styled.form`
  background: ${color.tres};
  border-radius: 8px;
  display: grid;
  flex-direction: column;
  gap: 20px;
  padding: 12px;
  margin: 0px auto;
  max-width: 330px;
  > h2 {
    align-items: center;
    display: inline-flex;
    column-gap: 10px;
    margin-bottom: 10px !important;
    > * {color: ${color.light}}
  }
  > p {
    background: ${color.gradient(color.green, color.facebook)};
    border-radius: 8px;
    color: ${color.white};
    font-family: ${font.Kantumruy};
    padding: 12px;
  }
  > input[type=text], > input[type=password] {
    padding: 12px;
    margin: 0px;
    min-width: 100%;
    box-sizing: border-box;
  }
  > * {margin: 0px auto}
`;