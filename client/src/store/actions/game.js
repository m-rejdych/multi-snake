import { GAME } from '../constants/actionTypes';

export const setSettings = (settings) => ({
  type: GAME.SET_SETTINGS,
  payload: settings,
});

export const setGameCode = (code) => ({
  type: GAME.SET_GAME_CODE,
  payload: code,
});
