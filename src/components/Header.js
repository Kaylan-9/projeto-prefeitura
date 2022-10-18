import React, {Component} from 'react';
import {HeaderStyle, Title} from '../styles/Header.styles';
import Nav from './Nav';
import logo from '../img/logo.png';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      displayNav: "flex"
    };
  }

  render () {
    return (<HeaderStyle maxsize={this.props.maxsize}>
      <div className = "headinfo">
        <img src = {logo}/>
        <Title> 
          <h1> TI </h1> 
          <div>
            <h4> ESPÍRITO SANTO DO PINHAL </h4>
            <h5> portal de informações e recursos úteis </h5>
          </div>
        </Title>
      </div>
      <Nav display = {this.state.displayNav}/>
    </HeaderStyle>);
  }
};