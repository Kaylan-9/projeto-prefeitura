import DashBoardCardDoughnutInfos from './DashBoardCardDoughnutInfos';
import DashBoardCardBarInfos from './DashBoardCardBarInfos';
import {useEffect, useState} from 'react';
import {FunctionComponent} from 'react';
import request from '../../utils/request';

export type dataInfosType = {
  date: string,
  content: [] | [{
    [key: string]: any
  }],
}

const DashBoardsInfos: FunctionComponent<{}> = () => {
  const [dataInfos, setDataInfos] = useState<dataInfosType>({date: "", content: []});
  useEffect(() => {
    const _setDatInfos= async () => {
      const data = await request('indicators/infos', 'GET');
      let content = data?.content?.map((item: {[key: string]: any}) => {
        const r = Math.round(Math.random()*255);
        const g = Math.round(Math.random()*255);
        const b = Math.round(Math.random()*255);
        const color = `rgb(${r}, ${g}, ${b})`;
        return {...item, color};  
      });
      setDataInfos({date: data.date, content});
    }
    _setDatInfos();
  }, []);

  
  return <>
    <DashBoardCardDoughnutInfos dataInfos={dataInfos}/>
    <DashBoardCardBarInfos dataInfos={dataInfos}/>
  </>;
}

export default DashBoardsInfos;