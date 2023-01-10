import {FunctionComponent} from 'react';
import { Doughnut } from 'react-chartjs-2';
import {ArcElement, Chart as ChartJS, Legend, Tooltip} from 'chart.js';
import { RiDonutChartFill } from 'react-icons/ri';
import { dataPagesType } from './DashBoardsPages';
import { css } from '@emotion/css';

 
ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
  responsive: true,
};

const DashBoardCardDoughnutPages : FunctionComponent<{dataPages: dataPagesType}> = ({dataPages}) => {
  const data = {
    labels: dataPages?.content?.map((page) => page.name),
    datasets: [
      {
        label: 'páginas',
        data: dataPages?.content?.map((page) => page.lenght),
        backgroundColor: dataPages?.content?.map((page) => page.color),
        borderWidth: 0,
        width: 1
      },
    ],
  };

  return (<section className={css`
    grid-area: doughnut-pages;
  `}>
    <h2>Páginas mais acessadas <RiDonutChartFill/></h2>
    <Doughnut data={data} options={options}/>
  </section>);
}
 
export default DashBoardCardDoughnutPages;