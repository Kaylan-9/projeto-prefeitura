import { css } from '@emotion/css';
import { useTheme } from '@emotion/react';
import {FunctionComponent} from "react";
import Footer from '../components/footer/Footer';
import colors from "../styles/colors";
import { ThemeProps } from '../styles/theme';

interface CircleProps {
  angle: number,
  vec: number
}
 
const Circle: FunctionComponent<CircleProps> = ({angle, vec}) => {
  const theme: ThemeProps = useTheme();
  return <div className={css`
    min-width: 75px;
    min-height: 75px;
    left: calc(50% - (75px / 2));
    top: calc(50% - (75px / 2));
    position: absolute;
    animation: ${vec+8}00ms infinite loading_animation${angle};
    @keyframes loading_animation${angle} {
      0% {transform: rotate(calc(0deg + ${angle}deg))}
      100% {transform: rotate(calc(360deg + ${angle}deg))}
    }
  `}>
    <div className={css`
      width: 10px;
      height: 10px;
      border-radius: 100%;
      transition: 2s;
      background-color: ${theme?.colors?.secondary};
    `}></div>
  </div> 
};

const Loading : FunctionComponent<{}> = () => {
  const theme: ThemeProps = useTheme();
  return (<div className={css`
    display: grid;
    grid-template-rows: auto min-content;
    grid-template-areas: 'm' 'f';
    background-color: ${theme?.colors?.primary};
    width: 100%;
    min-height: 100vh;
    main {
      grid-area: m;
    }
  `}>
    <main>
      {[0, 2, 5, 7, 10, 12, 15, 17, 20, 22, 25, 27, 30, 32, 35, 37, 40, 42, 45].map(angle => <Circle key={angle+"c"} angle={angle} vec={0.5}/>)}
      {[100, 102, 105, 107, 110, 112, 115, 117].map(angle => <Circle key={angle+"c"} angle={angle} vec={2}/>)}
      {[200, 202, 205, 207, 210, 212, 215, 217, 220, 222, 225, 227, 230, 232, 235, 237, 240, 242, 245, 247, 250].map(angle => <Circle key={angle+"c"} angle={angle} vec={1}/>)}
    </main>
    <Footer/>
  </div>);
}
 
export default Loading;