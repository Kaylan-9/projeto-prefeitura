import { css } from '@emotion/react';
import styled from '@emotion/styled';
import colors from '../../styles/colors';
import mqs from '../../styles/medias';
import { ThemeProps } from '../../styles/theme';

export const text_content = css`
  background-color: white;
  padding: 50px;
  color: black;
  padding-top: 20px;
  p {
    line-height: 30px;
    margin-top: 20px;
    word-spacing: 4px;
    &:last-child{margin-bottom: 0}
  }  
`;

export const Report = styled.li`
  background-color: ${({theme}: {theme?: ThemeProps}) => theme?.colors?.tertiary};
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  overflow: hidden;
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
    border-bottom: solid 1px white;
    > .date-content {
      padding: 25px 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      font-weight: bold;
      *, & {
        transform: scale(1.05);
        color: ${({theme}: {theme?: ThemeProps}) => theme?.colors?.primary};
      }
    }
  }
  > .text-content {
    ${text_content}
    > span > .link {
      color: ${({theme}: {theme?: ThemeProps}) => theme?.colors?.primary};
      align-items: center;
      box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
      border: none;
      border-radius: 100px;
      display: flex;
      font-family: Arial, Helvetica, sans-serif;
      font-size: 15px;
      font-weight: bold;
      gap: 10px;
      padding: 14px 15px;
      *:not(svg) {
        margin: 0 auto;
      }
      box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
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
