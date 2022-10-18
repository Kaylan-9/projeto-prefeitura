import Notificacoes from './Notificacoes';
import Item from './Nav.item';
import NavStyle, {BtnPanelBar} from '../styles/Nav.styles';
import {RiNotification2Fill, RiGlobalFill, RiInformationFill} from 'react-icons/ri';
import {GoKebabHorizontal, GoGear} from 'react-icons/go';
import { Component } from 'react';


export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.sizeIcon = 16;
  }

  render() {
    return [
      <NavStyle display = {this.props.display}>
        <Item toolId = "paginas" icon = {<RiGlobalFill size = {this.sizeIcon}/>} title = "acessos úteis" />
        <Item toolId = "about" icon = {<RiInformationFill size = {this.sizeIcon}/>} title = "sobre" />
        <Item toolId = "" icon = {<RiNotification2Fill size = {this.sizeIcon}/>} title = "notificações" init = {(e) => {
          let qNotificacoes = e.currentTarget.children[0].children.length;
          if (qNotificacoes == 0) e.currentTarget.parentNode.remove();
        }}>
          <Notificacoes content={[
            "Atualmente o número de máquinas para a troca é limitada",
            "Notebooks ou outros equipamentos similares, não são permitidos de se conectarem a rede da prefeitura com excecção de Tablets ou Smartphones",
            "Problemas relacionados ao sistema do Assessor, como a perda de usuário são de responsabilidade do Assessor"
          ]}/>
        </Item>
        <Item toolId = "gerenciar" icon = {<GoGear size = {this.sizeIcon}/>} title = "gerenciar"/>
      </NavStyle>,

      <BtnPanelBar icon = {<GoKebabHorizontal size = {32}/>} click = {() =>
        this.setState({displayNav: (this.state.displayNav == 'flex' ? 'none' : 'flex')})
      }/>
    ];
  }
}

