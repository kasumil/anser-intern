import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Nav from "../Components/Nav/Nav";
import StepOne from "./Components/CRSP/StepOne";
import StepThree from "../Pages/Components/CRSP/StepThree";
import StepFour from "./Components/CRSP/StepFour";
import Footer from "../Components/Footer/Footer";
import Search from "../Pages/Components/CRSP/Search";

const CRSP = () => {
  const onGetSubmit = (startDate, endDate, check) => {
    console.log(startDate, "부모1");
    console.log(endDate, "부모2");
    console.log(check, "부모3");
  };

  return (
    <>
      <Nav />
      <CRSPFrame>
        <CRSPSideBar>
          <h1>CRSP</h1>
          <h2>Stock / Security Files</h2>
          <SideBarList>
            <li>
              <Link to="">Monthly Stock File</Link>
            </li>
            <li>
              <Link to="">Daily Stock File</Link>
            </li>
            <li>
              <Link to="">Stock Market Indexes</Link>
            </li>
            <li>
              <Link to="">Stock Header Info</Link>
            </li>
            <li>
              <Link to="">Beta Suite by WRDS</Link>
            </li>
            <li>
              <Link to="">U.S. Daily Event Study: Upload your own events</Link>
            </li>
          </SideBarList>
        </CRSPSideBar>
        <CRSPContent>
          <CRSPTabWrapper>
            <ul>
              <li>
                <Link className="active">Query Form</Link>
              </li>
              <li>
                <Link>Variable Descriptions</Link>
              </li>
              <li>
                <Link>Manuals and Overviews</Link>
              </li>
              <li>
                <Link>FAQs</Link>
              </li>
              <li>
                <Link>Dataset List</Link>
              </li>
            </ul>
          </CRSPTabWrapper>
          <CRSPTitle>CRSP Daily Stock</CRSPTitle>
          <StepOne onSubmit={onGetSubmit} />
          <Search />
          <StepThree />
          <StepFour />
        </CRSPContent>
      </CRSPFrame>

      <Footer />
    </>
  );
};

export default CRSP;

const CRSPFrame = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px auto;
  width: 1140px;
`;

const CRSPSideBar = styled.div`
  width: 250px;
  font-size: 18px;
  padding-top: 5px;

  h1 {
    color: #0e76bc;
    border-bottom: 1px solid #ddd;
    cursor: pointer;

    &:hover {
      background-color: #f3f3f4;
    }
  }

  h1,
  h2 {
    padding: 20px 15px 20px;
    border-bottom: 1px solid #ddd;
  }
`;

const SideBarList = styled.div`
  margin-top: 10px;

  li {
    list-style: none;
    margin-bottom: 5px;
    padding: 15px;
    width: 100%;
    height: auto;
    background-color: #f3f3f4;
    cursor: pointer;

    &:hover {
      background-color: #dddddd;
    }

    a {
      color: #0e76bc;
      line-height: 1.2;
    }
  }
`;
const CRSPTitle = styled.div`
  font-size: 32px;
  font-weight: bolder;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
`;

const CRSPContent = styled.section`
  width: 890px;
  padding: 20px;
`;

const CRSPTabWrapper = styled.div`
  position: relative;

  ul {
    display: flex;
    margin-bottom: 15px;
    white-space: nowrap;
    border-bottom: none;

    li {
      position: relative;
      display: table-cell;
      margin-bottom: -1px;
      width: 100%;
      text-align: center;

      a {
        position: relative;
        display: block;
        padding: 18px 15px;
        margin-right: 2px;
        line-height: 1.4;
        color: #fff;
        border: 1px solid #002c77;
        border-bottom: none;
        background-color: #002c77;

        &:hover {
          color: #002c77;
          border: 1px solid #002c77;
          border-bottom: none;
          background-color: #fff;
          transition: all 0.25s cubic-bezier(0.54, 0.06, 0.55, 0.97);
        }

        &.active {
          color: #002c77;
          border: 1px solid #002c77;
          border-bottom: none;
          background-color: #fff;
        }
      }
    }
  }
`;
