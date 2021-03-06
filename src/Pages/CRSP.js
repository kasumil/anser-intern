import React from "react";
import styled from "styled-components";
import Nav from "../Components/Nav/Nav";
import StepOne from "./Components/CRSP/StepOne";
import StepThree from "../Pages/Components/CRSP/StepThree";
import StepFour from "./Components/CRSP/StepFour";
import Footer from "../Components/Footer/Footer";
import Search from "../Pages/Components/CRSP/Search";

const CRSP = () => {
  return (
    <>
      <Nav />
      <CRSPContent>
        <CRSPTitle>CRSP 주가 데이터 요청</CRSPTitle>
        <StepOne />
        <Search />
        <StepThree />
        <StepFour />
      </CRSPContent>
      <Footer />
    </>
  );
};

export default CRSP;

const CRSPTitle = styled.div`
  font-size: 32px;
  font-weight: bolder;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
`;

const CRSPContent = styled.section`
  width: 890px;
  padding: 20px;
  margin: 0 auto;
`;
