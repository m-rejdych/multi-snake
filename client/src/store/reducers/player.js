import { PLAYER } from '../constants/actionTypes';

const initialState = {
  id: '',
  name: '',
  color: '',
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case PLAYER.SET_ID:
      return { ...state, id: payload };
    case PLAYER.SET_NAME:
      return { ...state, name: payload };
    case PLAYER.SET_COLOR:
      return { ...state, color: payload };
    case PLAYER.RESET:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
