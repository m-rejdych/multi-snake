import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import ROUTES from './shared/constants/routes';
import InitialScreen from './screens/InitialScreen';
import GameSelectorScreen from './screens/GameSelectorScreen';
import AppContainer from './shared/components/AppContainer';

const App = () => {
  const name = useSelector((state) => state.player.name);

  useEffect(() => {
    setTimeout(() => {
      throw new Error('Crazy error!');
    }, 5000);
  }, []);

  const routes = name ? (
    <Switch>
      <Route path={ROUTES.SELECT_GAME} component={GameSelectorScreen} />
      <Route exact path={ROUTES.ROOT} component={InitialScreen} />
      <Redirect to={ROUTES.ROOT} />
    </Switch>
  ) : (
    <Switch>
      <Route exact path={ROUTES.ROOT} component={InitialScreen} />
      <Redirect to={ROUTES.ROOT} />
    </Switch>
  );

  return <AppContainer>{routes}</AppContainer>;
};

export default App;
