import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { TOP_PANEL_URL } from "../../config";

const TopPanelData = () => {
  const [topPanelData, setTopPanelData] = useState([]);

  useEffect(() => {
    axios.get(TOP_PANEL_URL).then((res) => {
      setTopPanelData(res.data.data);
    });
  }, []);

  return (
    <>
      {topPanelData.map((el, i) => {
        return (
          <Col key={i}>
            <ul>
              <li className="subTitle">
                <Link to="">{el.subtitle}</Link>
              </li>
              {el.nonsub.map((el, i) => {
                return (
                  <li className="nonSub" key={i}>
                    <Link to="">{el}</Link>
                  </li>
                );
              })}
            </ul>
          </Col>
        );
      })}
    </>
  );
};

export default TopPanelData;

const Col = styled.div`
  display: flex;
  position: relative;
  padding: 0 15px;
  flex: 0 0 25%;

  ul {
    margin-top: 0;
    margin-bottom: 1rem;
    padding-left: 40px;
    width: 100%;

    .subTitle {
      position: relative;
      text-transform: uppercase;

      a {
        display: block;
        padding: 10px 0;
        font-size: 17px;
        font-weight: 700;
        letter-spacing: 0.7px;
        color: #2e55a4;

        &:after {
          content: "";
          position: absolute;
          bottom: 4px;
          left: 0;
          width: 100%;
          height: 1px;
          background: #aaa;
        }
      }

      &:hover {
        text-decoration: underline;
      }
    }

    .nonSub {
      a {
        display: block;
        padding: 5px 0;
        font-size: 17px;
        color: #004785;

        &:hover {
          color: #000;
          text-decoration: underline;
        }
      }
    }
  }
`;
