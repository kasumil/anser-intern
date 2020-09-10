import React from "react";
import styled from "styled-components";
import { FirstBody, SecondBody, ThirdBody } from "./SecondModalBody";
import { ModalStyle } from "../../../Styles/style";

const SecondModal = ({
  secondModal,
  modalCount,
  handleSecondModal,
  handleModalCount,
}) => {
  return (
    <>
      {secondModal && (
        <SecondModalWrapper>
          <SecondModalBox>
            <SceondModalContainer>
              <SModalHeader>
                <h3>
                  {modalCount === 1
                    ? "안내"
                    : modalCount === 2
                    ? "Using Identifier Codes to Find Companies"
                    : "Available Identifier Codes"}
                </h3>
                <i
                  className="far fa-times-circle xBtn"
                  onClick={handleSecondModal}
                />
              </SModalHeader>
              <SModalBody>
                {modalCount === 1
                  ? FirstBody
                  : modalCount === 2
                  ? SecondBody
                  : ThirdBody}
              </SModalBody>
              <SModalFooter>
                <button onClick={handleSecondModal}>닫기</button>
                {modalCount === 3 ? (
                  ""
                ) : (
                  <button className="next" onClick={handleModalCount}>
                    식별자 사용법 알아보기
                  </button>
                )}
              </SModalFooter>
            </SceondModalContainer>
          </SecondModalBox>
        </SecondModalWrapper>
      )}
    </>
  );
};

export default SecondModal;

const SecondModalWrapper = styled.div`
  ${ModalStyle}
  opacity: 1;
  animation: opacity 0.15s linear;
  overflow-x: hidden;
  overflow-y: auto;

  @keyframes opacity {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const SecondModalBox = styled.div`
  position: relative;
  margin: 130px auto;
  width: 600px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  background-clip: padding-box;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  transform: translate(0, 0);
  animation: trans 0.3s ease-out;
  z-index: 9999;

  @keyframes trans {
    from {
      transform: translate(0, -25%);
    }
    to {
      transform: translate(0, 0);
    }
  }
`;

const SceondModalContainer = styled.div`
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  background-color: #fff;
  background-clip: padding-box;

  .xBtn {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 20px;
    height: 20px;
    color: #ddd;
    cursor: pointer;

    &:hover {
      color: #444;
    }
  }
`;

const SModalHeader = styled.div`
  padding: 15px;
  min-height: 16.4px;
  border-bottom: 1px solid #e5e5e5;

  h3 {
    font-size: 22px;
    line-height: 30px;
    z-index: 10;
  }
`;

const SModalBody = styled.div`
  position: relative;
  padding: 20px;

  p {
    margin: 0 0 11.5px;
    font-size: 16.5px;
    font-weight: 500;
    letter-spacing: 0.25px;
    line-height: 24px;
  }

  ol {
    margin: 0 0 9.5px 15px;
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0.25px;
    line-height: 24px;
    list-style-type: decimal;
  }

  code {
    padding: 2px 4px;
    font-size: 90%;
    color: #c7254e;
    background-color: #f9f2f4;
    font-family: Menlo, Monaco, Consolas, "Courier New", monospace;
  }
`;

const SModalFooter = styled.div`
  padding: 20px;
  text-align: right;
  border-top: 1px solid #e5e5e5;

  button {
    display: inline-block;
    position: relative;
    padding: 8px 12px;
    font-size: 14px;
    line-height: 1.4;
    text-align: center;
    color: #333;
    vertical-align: middle;
    border: 1px solid #ccc;
    background-color: #e7e7e7;
    user-select: none;
    outline: 0;
    cursor: pointer;
    transition: all 0.25s cubic-bezier(0.54, 0.06, 0.55, 0.97);

    &:hover {
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
      background-color: #cecece;
      border-color: #adadad;
    }

    &.next {
      margin-left: 10px;
      color: #fff;
      border: 1px solid #11376b;
      background-color: #154281;

      &:hover {
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        background-color: #0e2c55;
        border-color: #091c36;
      }
    }
  }
`;
