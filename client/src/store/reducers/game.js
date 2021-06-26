import { GAME } from '../constants/actionTypes';

const initialState = {
  settings: {
    players: '',
    snakeSize: '',
    snakeSpeed: '',
  },
  joinedGame: null,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GAME.SET_SETTINGS:
      return { ...state, settings: payload };
    case GAME.SET_JOINED_GAME:
      return { ...state, joinedGame: payload };
    case GAME.ADD_PLAYER:
      return {
        ...state,
        joinedGame: { ...state.joinedGame, players: [...state.joinedGame.players, payload] },
      };
    default:
      return state;
  }
};

export default reducer;
