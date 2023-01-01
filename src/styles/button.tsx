import styled from "@emotion/styled";
import {Link} from 'react-router-dom';

export const Button = styled.button`
  align-items: center;
  border: none;
  border-radius: 100px;
  display: flex;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 15px;
  font-weight: bold;
  gap: 10px;
  padding: 12px;
  cursor: pointer;
  *:not(svg) {
    margin: 0 auto;
  }
`;

export const Input = Button.withComponent('input');
export const LinkSt = Button.withComponent(Link);