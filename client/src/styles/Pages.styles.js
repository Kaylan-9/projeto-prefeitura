import {useState} from 'react';
import {motion} from 'framer-motion';
import {styled, color, font, H3, mq} from './styles';
import {RiArrowDropUpLine, RiArrowDropDownLine, RiCloseCircleFill} from 'react-icons/ri';

export const SectionTitle = styled.section`
  align-items: center;
  display: inline-flex;
  gap: 15px;
  justify-content: center;
  width: 100%;
  &, * {color: white}
  button {
    margin-bottom: 40px !important;
    cursor: pointer;
    &:hover {color: ${color.white}}
  }
  ${mq[0]} {margin-bottom: 0px}
`;

let IconPages = RiArrowDropDownLine;

export const PagesStyle  = styled(({className, title, list, background, style}) => {
  const [stateIconPages, setStateIconPages] = useState(0);
  IconPages = stateIconPages ? RiArrowDropDownLine : RiArrowDropUpLine;
  return (<section {...{className}} {...{style}}>
    <H3 style={{background}}> 
      <span>{title}</span>
      <button onClick={() => setStateIconPages(stateIconPages ? 0 : 1)}>
        <IconPages/>
      </button> 
    </H3>
    <ul style = {{display: (stateIconPages ? 'none' : 'grid')}}> {list} </ul>
  </section>);
})`
  background-color: ${color.tres};
  break-inside: avoid;
  border-radius: 15px;
  display: grid;
  page-break-inside: avoid;
  overflow: hidden;
  margin-bottom: 45px;
  ${mq[0]} {
    background-color: ${props => props.bgmq};
    margin-bottom: 0px !important;
  }
  > h3 {
    align-items: center;    
    display: inline-flex;
    justify-content: space-between;
    padding: 10px 25px;
    margin:  0 !important;
    font-size: 20px;
    &, *{color: ${color.white}}
    > button { 
      padding: 0px !important;
      margin: 0px !important;
      > * {
        cursor: pointer;
        font-size: 30px;
      }
    }
    ${mq[0]} {
      background-color: ${color.tres};
      border-radius: 15px !important;
      overflow: hidden;
    }
  }
  > ul {
    display: grid;
    gap: 40px;
    padding: 20px 30px;
    ${mq[0]} {
      gap: 25px;
    }
  }
`;

const PageSt = styled(motion.li)`
  border-radius: 5px;
  div > p.name {
    align-items: center;
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: space-between;
    &, *{color: ${color.white}};
    > a {
      font-family: ${font.Source};
      font-size: 12.5px;
      font-weight: bolder;
      text-transform: uppercase;
    }
    > button {
      cursor: pointer;
      :hover {
        opacity: 0.1;
      }
    }
  }
`;

export const PageSt1 = styled(PageSt)`
  > div { 
    > a > .image {
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      border-radius: 5px;
      min-height: 6.5rem !important;
      width: 100%;
      ${mq[0]} {min-height: 12rem}
    }
    > p.name {
      margin-top: 12.5px;
    }
  }
`;

export const PageSt2 = styled(PageSt)`
    margin-bottom: 20px;
`;

export const PageViewerStyle = styled(({className, img, onclick}) => (
  <motion.div {...{className, transition: {delay:0.5}, style: {
    display: img === "" ? "none" : "flex", 
    backgroundImage: `url(${img})`
  }}}>
    <button><RiCloseCircleFill onClick={onclick}/></button>
  </motion.div>
))`
  bottom: 25px;
  left: 25px;
  position: fixed;
  background-size: cover;
  background-position: center;
  background-repeat: repeat;
  border-radius: 5px;
  height: 16.5rem;
  width: 475px;
  padding-bottom: 25px;
  z-index: 3;
  > button {
    margin: 5px;
    > * {
      color: ${color.red};
      font-size: 18px;
    }
  }
  ${mq[0]} {
    bottom: 0px;
    border-radius: 0px;
    height: 13.5rem;
    left: 0px;
    width: 100vw;
  }
`;

export const SectionPages = styled.div`
  gap: 30px;
  column-count: 3;
  ${mq[3]} {column-count: 2;}
  ${mq[2]} {column-count: 1;}
  ${mq[0]} {
    border-radius: 15px !important;
    display: grid;
    gap: 15px;
    margin: 0px 15px !important;
  }
`;

export default styled('div')`
`;

export { PageSt };