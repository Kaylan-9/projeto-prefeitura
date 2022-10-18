import {useCookies} from 'react-cookie';
import {color, H2} from '../styles/styles';
import ContainerPages, {PageSt, PageSt1, PageSt2, PagesStyle, PageViewerStyle, SectionTitle, SectionPages} from '../styles/Pages.styles';
import {useEffect, useState} from 'react';
import {motion} from 'framer-motion';
import {HiViewGrid} from 'react-icons/hi';
import {BsFillCollectionFill} from 'react-icons/bs';
import {AiFillEye} from 'react-icons/ai';

let IconGrade = HiViewGrid;
let PageStyle = PageSt;


const Page  = ({name, link, stateItemPage, bg, onclick, viewerImg}) => {
  const [cookies, setCookie] = useCookies(['page']);
  const [imgUrl, setImgUrl] = useState('');

  useEffect(async () => {
    const url_req = 'http://localhost:8080/screenshot';
    let req_config = new Object();
    req_config.method = 'POST';
    req_config.body = JSON.stringify({link, name});
    req_config.headers = {'Content-Type': 'application/json', 'Accept': 'application/json'};
    const res = await fetch(url_req, req_config);
    const url_tmp = URL.createObjectURL(await res.blob());
    setImgUrl(url_tmp);
    // console.clear();
  }, []);

  PageStyle = (stateItemPage ? PageSt1 : PageSt2);
  const stateCondition = (viewerImg == imgUrl);

  return (
    <PageStyle 
      initial = {{opacity: 0}}
      whileInView = {{opacity: 1}}
      transition = {{delay:0.1}} 
      bg = {bg}>
      <div>
        <a href = {link} target='_blank'>
          <motion.div className='image' 
            style = {{backgroundImage: `url(${imgUrl})`}} 
            animate = {{backgroundColor: imgUrl == '' ? [color.tres, bg, color.tres] : 'transparent'}} 
            transition = {{delay: 1.5, repeat: Infinity}}>
          </motion.div>
        </a>
        <p className='name'> 
          <a href = {link} target='_blank' style={{color: (stateCondition ? color.dois : "white")}}>
            {name}
          </a>
          <button style={{
            color: (stateCondition ? color.dois : "white"),
            fontSize: (stateCondition ? 15 : 12)+"px",
          }}>
            <AiFillEye onClick={() => onclick(imgUrl)}/>
          </button>
        </p>
      </div>
    </PageStyle>
  );
};

const Pages = () => {
  const [stateItemPage, setStateItemPage] = useState(0);
  const [viewerImg, setViewerImg] = useState("");
  const [data, setDataState] = useState([]);
  let listPagesContainers = [];
  useEffect(async () => {
    const url = "http://localhost:8080/pages";
    let req_config = new Object();
    req_config.method = 'POST';
    req_config.headers = {'Content-Type': 'application/json', 'Accept': 'application/json'};
    const res = await fetch(url, req_config);
    const datares = await res.json();
    setDataState(datares);  
  }, []);
  
  for(let list_pages of data) {
    let list = [];
    for(let [name, link] of Object.entries(list_pages.pages)) {
      const onclick = imgUrl => setViewerImg((viewerImg==imgUrl ? "" : imgUrl));
      list.push(
        <Page {...{name, link, stateItemPage, viewerImg, onclick}}/>
      );
    }
    listPagesContainers.push(
      <PagesStyle {...{title: list_pages.name, list,         
        style: {columnGap: (stateItemPage ? "20" : "30" )+"px"}, bgmq: (stateItemPage != 0 ? color.tres : "transparent")
      }}/>
    );
  }
  IconGrade = !stateItemPage ? BsFillCollectionFill : HiViewGrid;

  return[
    <ContainerPages id = "paginas" style = {{maxWidth: `1250px`, margin: "0px auto"}}>
      <SectionTitle>
        <H2> Acessos úteis </H2>      
        <button onClick = {() => setStateItemPage(stateItemPage != 0 ? 0 : 1)}><IconGrade size = {22}/></button>
      </SectionTitle>
      <SectionPages>{listPagesContainers}</SectionPages>
    </ContainerPages>,
    <PageViewerStyle {...{img: viewerImg, onclick: () => setViewerImg("")}} />
  ];
};

export default Pages;