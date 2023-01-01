import { useContext, useRef, useEffect, FormEvent } from 'react';
import Input from '../input/Input';
import { AuthContext } from '../../contexts/AuthContext';
import { BiUser, BiWindowClose } from "react-icons/bi";
import { RiLockPasswordLine } from "react-icons/ri";
import { ModalContext } from '../../contexts/ModalContext';
import colors from '../../styles/colors';
import { css } from '@emotion/css';
import FormLoginStyle from './FormLogin.style';

const closeWindow = css`
  background-color: transparent;
  border: none;
  svg > * {color: ${colors.red}};
  font-size: 25px;
`;

const Form = ({css}: any) => {
  const {user, setUserMod} : any = useContext(AuthContext);
  const username = useRef<HTMLInputElement>(null!);
  const userpass = useRef<HTMLInputElement>(null!);
  const {setModal, setIsModalVisible, isModalVisible, setFormModal} = useContext(ModalContext);

  useEffect(() => {
    setModal({
      msg: user.msg,
      color: colors.red
    });
  }, [setIsModalVisible, setModal, user.msg]);


  function admlogin(e: FormEvent<HTMLInputElement>): void {
    e.preventDefault();
    if (!isModalVisible) setIsModalVisible(true);
    const auth = {
      name: username.current.value,
      password: userpass.current.value
    };
    setUserMod(auth);
  }

  return <FormLoginStyle css={css}>
    <div className='toolswindow'>
      <button className={closeWindow} onClick={() => setFormModal(false)}>
        <BiWindowClose/>
      </button>
    </div>
    <form className="main">
      <h1>Acessar gerenciamento</h1>
      <Input ref={username} id="username" value="identificador de administrador" Icon={<BiUser/>}/>
      <Input ref={userpass} id="userpass" value="senha de administrador" type="password" Icon={<RiLockPasswordLine/>}/>
      <input id="admlogin" type="submit" defaultValue="Entrar" onClick={admlogin}/>
    </form>
  </FormLoginStyle>;
}

export default Form;