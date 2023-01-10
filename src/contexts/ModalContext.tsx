import styled from "@emotion/styled";
import {createContext, useEffect, useState, ReactNode, useContext} from "react";
import Form from "../components/forms/FormLogin";
import ModalAlert from "../components/modalalert/ModalAlert";
import colors from "../styles/colors";
import { AuthContext } from "./AuthContext";

type ModelType = {
  msg: string | number,
  color: string
};

type FormModelType = boolean;

type ModalTypeContext = {
  setModal: any,
  modal: ModelType,
  setIsModalVisible: (value: boolean) => void,
  isModalVisible: boolean,
  setFormModal: (value: boolean) => void,
  formModal: FormModelType
}

const initialValue = {
  setModal: () => {},
  setIsModalVisible: () => {},
  isModalVisible: false,
  modal: {
    msg: "",
    color: ""
  },
  setFormModal: () => {},
  formModal: false
}

const Float = styled.div`
  align-items: center;
  background-color: #00000047;
  grid-template-columns: auto;
  position: fixed;
  min-height: 100%;
  width: 100%;
  display: grid;
  z-index: 8;
`;

export const ModalContext = createContext<ModalTypeContext>(initialValue);

export const ModalProvider = ({children} : {children: ReactNode}) => {
  
  const {user}: any = useContext(AuthContext);
  const [modal, setModal] = useState(initialValue.modal);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [formModal, setFormModal] = useState(initialValue.formModal);

  useEffect(() => {
    if(isModalVisible) setTimeout(() => {
      setIsModalVisible(false);
    }, 3000);
  }, [isModalVisible]);

  return (<ModalContext.Provider value={{setModal, modal, setIsModalVisible, isModalVisible, formModal, setFormModal}}>
    {isModalVisible ? <ModalAlert color={modal.color}>{modal.msg}</ModalAlert> : null}
    {((formModal && !user.exists) ? 
      (<Float>
        <Form css=""/>
      </Float>) 
    : null)}
    {children}
  </ModalContext.Provider>);
};