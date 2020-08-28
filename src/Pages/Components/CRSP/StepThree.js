import React, { useState } from "react";
import styled from "styled-components";

import StepThreeContents from "./StepThreeContents";

const StepThree = () => {
  const [showHowWorks, setShowHowWorks] = useState(false);

  const handleHowItWorks = () => {
    setShowHowWorks(!showHowWorks);
  };

  return (
    <StepThreeFrame>
      <TitleFrame>
        <h3>
          <strong>Step 3</strong>: Query Variables.
        </h3>
        <h4 className="howItWorks" onClick={handleHowItWorks}>
          <i className="far fa-question-circle" />
          How does this work?
        </h4>
      </TitleFrame>
      {showHowWorks && (
        <HowItWorksModal>
          <p>
            The purpose of the variable selector is to make it easier to manage
            the many variables that you frequently need to navigate in order to
            make a WRDS Query.
          </p>
          <p>
            <strong>To add items</strong>
            <li>Check the item in the list on the left.</li>
            <li>
              Alternately, you can just check all of the items with the "Check
              All" option.
            </li>
            <strong>To remove items</strong>
            <li>Uncheck the item in the list on the left. </li>
            <li>Or uncheck the item in the list on the right.</li>
            <li>
              Alternately, you can just uncheck all of the items with the
              "Uncheck All" option.
            </li>
          </p>
        </HowItWorksModal>
      )}
      <StepThreeContents />
    </StepThreeFrame>
  );
};

export default StepThree;

const StepThreeFrame = styled.div`
  font-family: arial;

  h3 {
    font-size: 20px;

    strong {
      font-weight: 800;
    }
  }
`;

const TitleFrame = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .howItWorks {
    padding: 10px;
    color: #002c77;
    text-decoration: underline;
    cursor: pointer;

    i {
      margin-right: 10px;
    }
  }
`;

const HowItWorksModal = styled.div`
  margin: 0 auto 10px;
  padding: 20px;
  width: 100%;
  height: auto;
  background-color: white;
  border: 1px solid #ddd;

  p {
    line-height: 1.3;

    strong {
      margin: 5px 0;
      font-weight: 700;
    }
  }

  animation: slidein 1s;

  @keyframes slidein {
    from {
      opacity: 0;
      margin-left: 20px;
    }

    to {
      opacity: 1;
      margin-left: 0px;
    }
  }
`;
