import React, {Component} from "react";
import {motion} from "framer-motion";
import {styled, color, font, size, mq} from '../styles/styles';
import img from '../img/img.jpg';


const AboutStyle  = styled.section`
  color: ${color.white};
  column-gap: 75px;
  row-gap: 35px;
  display: grid !important;
  grid-template-areas: 
    'titleabout imgabout'
    'textresumeabout imgabout'
    'textabout textabout';
  grid-template-columns: auto 450px;
  max-width: ${props => props.maxsize ? `${props.maxsize}px` : "1250px"};
  ${mq[6]} {
    gap: ${size.small}vw;
    grid-template-areas: 
      'titleabout'
      'imgabout'
      'textresumeabout'
      'textabout';
    grid-template-columns: auto;
    grid-template-rows: min-content 400px auto;
    padding-top: 40px;
    padding-bottom: 75px;
  }
  ${mq[0]} {
    padding: 50px 5vw;
  }
`;

const TitleAbout  = styled(motion.h2)`
  color: ${color.white};
  font-family: ${font.Kantumruy};
  font-weight: 400;
  line-height: 42px;
  letter-spacing: 0.5px;
  text-align: start;
  word-spacing: 2px;
  @media(max-width: 660px) { 
    margin-bottom: 0px !important; 
  }
`;

const Text = styled(motion.p)`
  font-family: ${font.Source};
  font-size: 16px !important;
  font-weight: 500;
  line-height: 40px;
  text-align: justify;
`;

const TextResumeAbout  = styled(Text)`
  word-spacing: 1.5px;
`;

const TextAbout  = styled(Text)`
  word-spacing: 2px;
`;

const ImgAbout  = styled(motion.div)`
  background-image: url('${img}');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 5px;
  position: relative;
  top: 15px;
  height: calc(100% - 15px);
  @media(max-width: 660px) {
    margin: 30px 0px;
    box-shadow: none;
  }
`;

const MoreRead  = styled(motion.span)`
  background: -webkit-linear-gradient(180deg, ${color.green} 25%, ${color.facebook} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: ${color.green};
  cursor: pointer;
  font-weight: bolder;
  margin-left: 10px;
`;

export default class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'none'
    };
    this.anima = {
      initial: {
        opacity: 0
      },
      whileInView: {
        opacity: 1
      }
    };
  }

  render() {
    return (
      <AboutStyle id = "about" maxsize={this.props.maxsize}>
        <TitleAbout style = {{gridArea: "titleabout"}} initial = {this.anima.initial} whileInView = {this.anima.whileInView}>
          Sobre: Apresentando o setor de Tecnologia da informação de Espírito Santo do Pinhal
        </TitleAbout>
        <ImgAbout style = {{gridArea: "imgabout"}}  initial = {this.anima.initial} whileInView = {this.anima.whileInView}/>
        <TextResumeAbout  style = {{gridArea: "textresumeabout"}}  initial = {this.anima.initial} whileInView = {this.anima.whileInView}>
          But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth must actual teachings of the great  this mistaken idea of denouncing pleasure.
          <MoreRead onClick = {() => this.setState({display: (this.state.display == 'none' ? 'flex' : 'none')})}> {this.state.display=='none' ? "leia mais" : "leia menos"} </MoreRead>
        </TextResumeAbout>
        <TextAbout style = {{display: this.state.display, gridArea: "textabout"}} initial = {this.anima.initial} whileInView = {this.anima.whileInView}>
          But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because. 
        </TextAbout>
      </AboutStyle>
    );
  }
};
