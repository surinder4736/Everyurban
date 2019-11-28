import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './configureStore';
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');
const {store, persistor} = configureStore();
//const {persistor} = configureStore();
//console.log(storage.store.getState());
// storage.persistor.subscribe(() => {
//   /* Hydrate React components when persistor has synced with redux store */
//   const { bootstrapped } = persistor.getState();

//   if (bootstrapped) {
//       ReactDOM.hydrate(
//           <App />,
//           rootElement
//     );
//   }
// });
ReactDOM.render(
    
<Provider store = { store }>
  <BrowserRouter basename={baseUrl}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </BrowserRouter>
  </Provider>,
  rootElement);

registerServiceWorker();
