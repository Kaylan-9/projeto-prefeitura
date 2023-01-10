import { css } from '@emotion/react';
import styled from '@emotion/styled';
import colors from '../../styles/colors';
import mqs from '../../styles/medias';
import { ThemeProps } from '../../styles/theme';

export const text_content = css`
  p {
    line-height: 30px;
    margin-top: 20px;
    word-spacing: 4px;
    &:last-child{margin-bottom: 0}
  }  
`;

export const Report = styled.li<{theme?: ThemeProps}>`
  background-color: ${({theme}) => theme?.colors?.secondary};
  overflow: hidden;
  border: solid 2px ${({theme}) => theme?.colors?.primary};
  * {
    -webkit-touch-callout: text;
    -webkit-user-select: text;
    -khtml-user-select: text;
    -moz-user-select: text;
    -ms-user-select: text;
    user-select: text;
    ::selection {
      background-color: ${colors.green} !important;
    }
  }
  > .superior-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 15px;
    > .date-content {
      padding: 10px 35px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      font-weight: bold;
      *, & {
        transform: scale(1.05);
      }
    }
  }

  > .inferior_content {
    align-items: center;
    display: grid;
    grid-template-columns: auto min-content;
    padding: 25px 35px;
    color: black;
    > .text-content {
      ${text_content}
    }
    > .link {
      margin-left: 35px;
      align-items: center;
      border: solid 2px ${({theme}) => theme?.colors?.primary};
      border-radius: 100px;
      display: flex;
      font-family: Arial, Helvetica, sans-serif;
      font-size: 15px;
      font-weight: bold;
      gap: 10px;
      padding: 14px 15px;
      writing-mode: vertical-lr;
      *:not(svg) {
        margin: 0 auto;
      }
      display: inline;
    }
  }
  > h3 {
    color: ${colors.blue};
    font-family: Arial, Helvetica, sans-serif;  
    font-size: 30px;
    padding: 20px 30px;
    margin-top: 5px;
    ${mqs[0]} {margin: 35px 0}
  }
  ${mqs[2]} {border-radius: 0px}
`;
