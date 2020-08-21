import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const StepThree = () => {
  const [show, setShow] = useState(false);
  const [tabSlideData, setTabSlideData] = useState([]);
  const handleHowItWorks = () => {
    setShow(!show);
  };

  useEffect(() => {
    axios.get("/data/crsptab.json").then((res) => {
      setTabSlideData(res.data.data);
    });
  }, []);
  console.log(tabSlideData);

  return (
    <StepThreeFrame>
      <h3>
        <strong>Step 3</strong>: Query Variables.
      </h3>
      <h4 onClick={handleHowItWorks}>How does this work?</h4>
      {show && (
        <HowItWorksModal>
          <p>
            The purpose of the variable selector is to make it easier to manage
            the many variables that you frequently need to navigate in order to
            make a WRDS Query.
          </p>
          <p>
            To add items
            <li>Check the item in the list on the left.</li>
            <li>
              Alternately, you can just check all of the items with the "Check
              All" option.
            </li>
            To remove items
            <li>Uncheck the item in the list on the left. </li>
            <li>Or uncheck the item in the list on the right.</li>
            <li>
              Alternately, you can just uncheck all of the items with the
              "Uncheck All" option.
            </li>
          </p>
        </HowItWorksModal>
      )}
      <TabSlider>
        <TabCategory>
          <i className="fas fa-search" />
          <h4>Search All</h4>
          <p>0/10</p>
        </TabCategory>
        {tabSlideData.map((item) => {
          return (
            <TabCategory key={item.category}>
              <h4>{item.category}</h4>
            </TabCategory>
          );
        })}
      </TabSlider>
      <div>
        {tabSlideData.map((item) => {
          return (
            <p key={item.category}>
              {item.variable_eng}
              <span>{item.variable_kor}</span>
            </p>
          );
        })}
      </div>
    </StepThreeFrame>
  );
};

export default StepThree;

const StepThreeFrame = styled.div`
  border: 1px solid blue;
  h3 {
    font-size: 20px;
    strong {
      font-weight: 800;
    }
  }
`;

const HowItWorksModal = styled.div`
  margin: 0 auto;
  padding: 20px;
  width: 100%;
  height: 200px;
  background-color: white;
  border: 1px solid #ddd;
`;

const TabSlider = styled.ul`
  display: flex;
  width: 100%;
  color: white;
  background: #002c77;
  border: 1px solid white;
`;

const TabCategory = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  border-right: 1px solid white;
  cursor: pointer;
  i {
    margin-right: 10px;
  }
  p {
    margin-left: 10px;
    padding: 2px 5px;
    font-size: 12px;
    color: #002c77;
    background-color: white;
    border-radius: 10px;
  }
  h4 {
  }
`;
