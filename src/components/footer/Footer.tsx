import { useTheme } from '@emotion/react';
import { css } from '@emotion/css';
import {FunctionComponent} from 'react';
import mqs, { sizes } from '../../styles/medias';
import { ThemeProps } from '../../styles/theme';
 
const Footer : FunctionComponent<{}> = () => {
  const theme: ThemeProps = useTheme();
  return (<footer className={css`
    grid-area: f;
    div {
      display: grid;
      align-items: center;
      background-color: ${theme?.colors?.secondary};
      height: 85px;
      box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
      width: 100%;  
      box-sizing: border-box;
      margin: 0 auto;
      p {
        font-weight: lighter;
        text-align: center;
        color: #bebebe;
      } 
      ${mqs[2]} {padding: 0 15px}
    }        
  `}>
    <div>
      <p>© Copyright todos os direitos são reservados a prefeitura de Espírito santo do pinhal</p>
    </div>
  </footer>);
}
 
export default Footer;