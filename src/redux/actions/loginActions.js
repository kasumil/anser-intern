export const SET_LOGIN = "SET_LOGIN";
export const SET_LOGOUT = "SET_LOGOUT";

class loginActionsClass {
  constructor() {
    this.SET_LOGIN = "SET_LOGIN";
    this.SET_LOGOUT = "SET_LOGOUT";
  }

  setLogin = () => {
    return {
      type: SET_LOGIN,
      payload: true,
    };
  };

  setLogout = () => {
    return {
      type: SET_LOGOUT,
      payload: false,
    };
  };
}

export default loginActionsClass;
