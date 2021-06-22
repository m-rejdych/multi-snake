import { PLAYER } from '../constants/actionTypes';

const initialState = {
  name: '',
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case PLAYER.SET_NAME:
      return { ...state, name: payload };
    default:
      return state;
  }
};

export default reducer;
