import {FunctionComponent, useEffect, useState, useCallback} from 'react';
import { RiAccountBoxFill, RiLockPasswordFill, RiMarkPenFill, RiUser3Fill } from 'react-icons/ri';
import styled from '@emotion/styled';
import request from '../../utils/request';
import { ThemeProps } from '../../styles/theme';


const DashBoardCardUsersStyle = styled.section`
  grid-area: data-users;
  ul {
    display: grid;  
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
`;

type UserType = {
  ip: string;
  viewed_infos: string[];
  password: string;
  user: string;
};

const UserStyle = styled.li`
  border-radius: 15px;
  background-color: ${({theme} : {theme?: ThemeProps}) => theme?.colors?.secondary};
  overflow: hidden;
  div {
    background-color: ${({theme} : {theme?: ThemeProps}) => theme?.colors?.primary};
    display: flex;
    flex-direction: row;
    align-items: center;
    span.label {
      padding: 20px;
      display: flex;
      gap: 20px;
      white-space: nowrap;
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }
  table {
    width: 100%;
    th[scope=col] {
      padding: 20px;
      background-color: ${({theme}: {theme?: ThemeProps}) => theme?.colors?.primary};
    }
    td {
      padding: 10px;
      background-color: ${({theme}: {theme?: ThemeProps}) => theme?.colors?.quaternary};
      color: ${({theme}: {theme?: ThemeProps}) => theme?.colors?.primary};
    }
  }
`;

const User: FunctionComponent<{data: UserType}> = ({data}) => {
  const {viewed_infos, password, user} = data;
  return <UserStyle>
    <div className='user'>
      <span className='label'>
        <span className='icon'><RiUser3Fill/></span>
        <span className='text'>usuário</span>
      </span>
      <span>{user}</span>
    </div>
    <div className='password'>
      <span className='label'>
        <span className='icon'><RiLockPasswordFill/></span>
        <span className='text'>senha</span>
      </span>
      <span>{password}</span>
    </div>
    <table>
      <tr><th scope='col'>informes visualizados</th></tr>
      {viewed_infos.map(info =>
        <tr><td>{info}</td></tr>
      )}
    </table> 
  </UserStyle>;
};

const DashBoardCardUsers : FunctionComponent<{}> = () => {
  const [userData, setUserData] = useState<{date: string, content: UserType[]}>();
  const handleUserData = useCallback(async () => {
    const users = await request('indicators/users', 'GET');
    setUserData(users);
  }, []);

  useEffect(() => {
    handleUserData();
  }, []);

  return (<DashBoardCardUsersStyle>
    <h2>Páginas marcadas <RiMarkPenFill/></h2>
    <ul>
      {userData?.content?.map((user: UserType) =>
        <User key={user.ip} data={user}/>
      )}
    </ul>
  </DashBoardCardUsersStyle>);
}
 
export default DashBoardCardUsers;