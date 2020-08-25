import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { GOOGLE_LOGIN_CLIENT_ID } from "../../config";

const GoogleLogin = () => {
  const googleLoginBtn = useRef(null);
  const [token, setToken] = useState("");
  const history = useHistory();

  useEffect(() => {
    googleSDK();
  }, []);

  const googleSDK = () => {
    window.googleSDKLoaded = () => {
      window.gapi.load("auth2", () => {
        const auth2 = window.gapi.auth2.init({
          client_id: GOOGLE_LOGIN_CLIENT_ID,
          scope: "profile email",
        });

        auth2.attachClickHandler(
          googleLoginBtn.current,
          {},
          (googleUser) => {
            const profile = googleUser.getBasicProfile();
            setToken(googleUser.getAuthResponse().id_token);
            GoogleApiPOST(googleUser.getAuthResponse().id_token);
          },
          (error) => {
            alert(JSON.stringify(error, undefined, 2));
          }
        );
      });
    };
    (function (d, s, id) {
      let js;
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "google-jssdk");
  };

  const GoogleApiPOST = (token) => {
    // axios
    //   .get(`${socialLoginAPI}/user/google`, {
    //     headers: {
    //       Authorization: token,
    //       "Content-Type": "application/json",
    //     },
    //   })
    //   .then((res) => {
    //     sessionStorage.setItem("access_token", res.data.token);
    //     history.push("/");
    //   })
    //   .catch((error) => alert("Error:", error));
    console.log(token);
  };

  return (
    <figure ref={googleLoginBtn}>
      <img alt="GoogleLogin" src="/Images/google_logo.png" />
      <p>구글 로그인</p>
    </figure>
  );
};

export default GoogleLogin;
