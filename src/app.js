import Header from './components/Header';
import Main from './components/Main';
import About from './components/About';
// import Adm from './components/Adm';
import Pages from './components/Pages';
import Footer from './components/Footer';
import Adm from './components/Adm';
import {Wrapper, color} from './styles/styles';
import App from './styles/App.styles';

export default () => <App style = {{background: color.cinco}}>
  <Wrapper area = "header" style = {{background: color.gradient(color.green, color.facebook)}}><Header maxsize = {3840}/></Wrapper>
  <Main area="main">
    <Wrapper><Adm/></Wrapper>
    {/* <Wrapper><Pages/></Wrapper> */}
    <Wrapper><About/></Wrapper>
  </Main>
  <Wrapper area="footer"><Footer/></Wrapper>
</App>;
