import {FunctionComponent} from 'react';
import DashBoardCardBarPages from "./DashBoardCardBarPages";
import DashBoardCardDoughnutPages from "./DashBoardCardDoughnutPages";
import {useEffect, useState} from 'react';
import request from '../../utils/request';

export type dataPagesType = {
  date: string,
  content: [] | [{
    [key: string]: any
  }],
}

const DashBoardsPages: FunctionComponent<{}> = () => {
  const [dataPages, setDataPages] = useState<dataPagesType>({date: "", content: []});
  useEffect(() => {
    const _setDataPages= async () => {
      const data = await request('indicators/pages', 'GET');
      let content = data?.content?.map((item: {[key: string]: any}) => {
        const r = Math.round(Math.random()*255);
        const g = Math.round(Math.random()*255);
        const b = Math.round(Math.random()*255);
        const color = `rgb(${r}, ${g}, ${b})`;
        return {...item, color};  
      });
      setDataPages({date: data.date, content});
    }
    _setDataPages();
  }, []);

  
  return <>
    <DashBoardCardDoughnutPages dataPages={dataPages}/>
    <DashBoardCardBarPages dataPages={dataPages}/>
  </>;
}

export default DashBoardsPages;