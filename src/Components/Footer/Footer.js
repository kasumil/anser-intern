import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <Section>
      <Container>
        <HighTitle>
          <LinkContainer>
            <Link className="imglink" to="">
              <Imglogo
                src="https://wrds-www.wharton.upenn.edu/static/img/logo/wharton_white.svg"
                alt="The Wharton School Logo"
              />
            </Link>
            <Link className="textdeco" to="">
              Wharton Research Data Services
            </Link>
          </LinkContainer>
          <RightList>
            <ListContainer>
              <ListBundle>
                <UnoderedList>
                  <List>
                    <Link className="LinkText" to="">
                      About WRDS
                    </Link>
                    <Link className="LinkText" to="">
                      WRDS FAQs
                    </Link>
                    <Link className="LinkText" to="">
                      WRDS News
                    </Link>
                    <Link className="LinkText" to="">
                      Our Team
                    </Link>
                  </List>
                </UnoderedList>
              </ListBundle>
              <ListBundle>
                <UnoderedList>
                  <List>
                    <Link className="LinkText" to="">
                      3 Ways to use WRDS
                    </Link>
                    <Link className="LinkText" to="">
                      WRDS Account Types
                    </Link>
                    <Link className="LinkText" to="">
                      Terms of Use
                    </Link>
                  </List>
                </UnoderedList>
              </ListBundle>
              <ListBundle>
                <UnoderedList>
                  <List>
                    <Link className="LinkText" to="">
                      Account Preferences
                    </Link>
                    <Link className="LinkText" to="">
                      Info / Support Request
                    </Link>
                    <Link className="LinkText" to="">
                      Privacy Policy
                    </Link>
                  </List>
                </UnoderedList>
              </ListBundle>
              <ListBundle>
                <UnoderedList>
                  <List>
                    <Link className="LinkText" to="">
                      Sample Data
                    </Link>
                    <Link className="LinkText" to="">
                      Conference Calendar
                    </Link>
                    <Link className="LinkText" to="">
                      Impactful Research
                    </Link>
                  </List>
                </UnoderedList>
              </ListBundle>
            </ListContainer>
          </RightList>
        </HighTitle>
        <UndersubTitle>
          <Copyright>
            <SmallTitle>
              Unless otherwise noted, all material is © 1993-2020, The Wharton
              School, University of Pennsylvania. All rights reserved.
            </SmallTitle>
          </Copyright>
        </UndersubTitle>
      </Container>
    </Section>
  );
}

export default Footer;

//최상단 프래그먼트
const Section = styled.div`
  padding: 40px 0 15px;
  border-bottom: 4px solid #a90533;
  background: #2e55a4;
  color: #ffffff;
`;

//모든 것을 담는 컨테이너
const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 15px;
  max-width: 1170px;
`;

//이미지와 내용들이 들어가는 타이틀
const HighTitle = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -15px;
`;

const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 15px;
  margin-bottom: 16px;

  .imglink {
    color: white;
    width: 360px;
  }

  .textdeco {
    color: white;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Imglogo = styled.img`
  width: 245px;
  margin-left: -5px;
  margin-bottom: 10px;
`;

//오른쪽 글씨들
const RightList = styled.div`
  position: relative;
  flex: 0 0 66.66667%;
  max-width: 66.66667%;
  padding: 0 15px;
  width: 100%;
`;

const ListContainer = styled.div`
  position: initial;
  display: flex;
  flex-direction: wrap;
  margin-right: -15px;
  margin-left: -15px;
`;

const ListBundle = styled.div`
  flex: 0 0 25%;
  max-width: 25%;
  width: 100%;
  padding: 0 15px;
  position: relative;
`;

const UnoderedList = styled.ul`
  display: flex;
  flex-direction: column;
  width: 165px;
  padding-top: 10px;
  margin-bottom: 1rem;
  padding-inline-start: 0;
`;

const List = styled.li`
  display: flex;
  flex-direction: column;

  .LinkText{
    color : white;
    background-color: transparent;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    text-align: left;

    &:hover {
      text-decoration: underline;
    }
  }
`;

//아래쪽 저작권등 작은 글씨.
const UndersubTitle = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
`;

const Copyright = styled.div`
  position: relative;
  flex: 0 0 100%;
  max-width: 100%;
  width: 100%;
  padding: 0 15px;
`;

const SmallTitle = styled.small`
  font-size: 80%;
  font-weight: 400;
  font-style: normal;
  text-align: left;
`;
