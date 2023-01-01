import styled from "@emotion/styled";
import mqs from "../../styles/medias";
import { ThemeProps } from "../../styles/theme";

const SearchStyle = styled.div<{theme?: ThemeProps}>`
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
  * {
    color: ${({theme}) => theme?.colors?.secondary} !important;
    font-weight: 600;  
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  svg * {
    stroke: ${({theme}) => theme?.colors?.tertiary};
  }
  .search-input {
    border-radius: 30px !important;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
    background-color: ${({theme}) => theme?.colors?.tertiary};
    padding: 12px;
    box-shadow: none;
    font-weight: lighter;
    cursor: text;
    min-width: 350px;
    width: 100%;
    border: none;
    ${mqs[2]} {
      min-width: 100px;        
    }
  }
  .search-btn {
    cursor: pointer;
  }
`;

export default SearchStyle;