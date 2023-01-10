import { forwardRef, ReactNode } from 'react';
import InputStyle, { InputColorStyle } from './Input.style';

interface InputModel {
  id: string;
  value: string;
  type?: string;
  Icon?: ReactNode;
};

const Input = forwardRef((props: InputModel, ref: any) => {
  return <InputStyle>
    <label htmlFor={props.id}><span>{props.Icon}</span> {props.value}</label>
    <input ref={ref} type={props.type}/>
  </InputStyle>;
});

type InputColorType = {
  id?: string | undefined;
  name: string
}

export const InputColor = forwardRef((props: InputColorType, ref: any) => {
  return <InputColorStyle>
    <label>{props.name}</label>
    <span>
      <input id={props.id} ref={ref} type="color"/>
    </span>
  </InputColorStyle>;
});

export default Input;