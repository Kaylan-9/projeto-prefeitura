import styled from '@emotion/styled';
import colors from '../../styles/colors';
import { ThemeProps } from '../../styles/theme';

const FormStyle = styled.form<{theme?: ThemeProps}>`
  background-color: ${({theme}: {theme?: ThemeProps}) => theme?.colors?.secondary};
  border-radius: 15px;
  max-width: 380px !important;
  width: 380px;
  position: absolute;
  transform: translateX(-50%);
  left: 50%;
  > h1 {
    margin-bottom: 40px;
    font-size: 1.5em;
  } 
  > div.main {  
    align-items: center;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    padding: 35px;
    input[type=submit] {
      background-color: ${({theme} : {theme: ThemeProps}) => theme?.colors?.tertiary};
      color: ${({theme} : {theme: ThemeProps}) => theme?.colors?.secondary};
      border: none;
      border-radius: 20px;
      cursor: pointer;
      margin-top: 25px;
      padding: 12px 20px;
    }
    #btnfirst {background-color: ${colors.red}}
    > div.btns {
      align-items: center;
      display: inline-flex;
      justify-content: space-between;
      width: 100%;
    }
  }
`;

export default FormStyle;