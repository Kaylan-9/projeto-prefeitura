import {css} from '@emotion/react';
import { ThemeProps } from './theme';

const styles = (theme: ThemeProps) => css`
  @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@500&display=swap');
  * { 
    box-sizing: border-box;
    &:not(.text-content *) {
      color: ${theme?.colors?.tertiary};
    }
    margin: 0px;
    outline: none;
    font-family: Arial, Helvetica, sans-serif;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  a {
    text-decoration: none;
  }
  button {
    background-color: transparent;
    border: none;
    padding: 0 6px;
  }
  ul {padding-left: 0}
  li {list-style-type: none}
  table {border: none}
`;

export default styles;