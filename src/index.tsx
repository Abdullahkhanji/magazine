import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import { router } from './Routing';
import i18next from 'i18next';
import global_en from "./translations/ENG/global.json"
import global_ar from "./translations/AR/global.json"
import global_tr from "./translations/TR/global.json"
import { I18nextProvider } from 'react-i18next';

i18next.init({
  interpolation: {escapeValue: false},
  lng: window.localStorage.getItem('lang')?.toString(),
  resources: {
    ENG: {
      global: global_en
    },
    AR: {
      global: global_ar
    },
    TR: {
      global: global_tr
    }
  }
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(

  <I18nextProvider i18n={i18next}>
    <RouterProvider router={router}/>
  </I18nextProvider>


);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
