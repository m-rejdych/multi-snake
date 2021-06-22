import { createStore } from 'redux';

import rootReducer from './reducers';

const enhancer =
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    : undefined;

const store = createStore(rootReducer, enhancer);

export default store;
