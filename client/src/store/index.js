import { createStore, compose } from 'redux';

import rootReducer from './reducers';

const enhancer =
  process.env.NODE_ENV === 'production' || !window.__REDUX_DEVTOOLS_EXTENSION__
    ? compose
    : window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(rootReducer, enhancer);

export default store;
