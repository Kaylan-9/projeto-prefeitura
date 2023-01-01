import {forwardRef, ReactNode} from 'react';
import { BiMessageDetail } from 'react-icons/bi';
import ModalAlertStyle from './ModalAlert.style';

type ModalAlertType = {
  children?: ReactNode, 
  color: string
}

const ModalAlert = forwardRef(({children, color} : ModalAlertType, ref : any) => {
  return <ModalAlertStyle ref={ref} color={color}>
    <div className="float">
      <div className="icon"><BiMessageDetail/></div>
      <p>{children}</p>
    </div>
  </ModalAlertStyle>;
});

export default ModalAlert;
