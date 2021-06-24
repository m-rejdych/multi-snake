import { GAME } from '../constants/actionTypes';

const initialState = {
  settings: {
    players: '',
    boardSize: '',
    snakeSpeed: '',
  },
  gameCode: '',
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GAME.SET_SETTINGS:
      return { ...state, settings: payload };
    case GAME.SET_GAME_CODE:
      return { ...state, gameCode: payload };
    default:
      return state;
  }
};

export default reducer;
