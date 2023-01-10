import { css } from '@emotion/css';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import {FunctionComponent, useState, useEffect} from 'react';
import colors from '../../styles/colors';
import { ThemeProps } from '../../styles/theme';

interface Props {
  name?: string;
  funcClick: (e: any) => void;
  setCheck: boolean;
}
 
const Checkbox = styled.div`
  .ikxBAC {
    appearance: none;
    background-color: ${({theme} : {theme: ThemeProps}) => theme?.colors?.quaternary};
    border-radius: 15px;
    border-style: none;
    flex-shrink: 0;
    height: 25px;
    margin: 0;
    position: relative;
    width: 50px;
  }

  .ikxBAC::before {
    bottom: -6px;
    content: "";
    left: -6px;
    position: absolute;
    right: -6px;
    top: -6px;
  }

  .ikxBAC,
  .ikxBAC::after {
    transition: all 100ms ease-out;
  }

  .ikxBAC::after {
    background-color: ${({theme} : {theme: ThemeProps}) => theme?.colors?.tertiary};
    border-radius: 15px;
    content: "";
    height: 19px;
    left: 3px;
    position: absolute;
    top: 3px;
    width: 19px;
  }

  input[type=checkbox] {
    cursor: default;
  }

  .ikxBAC:hover {
    background-color: ${({theme} : {theme: ThemeProps}) => theme?.colors?.quaternary};
    transition-duration: 0s;
  }

  :focus:not(.focus-visible) {
    outline: 0;
  }

  .ikxBAC:checked {
    background-color: ${colors.blue};
    :hover {background-color: ${colors.blue}}
    ::after {
      background-color: ${({theme} : {theme: ThemeProps}) => theme?.colors?.tertiary};
      left: 28px;
    }
  }
`;

const LocalMarking : FunctionComponent<Props> = ({funcClick, setCheck, name}) => {
  const [defaultChecked, setChecked] = useState<boolean>(false);
  useEffect(() => setChecked(setCheck ? true : false), [setCheck]);
  const theme: ThemeProps = useTheme();
  return <Checkbox onClick={funcClick} theme={theme}>
    <input type="checkbox" name={name} className="sc-gJwTLC ikxBAC" {...{defaultChecked}}/>
  </Checkbox>;
}
 
export default LocalMarking;