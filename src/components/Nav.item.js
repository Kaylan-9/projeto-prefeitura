import {useState} from 'react';
import {styled, color, font, mq} from '../styles/styles';

export default styled(({ className, display, title, icon=false, children=false, toolId="", init = (()=>{}) }) => {
    const [extraVisible, setExtraVisible] = useState("none");

    return <li {...{className}} style = {{display}}>
        <a href = {`#${toolId}`} onClick = {()=> setExtraVisible(extraVisible == "none" ? "flex" : "none")}> 
        {icon ? icon : ""} {title} 
        </a>
        {children ? <div style = {{display: extraVisible}} onClick = {init} onLoad = {init}> {children} </div> : ""}
    </li>;
})`
  align-items: center;
  display: inline-flex;
  > a {
    align-items: center;
    color: white;
    display: inline-flex;
    gap: 5px;
    font-family: ${font.Kantumruy};
    font-size: 14px;
    font-weight: 100;
    position: relative;
    ${mq[0]} {
      gap: 15px;
      padding: 0px;
      margin: 20px; 
      font-size: 15px;
    }
  }
  > div {
    position: absolute;
    right: 0%;
    top: calc( 77px );
  }
  ${mq[0]} {
    > a:hover {
      color: ${color.dois};
    }
  }
`;
