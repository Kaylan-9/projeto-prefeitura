import styled from "@emotion/styled";
import { ThemeProps } from "../../styles/theme";

const SearchStyle = styled.div<{theme?: ThemeProps}>`
  padding: 25px 70px;
  padding-bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .message {
    color: ${({theme}) => theme?.colors?.tertiary};
    border-radius: 17px;
    margin-top: 30px;
    font-size: 22px;
    font-family: 'Comfortaa', cursive;
    line-height: 50px;
    text-align: center;  
    font-size: 23px;
  }
  .search { 
    display: grid;
    align-items: center;
    grid-template-columns: min-content auto;
    gap: 25px;
    button[type="button"] {
      background-color: ${({theme}) => theme?.colors?.quaternary};
      padding: 11px 12px;
      border-radius: 50px;
      cursor: pointer;
      svg {
        font-size: 25px;  
        * {
          color: ${({theme}) => theme?.colors?.primary};
        }
      }
      &::after {
        content: " ";
      }
    }
    input[type="text"] {
      border-radius: 50px;
      border: none !important;
      padding: 15px 30px;
      font-size: 20px;
      font-weight: bold;
      background: ${({theme}) => theme?.colors?.quaternary};
      color: ${({theme}) => theme?.colors?.primary};
      width: 700px;
    }
    position: relative;
    transform: translateY(25px);
  }
`;

export default SearchStyle;