import styled from '@emotion/styled';
import colors from '../../styles/colors';
import { ThemeProps } from '../../styles/theme';

export const ToolsLogin = styled.div`
  background-color: ${colors.blue};
`;

const FormLoginStyle = styled.form`
  ${({css} : {css: string}) => css}
  margin: auto;
  background-color: ${({theme}: {theme?: ThemeProps}) => theme?.colors?.primary};
  border-radius: 15px;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  .toolswindow {
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    background-color: ${({theme}: {theme?: ThemeProps}) => theme?.colors?.secondary};
    margin-bottom: 35px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
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
      background-color: ${colors.carbon};
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

export default FormLoginStyle;