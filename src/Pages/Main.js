import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Nav from "../Components/Nav/Nav";
import PageHighlight from "./Main/PageHighlight";
import Testinominals from "./Main/Testinominals";
import DataVenders from "./Main/DataVenders";
import LatestNews from "./Main/LatestNews";
import ContactUs from "./Main/ContactUs";
import Footer from "../Components/Footer";

const Main = () => {
  const [slideData, setSlideData] = useState([]);
  const [latestNews, setLatestNews] = useState([]);

  useEffect(() => {
    axios
      .get("data/data.json")
      .then(
        (res) => (
          setSlideData(res.data.slideData),
          setLatestNews([...res.data.latestNews])
        )
      );
  }, []);

  return (
    <>
      <Nav />
      <MainFrame>
        <img alt="headerImage" src="/Images/headerImage.jpeg" />
        <MainLinks>
          <figure>
            <Link to="">Researchers</Link>
            <img alt="researcher" src="/Images/researcher.jpeg" />
          </figure>
          <figure>
            <Link to="">Instructors</Link>
            <img alt="instructor" src="/Images/instructor.jpeg" />
          </figure>
          <figure>
            <Link to="">Information Professionals</Link>
            <img alt="information" src="/Images/information.jpeg" />
          </figure>
        </MainLinks>
        <MainFigures>
          <figure>
            35
            <p>Countries</p>
          </figure>
          <figure>
            500
            <p>Subscribing Institutions</p>
          </figure>
          <figure>
            50,000
            <p>WRDS Users</p>
          </figure>
        </MainFigures>
        <MainParagraph>
          From the classroom to the boardroom, WRDS is more than just a data
          platform — data validation, flexible delivery options, simultaneous
          access to multiple data sources, research-based analytics, and
          dedicated client support provided by doctoral-level professionals.
        </MainParagraph>
      </MainFrame>
      <PageHighlight />
      <DataVenders />
      <Testinominals slideData={slideData} />
      <LatestNews latestNews={latestNews} />
      <ContactUs />
      <Footer />
    </>
  );
};

export default Main;

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

  img {
    display: block;
    margin: 0 auto 1rem;
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

const MainLinks = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
  font-size: 1.75rem;
  border-bottom: 1px solid #ddd;

  figure {
    text-align: center;
    line-height: 1.2;

    a {
      color: #004785;
      font-weight: 600;
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const MainFigures = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 60px 0;
  font-size: 1.75rem;
  border-bottom: 1px solid #ddd;

  figure {
    width: 33%;
    font-size: 64px;
    color: #06aafc;
    text-align: center;

    p {
      font-size: 20px;
      font-weight: 200;
      color: #000;
    }
  }
`;

const MainParagraph = styled.p`
  margin: 40px 0;
  text-align: center;
  font-size: 22px;
  font-weight: 200;
  line-height: 35px;
`;
