import styled from '@emotion/styled';
import colors from '../../styles/colors';
import { ThemeProps } from '../../styles/theme';

export const ToolsLogin = styled.div`
  background-color: ${colors.blue};
`;

const FormLoginStyle = styled.div`
  ${({css} : {css: string}) => css}
  margin: auto;
  background-color: ${({theme}: {theme?: ThemeProps}) => theme?.colors?.secondary};
  border-radius: 15px;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  .toolswindow {
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: 10px;
  }
  .main {
    width: 450px;
    align-items: center;
    display: flex;
    flex-direction: column;
    padding: 35px;
    padding-top: 0px;
    > h1 {
      margin-bottom: 40px;
      font-size: 1.5em;
    } 
    input[type=submit] {
      background-color: ${colors.carbon};
      border: none;
      border-radius: 20px;
      cursor: pointer;
      margin-top: 25px;
      padding: 12px 20px;
    }
    #admlogin {
      box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
      border-radius: 100px;
      display: flex;
      font-family: Arial, Helvetica, sans-serif;
      font-size: 15px;
      font-weight: bold;
      padding: 14px 15px;
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

export default FormLoginStyle;