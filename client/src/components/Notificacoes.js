import {styled, color, font, mq} from '../styles/styles';
import {motion} from "framer-motion";
import {CgClose} from "react-icons/cg";

const NotificacoesStyle = styled(motion.ul)`
  border-radius: 0px 0px 15px 15px;
  background: ${color.facebook};
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 450px;
  overflow: hidden;
  z-index: 3;
`;

const Notificacoes = styled(({className, text}) => (
  <li className={className}>
    <button onClick={(e) => e.currentTarget.parentNode.remove()}>
      <CgClose size={17}/>
    </button>
    <p>{text}</p>
  </li>
))`
  align-items: center;
  display: flex;
  gap: 22px;
  margin: 0px 7px 0px 7px;
  padding: 10px 15px;
  &:first-child { margin-top: 20px; }
  &:last-child { margin-bottom: 20px; }
  > button {
    position: relative;
    color: white;
    font-size: 20px;
    font-weight: bolder;
    cursor: pointer;
    &:hover {
      transition: transform 500ms;
      transform: scale(1.25);
    }
  }
  > p {
    color: ${color.white};
    font-size: 16px;
    font-family: ${font.Source};
    font-weight: bold;
    line-height: 30px !important;
    text-align: justify;
    ${mq[0]} {
      font-size: 15.5px;
      line-height: 40px;
    }
    > span {
      font-weight: bolder;
      text-transform: uppercase;
    }
  }
`

export default ({content}) => {
  let list = [];
  for(let item of content) list.push(<Notificacoes text={item}/>);
  return (
    <NotificacoesStyle> 
      {list} 
    </NotificacoesStyle>
  );
};