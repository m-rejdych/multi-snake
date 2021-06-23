import { GAME } from '../constants/actionTypes';

const initialState = {
  settings: {
    players: '',
    boardSize: '',
    snakeSpeed: '',
  },
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GAME.SET_SETTINGS:
      return { ...state, settings: payload };
    default:
      return state;
  }
};

export default reducer;
