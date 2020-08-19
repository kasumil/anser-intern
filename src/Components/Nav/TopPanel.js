import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDatabase,
  faGraduationCap,
  faInfoCircle,
  faSignOutAlt,
  faArrowAltCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { TOP_PANEL_URL } from "../../config";

const TopPanel = () => {
  const [isFold, setIsFold] = useState(false);
  const [topPanelData, setTopPanelData] = useState([]);

  useEffect(() => {
    axios.get(TOP_PANEL_URL).then((res) => {
      setTopPanelData(res.data.data);
    });
  }, []);

  const handleFold = () => {
    setIsFold(!isFold);
  };

  return (
    <MainPanel>
      <MainLinks>
        <Container>
          <Tabs>
            <TabItems>
              <Link to="">
                <i className="fa fa-area-chart" /> Analytics
              </Link>
            </TabItems>
            <TabItems>
              <Link to="">
                <FontAwesomeIcon icon={faDatabase} /> Data
              </Link>
            </TabItems>
            <TabItems>
              <Link to="">
                <FontAwesomeIcon icon={faGraduationCap} /> Classroom
              </Link>
            </TabItems>
            <TabItems>
              <Link to="" className="about" onClick={handleFold}>
                <FontAwesomeIcon icon={faInfoCircle} /> About
              </Link>
            </TabItems>
            <TabItems>
              <Link to="">
                <FontAwesomeIcon icon={faSignOutAlt} /> Demo
              </Link>
            </TabItems>
          </Tabs>
        </Container>
        {isFold && (
          <NavContent>
            <NavContentItems>
              <Row>
                {topPanelData.map((el, i) => {
                  return (
                    <Col>
                      <ul>
                        <li className="subTitle" key={i}>
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
              </Row>
              <NavButtonBox>
                <NavButton href="https://wrds-www.wharton.upenn.edu/pages/about/">
                  <FontAwesomeIcon icon={faInfoCircle} /> About WRDS{" "}
                  <FontAwesomeIcon icon={faArrowAltCircleRight} />
                </NavButton>
              </NavButtonBox>
            </NavContentItems>
          </NavContent>
        )}
      </MainLinks>
    </MainPanel>
  );
};

export default TopPanel;

const MainPanel = styled.div`
  max-height: 42px;
  transition: max-height 0.2s ease-out;
  overflow: visible;
`;

const MainLinks = styled.div`
  background: #2e55a4;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1170px;
  margin: 0 auto;
`;

const Tabs = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  width: auto;
  margin-top: 0.5rem;
`;

const TabItems = styled.li`
  position: relative;
  width: auto;

  a {
    padding: 5px 15px;
    font-size: 16px;
    font-weight: 300;
    letter-spacing: 0.5px;
    line-height: 1.5;
    color: #fff;
    z-index: 300;

    &:hover {
      border-top: 4px solid #c5093b;
    }

    &.about:after {
      content: "";
      display: inline-block;
      margin-left: 0.255em;
      vertical-align: 0.255em;
      border-top: 0.3em solid;
      border-bottom: 0;
      border-right: 0.3em solid transparent;
      border-left: 0.3em solid transparent;
    }

    i:before {
      content: "\f1fe";
    }
  }
`;

const NavContent = styled.div`
  position: absolute;
  justify-content: center;
  right: 0;
  margin-right: 20px;
  width: 90%;
  max-height: 1500px;
  transition: max-height 0.25s ease-in;
  background: #f3f3f4;
  z-index: 1000;
`;

const NavContentItems = styled.div`
  position: relative;
  padding: 15px 0;
  overflow: hidden;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -15px;
`;

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

const NavButtonBox = styled.div`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  padding: 0 15px;
`;

const NavButton = styled.a`
  display: inline-block;
  padding: 10px;
  width: 100%;
  font-size: 18px;
  font-weight: 400;
  text-align: center;
  line-height: 1.5;
  vertical-align: middle;
  color: #fff;
  background-color: #004785;
  border: 1px solid #004785;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15),
    0 1px 1px rgba(0, 0, 0, 0.075);
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &:hover {
    background-color: #00335f;
    border-color: #002c52;
  }
`;
