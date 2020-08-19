import { SET_LOGIN, SET_LOGOUT } from "../actions/loginActions";

const INITIAL_STATE = localStorage.getItem("access_token");

const loginStatus = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_LOGIN:
      return payload;

    case SET_LOGOUT:
      return payload;

    default:
      return state;
  }
};

export default loginStatus;
