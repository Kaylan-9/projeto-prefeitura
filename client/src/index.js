import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import {CookiesProvider} from 'react-cookie';
import {GlobalStyle} from './styles/styles';
import App from './app';

ReactDOM.render(
  <StrictMode>
    <CookiesProvider>
      <GlobalStyle/>
      <App/>
    </CookiesProvider>
  </StrictMode>,
  document.getElementById('app')
);

