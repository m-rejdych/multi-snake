import { PLAYER } from '../constants/actionTypes';

export const setName = (name) => ({
  type: PLAYER.SET_NAME,
  payload: name,
});
