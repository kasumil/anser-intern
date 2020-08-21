import React from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { connect } from "react-redux";
import axios from "axios";
import { loginActions } from "../../redux/actions/";

const { setLogin } = loginActions;

const Login = ({ setLogin, loginStatus }) => {
  const responseGoogle = (res) => {
    axios
      .post(URL, {
        body: {
          username: res.profileObj.name,
        },
      })
      .then((res) => {
        console.log(res);
        setLogin(true);
      });
  };

  const responseFail = (err) => {
    console.error(err);
  };

  return (
    <Link to="/signin">
      {/* // <GoogleLogin
    //   clientId="684103721606-b8vmaoip3he53h3j8mq2dm268uip7ndm.apps.googleusercontent.com"
    //   render={() => (
    //     <Link to="" onClick={responseGoogle}>
    //       Login with Google
    //     </Link>
    //   )}
    //   onSuccess={responseGoogle}
    //   onFailure={responseFail}
    //   cookiePolicy={"single_host_origin"}
    // /> */}
      Login
    </Link>
  );
};

export default connect(null, { setLogin })(Login);
