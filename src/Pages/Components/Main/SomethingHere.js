import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const SomethingHere = () => {
  const history = useHistory();
  return (
    <SomethingHereFrame>
      <h1>바로가기 메뉴</h1>
      <ImgFrame onClick={() => history.push("/CRSP")}>
        <MenuTitle>
          <p>CRSP</p>
          <i className="fas fa-plus" />
        </MenuTitle>
      </ImgFrame>
      <ImgFrame></ImgFrame>
      <ImgFrame></ImgFrame>
      <ImgFrame></ImgFrame>
    </SomethingHereFrame>
  );
};

export default SomethingHere;

const SomethingHereFrame = styled.div`
  margin: 20px;
  /* border: 1px solid #888; */
  border-radius: 10px;

  h1 {
    margin: 20px auto;
    text-align: center;
    font-size: 28px;
    font-weight: 400;
  }
`;

const ImgFrame = styled.figure`
  margin: 10px;
  width: 200px;
  height: 60px;
  background-image: url("/Images/chart.jpeg");
  background-size: 400px;
  border-radius: 30px;
  overflow: hidden;
  cursor: pointer;
`;

const MenuTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  width: 140px;
  line-height: 60px;

  p {
    font-size: 20px;
    color: white;
  }

  i {
    font-size: 20px;
    color: white;
  }
`;
