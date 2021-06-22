import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import ROUTES from './shared/constants/routes';
import InitialScreen from './screens/InitialScreen';
import GameSelectorScreen from './screens/GameSelectorScreen';
import AppContainer from './shared/components/AppContainer';

const App = () => {
  const routes = (
    <Switch>
      <Route path={ROUTES.SELECT_GAME} component={GameSelectorScreen} />
      <Route exact path={ROUTES.ROOT} component={InitialScreen} />
      <Redirect to="/" />
    </Switch>
  );

  return <AppContainer>{routes}</AppContainer>;
};

export default App;
