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
          <strong>Step 3</strong>: 변수 선택.
        </h3>
        <h4 className="howItWorks" onClick={handleHowItWorks}>
          <i className="far fa-question-circle" />
          도움말
        </h4>
      </TitleFrame>
      {showHowWorks && (
        <HowItWorksModal>
          <p>
            자주 찾는 변수를 체계적으로 정리하여, 더 쉽고 더 편하게 검색하실 수 있도록 만들었습니다.
          </p>
          <p>
            <strong>변수 추가</strong>
            <li>왼쪽의 변수를 클릭해주세요.</li>
            <li>
              '모두 추가'를 클릭하시면 모든 변수를 추가할 수 있습니다.
            </li>
            <strong>변수 제거</strong>
            <li>왼쪽의 변수 중 추가된 변수를 다시 클릭해 주세요.</li>
            <li>오른쪽에서 클릭해도 제거됩니다.</li>
            <li>
              '모두 제거'를 클릭하시면 추가된 변수가 모두 제거됩니다.
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
