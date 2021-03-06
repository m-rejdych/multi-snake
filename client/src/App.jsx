import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';

import ROUTES from './shared/constants/routes';
import AppContainer from './shared/components/AppContainer';
import InitialScreen from './screens/InitialScreen';
import GameSelectorScreen from './screens/GameSelectorScreen';
import NewGameScreen from './screens/NewGameScreen';
import GameScreen from './screens/GameScreen';
import JoinGameScreen from './screens/JoinGameScreen';
import WaitScreen from './screens/WaitScreen';

const App = () => {
  const name = useSelector((state) => state.player.name);

  const routes = name ? (
    <Switch>
      <Route path={ROUTES.SELECT_GAME} component={GameSelectorScreen} />
      <Route path={ROUTES.NEW_GAME} component={NewGameScreen} />
      <Route path={ROUTES.GAME} component={GameScreen} />
      <Route path={ROUTES.JOIN_GAME} component={JoinGameScreen} />
      <Route path={ROUTES.WAIT} component={WaitScreen} />
      <Route exact path={ROUTES.ROOT} component={InitialScreen} />
      <Redirect to={ROUTES.ROOT} />
    </Switch>
  ) : (
    <Switch>
      <Route exact path={ROUTES.ROOT} component={InitialScreen} />
      <Redirect top={ROUTES.ROOT} />
    </Switch>
  );

  return <AppContainer>{routes}</AppContainer>;
};

export default App;
