import {styled, font, color, mq, H3} from '../styles/styles';
import {BsFacebook, BsInstagram} from 'react-icons/bs';


const FooterStyle  = styled.footer`
  display: grid;
  font-family: ${font.Roboto};
  gap: 30px;
  grid-area: ${props => props.area};
  grid-template-areas: 'fc fs fm' 
                       'fi fl fl';
  grid-template-columns: max-content auto 500px;
  justify-content: space-between;
  padding: 125px 5vw;
  max-width: ${props => props.maxsize ? `${props.maxsize}px` : "1250px"};
  margin: 0px auto;
  > * > h3 { 
    color: white;
    font-weight: bold;
    margin-bottom: 20px;
  }
  span { font-family: 15px; }
  ${mq[5]} { 
    grid-template-areas: 'fc fi fs'
                         'fm fm fm'
                         'fl fl fl';
    grid-template-columns: auto auto auto;
  }
  ${mq[1]} {  
    padding: 50px 5vw;
    gap: 30px;
    grid-template-areas: 'fs'
                         'fc' 
                         'fi' 
                         'fm'
                         'fl';
    grid-template-columns: auto;
    > * > h3 { 
      display: none; 
    }
  }
  ${mq[0]} {
    padding: 25px;
  }
`;

const Contact  = styled(({className, infoName, info}) => (
  <li> 
    <p {...{className}}> 
      <span> {infoName} </span>
      {info}
    </p>
  </li>
))`
  color: ${color.white};
  display: flex;
  flex-direction: row;
  font-family: ${font.Source};
  font-weight: bold; 
  gap: 10px;
  font-size: 16px;
  > span { 
    color: ${color.green}; 
    font-size: 17px;
  }
`;

const MsgFooter = styled.p`
  color: white;
  font-size: 15px;
  font-family: ${font.Source};
  font-weight: lighter;
  grid-area: ${props => props.area};
  line-height: 40px;
  text-align: justify;
  word-spacing: 2px;
`;

const FooterContacts = styled.section`
  > ul {
    display:  flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-between;
    column-gap: 100px;
    row-gap: 25px;
    li > p {
      word-wrap: normal;
    }
  }
`;

const FooterSocialMedia = styled.section`
  grid-area: ${props => props.area};
  > ul {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
  }
`;

const SocialMedia = styled(({className, icon, link}) => (
  <li {...{className}}>
    <a href = {link}>
      {icon}
    </a>
  </li>
))`
  cursor: pointer;
  a {
    ${props => `color: ${props.color};`};
  }
`;

const FooterInfo = styled.section`
  grid-area: ${props => props.area};
  > ul {
    > li {
      color: ${color.white};
      font-family: ${font.Source};
      font-size: 17px;
      font-weight: bold; 
      > span {
        color: ${color.green};
      }
    }
  }
`;

const LastFooter  = styled(({className, area, copyright, signature}) => (
  <div {...{className}} style = {{gridArea: area}}>
    <p className = "copyright"> Copyright © Todos os direitos reservados {copyright} </p>
    <p className = "signature"> 
      <span> Desenvolvido por </span>
      {signature} 
    </p>
  </div>
))` 
  align-items: center;
  color: ${color.white};
  display: flex;
  gap: 30px;
  justify-content: space-between;
  .copyright {
    font-family: ${font.Source};
    font-size: 16px;
    font-weight: 600;
    line-height: 30px;
  }
  .signature {
    color: ${color.white};
    font-family: ${font.Source};
    font-size: 16px;
    font-weight: bold;
    line-height: 30px;
    span {
      color: ${color.green};
      font-size: 17px;
    }
  }
  ${mq[5]} {
    border-top: solid 1px ${color.white};
    gap: 40px;
    padding: 15px 0px;
  }
  ${mq[1]} {
    flex-direction: column;
    gap: 30px;
  }
`;

export default ({maxsize}) => <FooterStyle maxsize={maxsize}>
  <FooterContacts id = 'contacts' area = 'fc'>
    <H3> Contatos </H3>
    <ul>
      <Contact info = "(3651-9698)" infoName = "Telefone da T.I"/>
      <Contact info = "cpd@pinhal.sp.gov.br" infoName = "E-mail da T.I"/>
    </ul>
  </FooterContacts>
  <MsgFooter area = 'fm'>
    Essa página foi construida e pensada pelos funcionários e estagiários do Departamento de T.I. da Prefeitura de Espírito Santo do Pinhal ❤️.
    Com o fim de sanar os problemas relacionados a encontrar sites e sistemas online da Prefeitura, e, além disso informações do
    Departamento de Tecnologia.
  </MsgFooter>
  <FooterSocialMedia area = "fs">
    <H3> Redes Socias </H3>
    <ul>
      <SocialMedia icon = {<BsFacebook size = {26}/>} color = {color.facebook} link = "https://pt-br.facebook.com/prefeituramunicipaldeespiritosantodopinhal/"/>
      <SocialMedia icon = {<BsInstagram size = {26}/>} color = {color.instagram} link = "https://www.instagram.com/accounts/login/?next=/prefeituraespinhal/"/>
    </ul>
  </FooterSocialMedia>
  <FooterInfo area = "fi">
    <H3> Informações </H3>
    <ul>
      <li><span>Horário de atendimento</span> das 7:30 à 14:30</li>
    </ul>
  </FooterInfo>
  <LastFooter area = 'fl' copyright = "ao departamento de T.I. da prefeitura de Espírito Santo do Pinhal" signature = "Kaylan C.G."/>
</FooterStyle>;

