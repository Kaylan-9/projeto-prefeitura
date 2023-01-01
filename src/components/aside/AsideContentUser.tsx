import { css } from "@emotion/css";
import { useTheme } from "@emotion/react";
import { FunctionComponent, MouseEvent, useCallback, useContext, ReactNode } from "react";
import { BiBookHeart } from "react-icons/bi";
import { RiPagesFill } from "react-icons/ri";
import { ContentContext, ContentContextType } from "../../contexts/ContentContext";
import { Button as ButtonSt } from "../../styles/button";
import mqs from "../../styles/medias";
import { ThemeProps } from "../../styles/theme";

interface PropsBtnType {
  value: string;
  Icon: ReactNode;
  _mode: string;
}
 
const Button: FunctionComponent<PropsBtnType> = ({value, Icon, _mode}) => {
  const {mode, setMode}: ContentContextType = useContext(ContentContext);
  const theme: ThemeProps = useTheme();
  const handleClick = useCallback(async () => {
    setMode(_mode);
  }, [mode]);

  return (<ButtonSt onClick={handleClick} className={(mode===_mode ?     
    css`
      background-color: ${theme?.colors?.tertiary} !important;
      &, * {color: ${theme?.colors?.primary} !important}
    ` :
    css`
      background-color: ${theme?.colors?.secondary};
      &, * {color: ${theme?.colors?.tertiary} !important}
    ` 
  )}>
    {Icon}
    {value}
  </ButtonSt>);
};

const AsideContentUser: FunctionComponent<{}> = () => {
  return <nav className={css`
    padding: 0 35px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    row-gap: 35px;
    column-gap: 35px;
    ${mqs[3]} {
      flex-direction: row;
    }
  `}>
    <Button value="favoritos" Icon={<BiBookHeart/>} _mode="bookmarks"/>
    <Button value="páginas" Icon={<RiPagesFill/>} _mode="pages"/>
    <Button value="grupos" Icon={<RiPagesFill/>} _mode="groups"/>
  </nav>;
}

export default AsideContentUser;