import { Global, ThemeProvider } from '@emotion/react'
import ReactDOM from 'react-dom/client'
import { AuthProvider } from './contexts/AuthContext'
import { EditProvider } from './contexts/EditContext'
import { ModalProvider } from './contexts/ModalContext'
import { ContentContextProvider } from './contexts/ContentContext'
import Routers from './routers/Routers'
import styles from './styles/Style'
import theme from './styles/theme'
import { ThemeToogleContext, ThemeToogleProvider } from './contexts/ThemeToggleContext'
import { useContext } from 'react'
import { IPProvider } from './contexts/IPContext'

const BaseStructure = () => {
  const {val_theme} = useContext(ThemeToogleContext);
  const  themefinal = theme[val_theme];
  return <ThemeProvider theme={themefinal}>
    <Global styles={styles(themefinal)}/>
    <IPProvider>
      <ModalProvider>
        <ContentContextProvider>
          <EditProvider>
            <Routers/>  
          </EditProvider>
        </ContentContextProvider>
      </ModalProvider>
    </IPProvider>
  </ThemeProvider>;
};

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <AuthProvider>
    <ThemeToogleProvider>
      <BaseStructure/>
    </ThemeToogleProvider>
  </AuthProvider>)
