import {FunctionComponent} from 'react';
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { HiChartBar } from 'react-icons/hi';
import { dataPagesType } from './DashBoardsPages';
import { css } from '@emotion/css';
import mqs from '../../styles/medias';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  scales: {
    y: {
      ticks: {
        stepSize: 1
      },
    },
  }
};

const DashBoardCardBarPages : FunctionComponent<{dataPages: dataPagesType}> = ({dataPages}) => {
  const data = {
    labels: ['páginas'],
    datasets: dataPages.content?.map((page: {[key: string]: string}) => { 
      return {
        label: page.name,
        data: [page.lenght],
        backgroundColor: page.color,
        borderWidth: 0,
      };
    }),
  };

  return (<section className={css`
    grid-area: bar-pages;
    canvas{ 
      height: 315px;
      min-height: 315px;
      max-height: 315px;
      ${mqs[3]} {
        max-height: 100%;
      }
    }
  `}>
    <h2>Páginas mais acessadas <HiChartBar/></h2>
    <Bar options={options} data={data}/>
  </section>);
}
 
export default DashBoardCardBarPages;