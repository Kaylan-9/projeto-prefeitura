import styled from '@emotion/styled';
import colors from '../../styles/colors';
import medias from '../../styles/medias';
import { ThemeProps } from '../../styles/theme';

export const TitlePages = styled.h2`
  color: ${({theme}: {theme?: ThemeProps}) => theme?.colors?.secondary};
  margin-bottom: 25px;
  text-align: center;
  padding: 10px;
  display: flex;
  font-weight: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const PagesStyle = styled.li`
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  break-inside: avoid;
  page-break-inside: avoid;
  display: flex;
  flex-direction: column;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  border-radius: 15px;
  background-color: ${({theme}: {theme?: ThemeProps}) => theme?.colors?.secondary};
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  > h2 {
    background: ${({color} : {color?: string}) => color};
    background: linear-gradient(90deg, rgba(255,255,255,0) 100%);
    padding: 25px 35px;  
    padding-bottom: 5px;
  } 
  > ul {
    align-items: flex-start;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(275px, 1fr));
    list-style-type: none;
    overflow: hidden;
    padding: 25px;
    gap: 35px;
    ${medias[1]} {
      grid-template-columns: auto;
    }
  }
  ${medias[0]} {margin-bottom: 25px}
`;

export const PageStyle = styled.li<{theme?: ThemeProps, src: string}>`
  break-inside: avoid;
  border-top: none;
  border-radius: 15px; 
  page-break-inside: avoid;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  > a {
    font-weight: 700;
    width: 100%;
    text-align: center;
    font-size: 15px;
    padding: 7px 0;
    border-radius: 10px 10px 0 0;
    background-color: ${({theme}) => theme?.colors?.secondary};
    cursor: pointer;
  }
  .image, .container-dislike {
    min-height: 150px;
    background-color: ${({theme}) => theme?.colors?.secondary};
    width: 100%;
  }
  .container-dislike { 
    align-items: center;
    display: flex;
    justify-content: center;
    border-radius: 0 0 15px 15px;  
    button > svg {
      font-size: 25px; 
      transition: transform 350ms;
      :hover {
        transform: scale(1.35);
      }
    }
  }
  .image {
    background: url(${({src}: {src: string}) => src}) !important;
    background-position: center !important;
    background-size: cover !important;
    background-repeat: no-repeat !important;
    box-sizing: border-box;
    border-radius: 0 0 19px 19px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    :hover {
      .tools {
        max-height: 100%;
        padding: 20px 15px;
      }
    }
    a {
      min-height: calc(100% - 40px);
    }
    .tools {
      transition: max-height 1s, padding 1s;
      background-color: ${({theme}) => theme?.colors?.secondary};
      align-items: center;
      display: flex;
      justify-content: space-between;
      gap: 15px;
      max-height: 0;
      padding: 0 15px;
      overflow: hidden;
      border-radius: 0 0 15px 15px;  
      span {
        font-weight: bold;
      }
      .btn-dislike, .btn-like {font-size: 10px}
      .btn-info {font-size: 10px}
      > button > svg { 
        font-size: 15px; 
        transition: transform 350ms;
        :hover {
          transform: scale(1.35);
        }
      }
    }
  }  
`;

export const ListPagesWithoutGroups = styled.ul`
  display: grid !important;
  gap: 50px;
  margin-bottom: 550px;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

export const ListPagesWithGroups = styled(ListPagesWithoutGroups)`
  padding: 0;
  grid-template-columns: auto;
`;