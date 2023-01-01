import { FunctionComponent, useContext} from 'react';
import { Report } from './Reports.style';
import parse from 'html-react-parser';
import LocalMarking from '../localmarking/LocalMarking';
import { EditContext } from '../../contexts/EditContext';
import { ContentContext } from '../../contexts/ContentContext';
import { BsFillCalendar2DateFill } from 'react-icons/bs';

interface ReportsType {
  start?: number
  lenght?: number
  lenghtreport?: number | undefined
  editable?: boolean
};

const Reports: FunctionComponent<ReportsType> = ({start=0, lenght, lenghtreport, editable=false}) => {
  const {edit, dispatch, select, setSelect} = useContext(EditContext);
  const {infos} = useContext(ContentContext);

  const selectReport = (e: React.ChangeEvent<HTMLInputElement>, info: any) => {
    if(edit.flag==="a") {
      const {checked} = e.target;
      const id = info._id;
      let item;
      if(edit.mod==="d") { 
        setSelect((oldSelect: any) => ({...oldSelect, [id]: checked}));
        item =  info._id;
      } else if(edit.mod==="u") { 
        setSelect({[id]: checked});
        item = info;
      }
      dispatch({type: "item", item});
    }
  };

  const text_content = (content: string) => {
    const parser = new DOMParser();
    const children = Array.prototype.slice.call(
      parser.parseFromString(content, 'text/html').body.childNodes
    );
    return parse(children
      ?.filter((_, index) => index < 6)
      ?.reduce((s, item) => s+(item.outerHTML ?? item.textContent), "")
    );
  };

  const date_content = (content: string) => {
    const date = new Date(content);
    return `(${date.getDate()} ${date.getMonth()} ${date.getFullYear()}) ${date.getHours()}:${date.getMinutes()}`;
  };

  const filterInitReport = (_: unknown, index: number) => index >= start;
  const filterLimit = (_: unknown, index: number) => (lenght!==undefined && index <= start+lenght-1) || (lenght===undefined && true);

  return <>
    {infos
      .filter(filterInitReport)
      .filter(filterLimit)
      .map((info: any, index: number) => lenghtreport===undefined || (typeof lenghtreport==="number" && index<=(lenghtreport-1)) ?
        <Report key={info._id}>
          <div className='superior-content'>
            <div className="date-content"><BsFillCalendar2DateFill/>{date_content(info.date)}</div>
            {editable ? <LocalMarking name="checkbox-report" setCheck = {select[info._id]} funcClick={e => selectReport(e, info)}/> : null}
          </div>        
          <div className='text-content'>{
            text_content(info._content)}
            <span><a className='link' href={`/info/${info._id}`}>Leia mais</a></span>
          </div>  
        </Report>
        : null
    )}
  </>;
}

export default Reports;