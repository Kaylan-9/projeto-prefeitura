import {FunctionComponent} from 'react';
import { Doughnut } from 'react-chartjs-2';
import {ArcElement, Chart as ChartJS, Legend, Tooltip} from 'chart.js';
import { RiDonutChartFill } from 'react-icons/ri';
import { dataInfosType } from './DashBoardsInfos';
import { css } from '@emotion/css';

 
ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
  responsive: true,
};

const DashBoardCardDoughnutInfos : FunctionComponent<{dataInfos: dataInfosType}> = ({dataInfos}) => {
  const data = {
    labels: dataInfos?.content?.map((page) => page._id),
    datasets: [
      {
        label: 'informes',
        data: dataInfos?.content?.map((page) => page.lenght),
        backgroundColor: dataInfos?.content?.map((page) => page.color),
        borderWidth: 0,
      },
    ],
  };

  return (<section className={css`
    grid-area: doughnut-infos;
  `}>
    <h2>Informes mais visualizados <RiDonutChartFill/></h2>
    <Doughnut data={data} options={options}/>
  </section>);
}
 
export default DashBoardCardDoughnutInfos;