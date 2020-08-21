import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { loginActions } from "../../../redux/actions";

const { setLogin } = loginActions;

const NavHeader = ({ loginStatus }) => {
  const [form, setValues] = useState({
    username: "",
    password: "",
  });

  const handleInput = ({ target: { name, value } }) => {
    setValues({
      ...form,
      [name]: value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(form);
    if (loginStatus) {
      setLogin(true);
    }
  };

  return (
    <NavHeaderWrapper>
      <HeaderOverlay>
        <Container>
          <Row>
            <LoginBox>
              <Logo>
                <img alt="logo" src="/images/WRDS_Logo.original.png" />
              </Logo>
              <h3>The Global Standard for Business Research</h3>
              {!loginStatus && (
                <LoginInput>
                  <LoginForm onSubmit={handleLogin}>
                    <FormRow>
                      <Forms>
                        <input
                          type="text"
                          name="username"
                          value={form.username}
                          placeholder="Username"
                          onChange={handleInput}
                        />
                      </Forms>
                      <Forms>
                        <input
                          type="password"
                          name="password"
                          value={form.password}
                          placeholder="Password"
                          onChange={handleInput}
                        />
                      </Forms>
                      <ButtonForms>
                        <button type="submit">Login</button>
                      </ButtonForms>
                    </FormRow>
                  </LoginForm>
                </LoginInput>
              )}
            </LoginBox>
            <VideoBox>
              <VimeoBox>
                <iframe
                  src="https://player.vimeo.com/video/296642746"
                  width="640"
                  height="360"
                  frameBorder="0"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                  title="Intro"
                ></iframe>
              </VimeoBox>
            </VideoBox>
          </Row>
        </Container>
      </HeaderOverlay>
      <HeaderBackground />
    </NavHeaderWrapper>
  );
};

const mapStateToProps = (state) => {
  return { loginStatus: state.loginStatus };
};

export default connect(mapStateToProps)(NavHeader);

const NavHeaderWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -15px;
  padding-top: 3rem;
  position: relative;
  height: 400px;
  background-color: #2e55a4;
  background-image: linear-gradient(160deg, #2e55a4 60%, #06aafc 100%);
`;

const HeaderOverlay = styled.div`
  width: 100%;
  top: 50%;
  left: 0;
  z-index: 1;
`;

const HeaderBackground = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: -60px;
  height: 400px;
  background: url(/images/header-waves.png) no-repeat bottom left;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1170px;
  padding: 0 15px;
  margin: 0 auto;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -15px;
`;

const LoginBox = styled.div`
  position: relative;
  flex: 0 0 50%;
  padding: 0 15px;
  width: 100%;
  max-width: 50%;

  h3 {
    margin: 0.5em auto 1em;
    max-width: 450px;
    font-size: 32px;
    font-weight: bold;
    line-height: 1.2;
    letter-spacing: 0;
    text-align: center;
    color: #fff;
  }
`;

const Logo = styled.div`
  margin: 0 auto;
  text-align: center;

  img {
    width: 200px;
    max-width: 50%;
    height: auto;
    margin-bottom: 1em;
    margin-top: 0.5em;
    align-content: center;
    vertical-align: middle;
  }
`;

const LoginInput = styled.div``;

const LoginForm = styled.form``;

const FormRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -5px;
`;

const Forms = styled.div`
  padding: 0 5px;
  margin-bottom: 1rem;
  flex: 0 0 41.66667%;
  max-width: 41.66667%;

  input {
    display: block;
    width: 100%;
    height: calc(1.5em + 0.75rem + 2px);
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    border: 1px solid #cdd4da;
    border-radius: 0.25rem;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.07);
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

    &:focus {
      border-color: #068bff;
      outline: 0;
      box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
        0 0 0 0.2rem rgba(0, 71, 133, 0.25);
    }
  }
`;

const ButtonForms = styled(Forms)`
  flex: 0 0 16.66667%;
  max-width: 16.66667%;

  button {
    display: inline-block;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    text-align: center;
    line-height: 1.5;
    color: #fff;
    vertical-align: middle;
    border: 1px solid #c5093b;
    background-color: #c5093b;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15),
      0 1px 1px rgba(0, 0, 0, 0.075);
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    user-select: none;
    cursor: pointer;

    &:hover {
      color: #ffffff;
      background-color: #a00730;
      border-color: #94072c;
    }

    &:focus {
      outline: none;
    }
  }
`;

const VideoBox = styled(LoginBox)``;

const VimeoBox = styled.div`
  position: relative;
  padding-top: 56.25%;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;
