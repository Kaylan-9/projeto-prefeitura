import styled, {createGlobalStyle} from "styled-components";

export const GlobalStyle = createGlobalStyle`
  html {scroll-behavior: smooth}
  :target {scroll-margin-top: .8em}
  ul {list-style-type: none}

  * {
    border: none;
    border-radius: 0px;
    box-shadow: none;
    padding: 0px;
    margin: 0px;
    text-decoration: none;
  }

  button {
    background: transparent;
    display: flex;
  }
`;

export const size = {
  mini: 2,
  small: 4,
  big: 6,
  large: 10
}

export const color = {
  zero: "#737b8b",
  um: "rgb(29 38 54)",
  dois: "rgb(23 151 86)",
  tres: "rgb(10 20 40)",
  quatro: "#293852",
  cinco: "rgb(0 10 26)",
  seis: "rgb(45 67 112)",
  green: "#00b975",
  white: "rgb(250 250 255)",
  facebook: "hsl(214deg 89% 52%)",
  instagram: "hsl(332deg 89% 52%)",
  light: "rgba(255, 255, 255, 0.7)",
  red: 'rgb(255, 0, 106)',
  gradient: (c1, c2) => (`linear-gradient(90deg, ${c1} 40%, ${c2} 100%)`)
}

export const font = {
  Roboto: "'Roboto Mono', monospace",
  Baloo: "'Baloo Bhaijaan 2', cursive",
  Secular: "'Secular One', sans-serif",
  Biz: "'BIZ UDPMincho', serif",
  Oswald: "'Oswald', sans-serif",
  Source: "'Source Sans Pro', sans-serif",
  Kantumruy: "'Kantumruy Pro', sans-serif"
};

export const Wrapper = styled.div`
  grid-area: ${props => props.area ? props.area : ""};
  width: 100%;
  > section { 
    display: block;
    margin: 0px auto !important;
  }
`;

export const h2 = `
  font-family: ${font.Kantumruy};
  font-size: 23px;
  word-spacing: 1px;
  margin-bottom: 40px !important;
`;

export const h3 = `
  font-family: ${font.Kantumruy};
  font-size: 20px;
  font-weight: bolder;
  margin-bottom: 30px;
  text-align: left;
`;

export const btn = `
  align-items: center;
  background-color: ${color.green};
  border-radius: 30px;
  color: ${color.white};
  display: flex;
  font-family: ${font.Kantumruy};
  font-weight: bolder;
  padding: 10px;
  min-width: 100px;
`;

export const H2 = styled.h2`${h2}`;
export const H3 = styled.h3`${h3}`;
export const Btn = styled.button`
  ${btn}
  cursor: pointer;
  justify-content: center;
  margin: 0px auto;
  font-size: 15px !important;
  &:hover {
    background-color: ${color.dois};
  }
`;
export const Input = styled.input`
  ${btn}
  background-color: ${color.um};
  color: ${color.facebook};
  font-size: 17px;
  font-weight: bold;
  text-align: center;
  margin: 0px auto;
  max-width: 200px;
`;
export const TextArea = styled.textarea`
  ${btn}
  background-color: ${color.um};
  color: ${color.facebook};
  font-size: 17px;
  font-weight: bold;
  text-align: center;
  margin: 0px auto;
  min-width: 350px;
`;
export const Submit = styled(Input)`
  background-color: transparent;
  border: solid 2px ${color.seis};
  color: ${color.seis};
  font-size: 15px;
  padding: 8px 15px;
  cursor: pointer;
  &:hover {
    background-color: ${color.seis};
    color: ${color.white};
    transition: 1s;
  }
`;

const breakpoints = [620, 900, 800, 1000, 720, 1150, 950, 310];
export const mq =  breakpoints.map(bp => `@media (max-width: ${bp}px)`);

export const BoxMarking = styled(({className, style, nome, pertence, type = "radio", change, active = 1}) => {
  const nomeLowerCase = (nome[0].toLowerCase()+nome.slice(1)).normalize("NFD");
  return (<div {...{className, style}}>
    {!active ? '' : <input type={type} value="Conjuntos" name={pertence} id={nomeLowerCase} onChange={change}/>}
    <label for={nomeLowerCase}>{nome}</label>
    {!active ? '' : <span/>}
  </div>);
})`
  ${btn}
  background-color: ${color.quatro};
  > label {
    margin: 0px auto;
    position: relative;
  }
  > span {
    border-radius: 100%;
    height: 15px;
    position: absolute;
    width: 15px;
  }
  > input {
    cursor: pointer;
    position: absolute;
    opacity: 0;
    z-index: 5;
  }
  input:checked ~ span {background-color: rgba(255, 255, 255, 0.27)}
  input ~ span {background-color: white}
`;

export const BoxRadio = (props)=> <BoxMarking {...{...props, type: "radio"}}/>;
export const BoxCheck = (props)=> <BoxMarking {...{...props, type: "checkbox"}}/>;

export {styled};