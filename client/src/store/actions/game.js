import { GAME } from '../constants/actionTypes';

export const setSettings = (settings) => ({
  type: GAME.SET_SETTINGS,
  payload: settings,
});

export const setJoinedGame = (game) => ({
  type: GAME.SET_JOINED_GAME,
  payload: game,
});

export const addPlayer = (player) => ({
  type: GAME.ADD_PLAYER,
  payload: player,
});

export const reset = () => ({
  type: GAME.RESET,
});
