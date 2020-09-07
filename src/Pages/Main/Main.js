import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";
import MainNav from "../../Components/Nav/MainNav";
import Nav from "../../Components/Nav/Nav";
import CardPage from "../CardPage/CardPage";
import ContactUs from "../Components/Main/ContactUs";
import Footer from "../../Components/Footer/Footer";

const Main = ({ loginStatus }) => {
  const history = useHistory();
  return (
    <>
      {!loginStatus ? <MainNav /> : <Nav />}
      <MainFrame>
        <HeaderImage>
          <img alt="headerImage" src="/Images/main.jpeg" />
        </HeaderImage>
      </MainFrame>
      <CardPageMain>
        <CardPage />
        <SeeMore onClick={() => history.push("/cardpage")}>
          더보기
          <i className="fas fa-angle-double-right" />
        </SeeMore>
      </CardPageMain>
      <ContactUs />
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => {
  return { loginStatus: state.loginStatus };
};

export default connect(mapStateToProps)(Main);

const MainFrame = styled.div`
  width: 1140px;
  margin: 0 auto;
  margin-top: 3rem;
  font-size: 36px;
  font-weight: bolder;

  h2 {
    margin: 40px 0 20px;
    text-align: center;
  }

  button {
    display: block;
    margin: 20px auto;
    padding: 0.7rem 3rem;
    font-size: 1.25rem;
    color: #fff;
    border-radius: 0;
    outline: none;
    background-color: #004785;
    cursor: pointer;

    &:hover {
      background-color: #00335f;
    }

    i {
      margin-left: 6px;
    }
  }
`;

const HeaderImage = styled.div`
  margin: 0 auto 40px;
  overflow: hidden;
  width: 80%;
  height: 400px;

  img {
    display: block;
    margin: -80px auto 1rem;
    width: 100%;
  }
`;

const CardPageMain = styled.div`
  position: relative;
  margin: 0 auto;
  width: 1140px;
  height: 540px;
  overflow: hidden;
`;
const SeeMore = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  cursor: pointer;
  color: #888;

  &:hover {
    color: black;
  }

  i {
    margin-left: 10px;
  }
`;
