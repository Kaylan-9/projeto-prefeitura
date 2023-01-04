import { css } from '@emotion/css';
import { FunctionComponent, ReactNode } from 'react';
import mqs from '../../styles/medias';
import { useTheme } from '@emotion/react';
import { ThemeProps } from '../../styles/theme';


export const Aside: FunctionComponent<{children: ReactNode}> = ({children}) => {
  const theme: ThemeProps = useTheme();
  return <div className={css`
    min-width: 301px;
    margin-right: 35px;
    padding: 25px 0;
    background-color: ${theme?.colors?.secondary};
    border-radius: 18px;  
    box-shadow: 
      rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
      rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
    box-sizing: border-box;
    grid-area: nav;
    position: sticky;
    position: -webkit-sticky;
    top: 15px;
    z-index: 5;
    ${mqs[3]} {
      width: 100%;
      margin-right: 0px;
      padding: 25px 0;
    }
    aside {
      display: flex;
      flex-direction: column;
      gap: 19px;
      ${mqs[3]} {
        flex-direction: row;
      }
    }
    h2 {
      font-size: 22px;
      font-weight: lighter;
      margin-bottom: 35px;
      padding: 0px 35px;
      grid-area: categories;
      ${mqs[3]} {
        display: none;
      }
    }
    ${mqs[3]} {
      margin-bottom: 30px;
    }
  `}>
    <h2>Navegação</h2>
    <aside>{children}</aside>
  </div>;
}



export default Aside;