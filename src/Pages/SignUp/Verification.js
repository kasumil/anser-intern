import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { API } from "../../config";

const Verification = () => {
  const [request, setRequest] = useState({ phone_number: "" });
  const [checkNumber, setCheckNumber] = useState({
    phone_number: "",
    auth_number: "",
  });

  const inputValuedetector = (e) => {
    const { name, value } = e.target;
    setRequest({ ...request, [name]: value });
    setCheckNumber({ ...checkNumber, [name]: value });
  };

  const requestButton = (e) => {
    axios({
      method: "post",
      url: `${API}hrdsuser/sms/`,
      data: request,
    }).then((res) => {
      res.data.message === "SUCCESS" && alert("인증번호를 전송했습니다.");
    });
  };

  const checkNumberButton = (e) => {
    axios({
      method: "post",
      url: `${API}hrdsuser/smscheck/`,
      data: checkNumber,
    }).then((res) => {
      res.data.message === "SUCCESS" && alert("인증에 성공했습니다.");
    });
  };

  return (
    <VerificationFrame>
      <RequestVNumber>
        <input
          onChange={inputValuedetector}
          type="text"
          name="phone_number"
          maxLength="11"
          placeholder="휴대폰 번호"
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            requestButton();
          }}
        >
          인증번호 전송
        </button>
      </RequestVNumber>
      <CheckNumber>
        <input
          onChange={inputValuedetector}
          type="text"
          name="auth_number"
          maxLength="4"
          placeholder="인증 번호"
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            checkNumberButton();
          }}
        >
          인증 확인
        </button>
      </CheckNumber>
    </VerificationFrame>
  );
};
export default Verification;

const VerificationFrame = styled.div`
  margin-right: 30px;
`;

const RequestVNumber = styled.div`
  margin-bottom: 7px;
  width: 302px;
  border: 1px solid #ddd;
  border-radius: 0.25rem;

  input {
    background-color: transparent;
    padding-left: 8px;
    width: 200px;
    height: 32px;
    border-style: none;
  }

  button {
    width: 100px;
    height: 32px;
    color: #888;
    border-style: none;
    outline: none;
    cursor: pointer;

    &:hover {
      color: black;
    }
  }
`;

const CheckNumber = styled.div`
  width: 306px;
  border: 1px solid #ddd;

  input {
    background-color: transparent;
    padding-left: 8px;
    width: 200px;
    height: 32px;
    border-style: none;
  }

  button {
    width: 100px;
    height: 32px;
    color: #888;
    border-style: none;
    outline: none;
    cursor: pointer;

    &:hover {
      color: black;
    }
  }
`;
