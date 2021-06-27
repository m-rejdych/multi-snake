import { PLAYER } from '../constants/actionTypes';

export const setId = (id) => ({
  type: PLAYER.SET_ID,
  payload: id,
});

export const setName = (name) => ({
  type: PLAYER.SET_NAME,
  payload: name,
});

export const setColor = (color) => ({
  type: PLAYER.SET_COLOR,
  payload: color,
});

export const reset = () => ({
  type: PLAYER.RESET,
});
