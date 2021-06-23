import { GAME } from '../constants/actionTypes';

export const setSettings = (settings) => ({
  type: GAME.SET_SETTINGS,
  payload: settings,
});
