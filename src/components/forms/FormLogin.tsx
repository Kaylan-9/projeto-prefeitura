import { useContext, useRef, useEffect, KeyboardEvent, FormEvent, useCallback } from 'react';
import Input from '../input/Input';
import { AuthContext, AuthType } from '../../contexts/AuthContext';
import { BiUser, BiWindowClose } from "react-icons/bi";
import { RiLockPasswordLine } from "react-icons/ri";
import { ModalContext } from '../../contexts/ModalContext';
import colors from '../../styles/colors';
import { css } from '@emotion/css';
import FormLoginStyle from './FormLogin.style';
import { Button } from '../../styles/button';

const closeWindow = css`
  background-color: transparent;
  border: none;
  svg > * {color: ${colors.red}};
  font-size: 25px;
`;

const Form = ({css}: any) => {
  const {user, setUserMode} : AuthType = useContext(AuthContext);
  const username = useRef<HTMLInputElement>(null!);
  const userpass = useRef<HTMLInputElement>(null!);
  const buttonadm = useRef<HTMLButtonElement>(null!);
  const {setModal, setIsModalVisible, isModalVisible, setFormModal} = useContext(ModalContext);

  useEffect(() => {
    setModal({
      msg: user?.msg ?? "",
      color: colors.red
    });
    username.current.addEventListener("keyup", (event) => {
      event.preventDefault();
      if(event.key==="Enter") userpass.current.focus();
    });
    userpass.current.addEventListener("keyup", (event) => {
      event.preventDefault();
      if(event.key==="Enter") admlogin();
    });
  }, [setIsModalVisible, setModal, user]);


  const admlogin = useCallback(() => {
    if (!isModalVisible) setIsModalVisible(true);
    if(typeof username.current.value==="string" && typeof userpass.current.value==="string") {
      const auth =  {
        name: username.current.value,
        password: userpass.current.value 
      };
      setUserMode(auth);
    }
  }, [setUserMode, setIsModalVisible]);

  return <FormLoginStyle css={css}>
    <div className='toolswindow'>
      <button className={closeWindow} onClick={() => setFormModal(false)}>
        <BiWindowClose/>
      </button>
    </div>
    <div className="main">
      <h1>Login</h1>
      <Input ref={username} id="username" value="nome" Icon={<BiUser/>}/>
      <Input ref={userpass} id="userpass" value="senha" type="password" Icon={<RiLockPasswordLine/>}/>
      <Button id="admlogin" type="button" onClick={admlogin}>Autenticar</Button>
    </div>
  </FormLoginStyle>;
}

export default Form;