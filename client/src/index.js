import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import App from './App';
import ErrorBoundary from './shared/components/ErrorBoundary';
import SocketProvider from './context/SocketProvider';
import store from './store';
import theme from './theme';

const Root = () => (
  <BrowserRouter>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <ErrorBoundary>
          <SocketProvider>
            <App />
          </SocketProvider>
        </ErrorBoundary>
      </ChakraProvider>
    </Provider>
  </BrowserRouter>
);

ReactDOM.render(<Root />, document.getElementById('root'));
