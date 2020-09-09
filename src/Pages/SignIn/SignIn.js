import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { connect } from "react-redux";
import { loginActions } from "../../redux/actions";
import { API } from "../../config";
import Nav from "../../Components/Nav/Nav";
import Footer from "../../Components/Footer/Footer";
import GoogleLogin from "./GoogleLogin";

const { setLogin } = loginActions;
const { Kakao } = window;

const SignIn = ({ loginStatus }) => {
  const [inputValue, setValue] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    document.title = "Wharton WRDS Login";
  });
  const history = useHistory();

  const handleKakaoLogin = () => {
    Kakao.Auth.login({
      success: function (authObj) {
        fetch("카카오 API 주소", {
          method: "POST",
          body: JSON.stringify({
            access_token: authObj.access_token,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            sessionStorage.setItem("access_token", res.data.token);
            if (res.access_token) {
              history.push("/");
            }
          });
      },
      fail: function (err) {
        alert(JSON.stringify(err));
      },
    });
  };

  const handleKakaoLogout = () => {
    Kakao.Auth.logout(function () {
      sessionStorage.removeItem("access_token");
      history.push("/");
    });
  };

  const handleLogin = () => {
    const { email, password } = inputValue;
    !email || !password
      ? alert("아이디와 비밀번호를 입력해주세요.")
      : axios({
          method: "POST",
          url: `${API}hrdsuser/login/`,
          data: {
            email: email,
            password: password,
          },
        })
          .then((res) => {
            sessionStorage.setItem("access_token", res.data.data.token);
            sessionStorage.setItem("username", res.data.data.username);
            setLogin(true);
          })
          .then(() => {
            history.push("/");
            window.location.reload();
          });
  };

  const handleInput = ({ target: { name, value } }) => {
    setValue({ ...inputValue, [name]: value });
  };

  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Nav />
      <Page>
        <SignInFrame>
          <PageHeader>로그인</PageHeader>
          <button>
            <i className="fas fa-sign-in-alt" />
            로그인
          </button>
          <Link to="/signup">
            <button className="registerBtn">
              <i className="fas fa-edit" />
              회원가입
            </button>
          </Link>
          <SignInSection>
            <img
              onClick={handleKakaoLogin}
              alt="KakaoLogin"
              src="/Images/kakao_login.png"
            />
            <GoogleLogin />
            <p className="inputTitle">이메일</p>
            <input
              type="text"
              name="email"
              placeholder="이메일"
              onChange={handleInput}
              onKeyUp={(e) => {
                e.keyCode === 13 && handleLogin();
              }}
            />
            <p className="inputTitle">비밀번호</p>
            <input
              type="password"
              name="password"
              placeholder="비밀번호"
              onChange={handleInput}
              onKeyUp={(e) => {
                e.keyCode === 13 && handleLogin();
              }}
            />
          </SignInSection>
          <SignInButton>
            <button className="loginBtn" onClick={handleLogin}>
              로그인
            </button>
          </SignInButton>
          <AccountButton>
            <Link to="" className="register">
              <i className="fas fa-edit" />
              아직 회원이 아니신가요?<br/>
              <span className="littletyping">회원가입하기</span>
            </Link>
            <Link to="">
              <i className="fas fa-question-circle red" />
              아이디/비밀번호를 잊으셨나요?
            </Link>
            <Link to="">
              <i className="fas fa-truck red" />
              기관을 옮기셨나요?<br/>
              <span className="littletyping">계정 이관하기</span>
            </Link>
          </AccountButton>
        </SignInFrame>
        <NotificationFrame>
          <p>
            WRDS globally-accessed, efficient web-based service gives
            researchers access to accurate, vetted data and WRDS doctoral-level
            experts. 500+ institutions in 35+ countries – supporting 75,000+
            researchers. 600+ datasets from more than 50 vendors across multiple
            disciplines are accessible to support users at all experience
            levels. WRDS democratizes data access so that all disciplines can
            easily search for concepts across the data repository.
          </p>
          <button onClick={goToTop}>Top to Section</button>
        </NotificationFrame>
      </Page>
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => {
  return { loginStatus: state.loginStatus };
};

export default connect(mapStateToProps)(SignIn);

const Page = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1140px;
  margin: 100px auto;
`;

const SignInFrame = styled.div`
  width: 360px;
  padding: 0 15px;

  button {
    padding: 8px 16px;
    color: #3f4033;
    background-color: #fff;
    border: 1px solid #eeedea;
    text-align: center;
    cursor: pointer;

    i {
      display: inline-block;
      margin-right: 3px;
    }
  }
  .registerBtn {
    background-color: #eeedea;
    &:hover {
      background-color: #fff;
    }
  }
`;

const PageHeader = styled.h1`
  margin-top: 15px;
  padding-bottom: 15px;
  font-size: 2.5rem;
  font-weight: bolder;
  line-height: 1.2;
`;

const SignInSection = styled.section`
  width: 100%;
  padding: 20px;
  border: 1px solid #ddd;

  img {
    opacity: 0.8;
    width: 100%;
    margin-bottom: 5px;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }

  figure {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    padding: 6px;
    color: #ddd;
    border: 1px solid #ddd;
    cursor: pointer;

    &:hover {
      color: #333;
      border: 1px solid #333;
    }

    img {
      width: 9%;
      margin: 0 2px;
    }

    p {
      text-align: center;
      width: 90%;
      font-size: 14px;
      font-weight: 600;
    }
  }

  .inputTitle {
    margin-bottom: 8px;
  }

  input {
    width: 100%;
    height: 38px;
    margin-bottom: 16px;
    padding: 6px 12px;
    border: 1px solid #ddd;
  }
`;

const SignInButton = styled.div`
  display: block;
  padding: 12px 16px;
  height: 76px;
  background-color: rgba(0, 0, 0, 0.03);
  border: 1px solid #ddd;

  .loginBtn {
    float: right;
    padding: 0.7rem 1rem;
    font-size: 1.25rem;
    color: #fff;
    border-radius: 0;
    outline: none;
    background-color: #004785;

    &:hover {
      background-color: #00335f;
    }
  }
`;

const AccountButton = styled.ul`
  width: 100%;

  a {
    display: block;
    padding: 15px 40px 15px 20px;
    font-size: 18px;
    color: #004785;
    border-top: 1px solid #ddd;

    i {
      margin-right: 6px;
    }

    &:hover {
      background-color: #eeedea;
    }
  }

  .register {
    font-weight: bolder;
  }

  .littletyping {
    font-size: 15px;
    font-weight: normal;
  }
`;

const NotificationFrame = styled.article`
  width: 750px;
  margin-top: 15px;
  padding: 0 15px;
  font-size: 1rem;
  line-height: 1.5;
  font-weight: 400;

  p {
    margin-bottom: 1rem;
  }

  button {
    float: right;
    padding: 0.3rem 0.5rem;
    font-size: 14px;
    color: #fff;
    background-color: #004785;
    border-style: none;
    outline: none;
    cursor: pointer;

    &:hover {
      background-color: #00335f;
    }
  }
`;
