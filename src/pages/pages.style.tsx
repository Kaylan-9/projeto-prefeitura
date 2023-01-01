import styled from '@emotion/styled';
import mqs from '../styles/medias';
import { ThemeProps } from '../styles/theme';

export const HomeStyle = styled.div`
  display: grid;
  gap: 25px;
  grid-template-areas: 'h' 'm' 'f';
  grid-template-columns: auto;
  grid-template-rows: min-content auto min-content;
  min-height: 100vh;
  background-color: ${({theme}: {theme?: ThemeProps}) => theme?.colors?.primary};
  box-sizing: border-box;
  max-width: 100%;
  main {
    align-items: flex-start;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 25px;
    grid-area: m;
  }
`;

export const AdminStyle = styled.div`
  display: grid;
  gap: 45px;
  grid-template-areas: 'h h' 'm nav';
  grid-template-columns: auto min-content;
  grid-template-rows: min-content auto;
  min-height: 100vh;
  background-color: ${({theme}: {theme?: ThemeProps}) => theme?.colors?.primary};
  padding-bottom: 30px;
  ${mqs[1]} {
    grid-template-areas: 'h' 'a' 'm';
    grid-template-columns: auto;
    grid-template-rows: min-content min-content auto;
  }  
`;