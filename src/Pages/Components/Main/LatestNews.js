import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const LatestNews = ({ latestNews }) => {
  return (
    <MainFrame>
      <MainFrameRow>
        <h2>Latest News & Updates</h2>
        <button>
          More Updates
          <i className="fas fa-arrow-circle-right" aria-hidden="true" />
        </button>
      </MainFrameRow>
      <NewsArticles>
        {latestNews.map((item, idx) => {
          return (
            <Article key={idx}>
              <li>
                <Link to={item.link}>{item.title}</Link>
              </li>
              <ArticleFooter>
                <p className="newsDate">{item.date}</p>
                <p className="readMore">
                  Read More
                  <i className="fas fa-angle-double-right" aria-hidden="true" />
                </p>
              </ArticleFooter>
            </Article>
          );
        })}
      </NewsArticles>
    </MainFrame>
  );
};
export default LatestNews;

const MainFrame = styled.div`
  width: 1140px;
  margin: 0 auto;
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

const NewsArticles = styled.ul`
  width: 1140px;
  display: grid;
  grid-template-columns: repeat(3, 360px);
  grid-row-gap: 20px;
  justify-content: space-around;
  margin: 0 auto;
`;

const Article = styled.div`
  position: relative;
  height: 200px;
  padding: 20px;
  border: 1px solid #ddd;
  line-height: 0.5;

  a {
    width: 320px;
    font-size: 18px;
    color: #004785;
  }
`;

const ArticleFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  bottom: 20px;
  width: 320px;

  .newsDate {
    font-size: 14px;
    font-weight: 400;
  }

  .readMore {
    font-size: 14px;
    font-weight: 700;
  }
`;

const MainFrameRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1140px;
  margin: 0 auto;

  button {
    width: 215px;
    height: 40px;
    margin: 0;
    padding: 0;
    font-size: 18px;
    border: 1px solid #004785;
  }

  figure {
    width: 25%;
    margin: 0 1rem;
    padding: 1rem;
    border: 1px solid #ddd;

    img {
      width: 90%;
      padding: 1rem;
    }

    p {
      margin-top: 0.5rem;
      font-size: 16px;
      text-align: center;
      color: #004785;
    }
  }
`;
