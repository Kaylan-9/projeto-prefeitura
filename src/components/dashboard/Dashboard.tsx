import {FunctionComponent} from 'react';
import { useTheme } from '@emotion/react';
import { ThemeProps } from '../../styles/theme';
import DashboardsPages from './DashBoardsPages';
import styled from '@emotion/styled';
import mqs, { sizes } from '../../styles/medias';
import DashBoardCardUsers from './DashBoardCardUsers';
import DashBoardsInfos from './DashBoardsInfos';

const DashboardStyle = styled.div`
  display: grid;
  grid-template-columns: 375px auto auto;
  grid-template-areas: 
    'doughnut-pages bar-pages'
    'doughnut-infos bar-infos' 
    'data-users data-users';
  box-sizing: border-box;
  width: ${sizes[3]}px;
  max-width: ${sizes[3]}px !important;
  margin-left: calc(50% - (355px) - (${sizes[3]}px / 2));
  gap: 25px;
  ${mqs[5]} {
    margin-left: 0;
    grid-template-columns: auto;
    grid-template-areas: 'doughnut-pages' 'bar-pages' 'bar-infos' 'doughnut-infos' 'data-users' !important;
    max-width: calc(100% - 375px) !important;
  }
  ${mqs[3]} {
    margin-left: 0;
    max-width: 100% !important;
  }
  section { 
    overflow: hidden;
    box-sizing: border-box;
    background-color: ${({theme} : {theme: ThemeProps}) => theme.colors?.secondary};
    padding: 30px;
    border-radius: 15px;
    h2 {
      margin-bottom: 40px;
      display: flex;
      gap: 10px;
      align-items: center;
      justify-content: center;
      font-size: 22px;
    }
  }
`;

const DashBoard : FunctionComponent<{}> = () => {
  const theme: ThemeProps = useTheme();
  return (<DashboardStyle theme={theme}>
    <DashboardsPages/>
    <DashBoardCardUsers/>
    <DashBoardsInfos/>
  </DashboardStyle>);
}
 
export default DashBoard;