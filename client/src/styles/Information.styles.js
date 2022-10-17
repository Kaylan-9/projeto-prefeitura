import {styled, color, font, mq} from '../styles/styles';
import {IoMdInformationCircle} from 'react-icons/io';
import {motion} from "framer-motion";

export const Title = styled(({className, anima}) => (
  <motion.h2 {...{className}} initial = {anima.initial} whileInView = {anima.whileInView}>
    <span> Painel de Informações </span>
    <IoMdInformationCircle/>
    <svg style={{width:0, height:0, position:"absolute"}} aria-hidden="true" focusable="false">
      <linearGradient id="my-cool-gradient" x2="1" y2="1">
        <stop offset="25%" stop-color={color.facebook}/>
        <stop offset="100%" stop-color={color.green}/>
      </linearGradient>
    </svg>
  </motion.h2>
))`
  align-items: center;
  display: flex;
  gap: 15px;
  justify-content: center;
  text-align: start !important;
  span {
    background: -webkit-linear-gradient(71deg, ${color.green}, ${color.facebook});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  svg {
    fill: url(#my-cool-gradient) #447799;
  }
`;

export const Enfase = styled(({className, text, especial=""}) => <span {...{className}}>
  {` ${especial}${text}${especial} `}
</span>)`
  color: ${color.green};
  font-weight: bold;
`;

export default styled.section`
  max-width: ${props => props.maxsize ? `${props.maxsize}px` : "1250px"};
  margin: 0px auto;
  h2 {
    background: -webkit-linear-gradient(0deg ,${color.green} 0%,#333 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  > ul {
    display: grid;
    ${mq[1]} {
      display: flex;
      flex-direction: column;
    }
  }
  ${mq[0]} {
    padding-top: 40px; */
    h2 {
      margin-left: 8vw;
      margin-right: 8vw;
    }
    > ul {
      column-gap: 0px;
      row-gap: 0px;
      > * {
        background: transparent !important;
        border-radius: 0px !important;
        padding: 15px 35px !important;      
      }
    }
  }
`;

export const Info = styled(motion.div)`
  flex-direction: column;
  background: ${color.tres};
  border-radius: 15px;
  box-sizing: border-box;
  padding: 35px;
`;

export const Text = styled('p')`
  color: ${color.white};
  font-family: ${font.Source};
  font-size: 15px !important;
  font-weight: lighter;
  line-height: 40px;
  text-align: justify;
  margin-bottom: 20px;
`;

export const Navlinks = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 0px;
  .navlink-title {
    background-color: white;
    border-radius: 10px;
    padding: 12px;
    font-family: "Lato",Arial,sans-serif;
    font-size: 14px !important;
    font-weight: 700;
    line-height: 1.5;
    color: #002d73;
  }
`;