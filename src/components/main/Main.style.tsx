import styled from '@emotion/styled';
import { ThemeProps } from '../../styles/theme';
import mqs from '../../styles/medias';

const Main = styled.main`
  padding: 35px;
`;

export const MainAdmin = styled(Main)`
  display: grid;
  gap: 25px;
  padding-top: 0px;
  ${mqs[4]}{
    grid-template-columns: auto;
  }
  ${mqs[2]} {
    padding: 15px;
    padding-top: 0px;
  }
`;

export const MainInfo = styled(Main)`
  width: 100%;
  min-height: calc(65vh - 66px);
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  * {color: ${({theme} : {theme?: ThemeProps}) => theme?.colors?.tertiary}}
  h2 {
    text-align: center;
    margin-bottom: 75px;
    font-size: 32.5px;
    width: 100%;
  }
  ul {
    align-items: center;
    display: grid;
    gap: 25px;
    grid-template-columns: repeat(auto-fill, minmax(650px, 1fr));
    width: 100%;
    box-sizing: border-box;
  }
`;

export const MainInfos = styled(Main)`
  width: 100%;
  min-height: calc(65vh - 66px);
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 35px;
  h2 {
    text-align: center;
    margin-bottom: 75px;
    font-size: 32.5px;
    width: 100%;
  }
  ul {
    align-items: center;
    display: grid;
    gap: 25px;
    grid-template-columns: repeat(auto-fill, minmax(650px, 1fr));
    width: 100%;
    box-sizing: border-box;
    li {
      border-radius: 17px;
    }
  }
`;



export default Main;