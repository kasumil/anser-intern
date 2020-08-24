import React from "react";
import styled from "styled-components";

const DataVenders = () => {
  return (
    <MainFrame>
      <h2>Data Vendors</h2>
      <MainFrameRow>
        <figure>
          <img alt="Boardex" src="/Images/boardEx-logo.png" />
          <p>Boardex</p>
        </figure>
        <figure>
          <img alt="Sustainalytics" src="/Images/sustainalytics-logo.jpg" />
          <p>Sustainalytics</p>
        </figure>
        <figure>
          <img alt="Ravenpack" src="/Images/ravenpack-logo.jpg" />
          <p>Ravenpack</p>
        </figure>
        <figure>
          <img alt="Preqin" src="/Images/preqin-logo.jpg" />
          <p>Preqin</p>
        </figure>
      </MainFrameRow>
      <AllDataVenders>
        All Data Venders
        <i className="fas fa-arrow-circle-right" aria-hidden="true" />
      </AllDataVenders>
    </MainFrame>
  );
};

export default DataVenders;

const MainFrame = styled.div`
  width: 1140px;
  margin: 0 auto;
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

const AllDataVenders = styled.button`
  display: block;
  margin: 20px auto;
  padding: 0.7rem 7rem;
  font-size: 1.25rem;
  color: #fff;
  border-radius: 0;
  outline: none;
  border: 1px solid #004785;
  background-color: #004785;
  cursor: pointer;

  &:hover {
    background-color: #00335f;
  }

  i {
    margin-left: 6px;
  }
`;
