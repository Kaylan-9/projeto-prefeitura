import {styled, color, font, mq} from '../styles/styles';
import InformationStyle, {Title, Enfase, Info, Text, Navlinks} from '../styles/Information.styles';
import {motion} from "framer-motion";
import {AiOutlineRightSquare} from 'react-icons/ai';
import {React, useState} from 'react';


const Infos  = styled(({className, children, anima, click, display}) => (
  <motion.ul {...{className}} initial = {anima.initial} whileInView = {anima.whileInView}>
    <li>
      <h4 className = "subtitle"> Como criar um chamado do zero </h4>
      <Text>
        Para se criar um chamado incíalmente é necessário acessar a seguinte página na 
        "URL" de seu navegador, ou clicando neste link: 
        <a href = "https:\\10.10.100.5\hesk"><Enfase text = "https:\\10.10.100.5\hesk"/></a>
        (não considere a copia de aspas duplas), ou navegue até a seção (parte da página) acessos úteis em 
        <Enfase text = "sistema de chamados"/>
        <Text> 
            Logo em seguida, clicar em <Enfase text = "Enviar um chamado"/>. 
            Observação: esta opção levará até outro painel com outras quatro opções. Pressione 
            o botão <Enfase text = "Geral"/>.
        </Text>
        <Navlinks>
          <span class="navlink-title"> Enviar um chamado </span>  
          <AiOutlineRightSquare size={35} color={color.facebook}/>
          <span class="navlink-title"> Geral </span>         
        </Navlinks>
      </Text>

      <a className = "moreread" href = "#moreread" onClick = {click}> 
        leia {display == "none" ? "mais" : "menos"}
      </a>
    </li>

    {children}
  </motion.ul>
))`
  gap: 20px;
  color: ${color.white};
  font-family: ${font.Source};
  > li {
    background: ${color.tres};
    border-radius: 15px;
    color: white;
    font-weight: bolder;
    word-wrap: break-word;
    padding: 35px;
    .subtitle {
      font-weight: bolder;
      font-size: 18px;
      font-family: ${font.Roboto};
      margin-bottom: 20px;
    }
    .moreread {
      background: -webkit-linear-gradient(180deg, ${color.green} 0%, ${color.facebook} 25%);
      font-family: ${font.Kantumruy};
      font-size: 18px;
      font-weight: bolder !important;
      text-align: end;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      word-spacing: -2px;
    }
    ${mq[0]} {
      border-radius: 0px;
      box-shadow: none;
      padding: 70px 0px;
      div > .subtitle {
        font-size: 20px;
        margin-bottom: 50px;
      }
    }
  }
`;


export default function Information({maxsize}) {
  const [display, setDisplay] = useState('none');
  const anima = {
    initial: {
      opacity: 0,
      y: -100
    },
    whileInView: {
      opacity: 1,
      y: 0
    }
  };

  return (
    <InformationStyle id = "principal" maxsize={maxsize}>
      <Title {...{anima}}/>

      <Infos {...{anima}} click = {() => setDisplay(display == "none" ? "flex" : "none")} {...{display}}>
        {/*! informação 2 */}
        <Info background = {color.tres} style={{display}}> 
          <Text> 
            Logo em seguida, preencha todos os campos com as informações corretas (com isso podemos realizar um atendimento mais
            breve), certifique-se de que o campo "departamento" não está com a opção "Gabinete" selecionada, a não ser que o seu
            departamento seja o mesmo.
          </Text>
          <Enfase text = "Feito isso detalhe o máximo possível as informações na àrea 'Mensagem'" />
        </Info>

      </Infos>

    </InformationStyle>
  );
}