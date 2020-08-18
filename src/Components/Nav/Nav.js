import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { TAB_ITEM_URL, USER_DATA_URL } from "../../config";

const Nav = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isFold, setIsFold] = useState(true);
  const [tabItems, setTabItems] = useState([]);
  const [userData, setUserData] = useState([]);

  const customAxiosFunctions = async () => {
    const urls = [TAB_ITEM_URL, USER_DATA_URL];
    const promises = urls.map((el) => {
      return axios.get(el);
    });

    const resolvedResponses = await Promise.all(promises);

    resolvedResponses.map((el) => {
      const url = el.config.url;
      if (url === TAB_ITEM_URL) {
        setTabItems(el.data.data);
      } else if (url === USER_DATA_URL) {
        setUserData(el.data.data);
      }
    });
  };

  useEffect(() => {
    customAxiosFunctions();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLogin(!isLogin);
  };

  const handleFold = () => {
    setIsFold(!isFold);
  };

  return (
    <Header>
      <TopNav>
        <NavContainer>
          <MainHead>
            <LogoBox>
              <LogoContainer>
                <Link to="/" title="WRDS Home" className="logoLink">
                  <img
                    alt="logo"
                    src="https://wrds-www.wharton.upenn.edu/static/img/logo/Wharton_WRDS_logo.svg"
                  />
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
                {!isLogin ? (
                  <>
                    <Link to="/login" onClick={handleLogin}>
                      Login
                    </Link>
                    <Link to="/users/password-reset">Password Reset</Link>
                    <Link to="/register">Register</Link>
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
                      {tabItems &&
                        tabItems.map((el, i) => {
                          return (
                            <li key={i}>
                              <Link to="/">{el}</Link>
                            </li>
                          );
                        })}
                    </DropdownMenu>
                    <Link to="/" onClick={handleLogin}>
                      logout{" "}
                      <FontAwesomeIcon icon={faSignOutAlt} className="logOut" />
                    </Link>
                  </>
                )}
              </div>
            </li>
          </ul>
        </MainWrapper>
      </MainNav>
    </Header>
  );
};

export default Nav;

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
  max-width: 50%;
  flex: 0 0 50%;

  .logoLink {
    color: #004785;
    background-color: transparent;

    img {
      padding-top: 50px;
      width: 400px;
      height: auto;
      vertical-align: middle;
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
