import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loginActions } from "../../redux/actions/";

const { setLogin } = loginActions;

const Login = ({ setLogin, loginStatus }) => {
  const handleLogin = (e) => {
    e.preventDefault();
    if (loginStatus) {
      e.preventDefault();
      setLogin(true);
    }
  };

  return (
    <Link to="/login" onClick={handleLogin}>
      Login
    </Link>
  );
};

export default connect(null, { setLogin })(Login);
