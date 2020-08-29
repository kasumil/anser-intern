import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faHome } from "@fortawesome/free-solid-svg-icons";
import { USER_DATA_URL } from "../../config";
import Login from "./Login";
import Logout from "./Logout";
import TopPanel from "./TopPanel";

const Nav = ({ loginStatus }) => {
  const [isFold, setIsFold] = useState(true);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    axios.get(USER_DATA_URL).then((res) => {
      setUserData(res.data.data);
    });
  }, []);

  const handleFold = (e) => {
    e.preventDefault();
    setIsFold(!isFold);
  };

  return (
    <>
      <Header>
        <TopNav>
          <NavContainer>
            <MainHead>
              <LogoBox>
                <LogoContainer>
                  <Link to="/" title="WRDS Home" className="logoLink">
                    <img
                      alt="logo"
                      src="/images/HYU_symbol_basic_png.png"
                      className="mainLogo"
                    />
                    <img alt="logo" src="/images/hyu_typo_logo.png" />
                  </Link>
                </LogoContainer>
              </LogoBox>
            </MainHead>
          </NavContainer>
        </TopNav>
        <MainNav>
          <MainWrapper>
            <RedBar />
            <ul>
              <li>
                <div>
                  {!loginStatus ? (
                    <>
                      <Login />
                      <Link to="/users/password-reset">Password Reset</Link>
                      <Link to="/signup">Register</Link>
                      <a
                        href="https://wrds-support.wharton.upenn.edu/hc/en-us/requests/new?ticket_form_id=114093978532"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Contact
                      </a>
                    </>
                  ) : (
                    <>
                      <a
                        href="https://wrds-support.wharton.upenn.edu/hc/en-us/requests/new?ticket_form_id=114093978532"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Contact
                      </a>
                      <Link to="/" className="userMenu" onClick={handleFold}>
                        {userData.userName}'s account{" "}
                        <FontAwesomeIcon icon={faCog} />
                      </Link>
                      <DropdownMenu
                        className={!isFold && "show"}
                        xPlacement="bottom-start"
                      >
                        <li>
                          <Link to="/accountinfo">your account info</Link>
                        </li>
                        <li>
                          <Link to="/savedqueries">saved queries & codes</Link>
                        </li>
                      </DropdownMenu>
                      <Logout />
                    </>
                  )}
                </div>
              </li>
            </ul>
          </MainWrapper>
        </MainNav>
        <TopPanel />
      </Header>
      <SigninHeader>
        <Container>
          <nav>
            <ol>
              <li>
                <FontAwesomeIcon icon={faHome} /> Home
              </li>
            </ol>
          </nav>
        </Container>
      </SigninHeader>
    </>
  );
};

const mapStateToProps = (state) => {
  return { loginStatus: state.loginStatus };
};

export default connect(mapStateToProps)(Nav);

const Header = styled.nav``;

const TopNav = styled.div`
  background: linear-gradient(#002c77, #2e55a4);
`;

const NavContainer = styled.div`
  max-width: 1170px;
  margin: 0 auto;
`;

const MainHead = styled.div`
  position: relative;
  width: 50%;
  height: 80px;
  z-index: 200;
`;

const LogoBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -15px;
`;

const LogoContainer = styled.div`
  display: flex;
  max-width: 50%;
  flex: 0 0 50%;

  .logoLink {
    color: #004785;
    background-color: transparent;

    img {
      padding-top: 40px;
      width: 150px;
      height: auto;
      vertical-align: middle;
    }

    .mainLogo {
      width: 60px;
      height: auto;
      margin-right: 10px;
    }
  }
`;

const MainNav = styled.div`
  display: block;
  height: auto;
  overflow: visible;
`;

const MainWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  width: 100%;
  top: 0;
  right: 0;
  background: #000;
  z-index: 10001;

  ul {
    width: 100%;
    height: auto;
    text-align: right;
    line-height: 1.5;

    a {
      display: inline-block;
      margin: 0 2px;
      padding: 5px 10px;
      font-size: 11px;
      font-weight: 400;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      text-align: center;
      background: #000;
      color: #fff;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15),
        0 1px 1px rgba(0, 0, 0, 0.075);

      &:hover {
        box-shadow: none;
        background: #222;
      }

      &.userMenu {
        &::after {
          content: "";
          display: inline-block;
          margin-left: 0.255em;
          vertical-align: 0.255em;
          border-top: 0.3em solid;
          border-bottom: 0;
          border-right: 0.3em solid transparent;
          border-left: 0.3em solid transparent;
        }
      }
    }
  }
`;

const RedBar = styled.div`
  position: absolute;
  width: 10%;
  height: 25px;
  top: 0;
  left: 0;
  background: #a90533;
`;

const DropdownMenu = styled.ul`
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  transform: translate3d(-5px, 27px, 0px);
  will-change: transform;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0.25rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.175);
  background: #000;

  &.show {
    display: block;

    li {
      a {
        display: block;
        margin: 0 2px;
        padding: 5px 10px;
        font-size: 12px;
        font-weight: 400;
        letter-spacing: 0.5px;
        text-transform: uppercase;
        text-align: left;
        background: #000;
        color: #fff;
        box-shadow: none;

        &:hover {
          box-shadow: none;
          background: #222;
        }
      }
    }
  }
`;

const SigninHeader = styled.div`
  background-color: #e9ecef;
`;

const Container = styled.div`
  padding: 0 15px;
  margin: 0 auto;
  width: 100%;
  max-width: 1170px;

  nav {
    ol {
      display: flex;
      flex-wrap: wrap;
      padding: 0.5rem 1rem;
      margin-bottom: 1rem;
      background-color: #e9ecef;
      border-radius: 0.25rem;
      font-size: 16px;
      font-weight: 400;

      li {
        color: #6c757d;
      }
    }
  }
`;
