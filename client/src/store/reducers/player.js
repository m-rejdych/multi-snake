import { PLAYER } from '../constants/actionTypes';

const initialState = {
  name: '',
  color: '',
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case PLAYER.SET_NAME:
      return { ...state, name: payload };
    case PLAYER.SET_COLOR:
      return { ...state, color: payload };
    default:
      return state;
  }
};

export default reducer;
