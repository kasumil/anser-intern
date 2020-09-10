import React, { useState, useEffect } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import validator from "email-validator";
import styled from "styled-components";
import Nav from "../../Components/Nav/Nav";
import Verification from "./Verification";
import Footer from "../../Components/Footer/Footer";
import { SUBMIT_POINT, UNIV_LIST } from "../../config";

function Signup() {
  const [data, setData] = useState();
  const [userInfo, setUserinfo] = useState({
    firstname: "",
    password: "",
    password_check: "",
    email: "",
    subscriber: "",
    usertype: "",
    department: "",
  });
  const [honest, setHonest] = useState("third");
  const [define, setDefine] = useState("one");
  const history = useHistory();

  //밸리데이션 확인용
  useEffect(() => {
    const emailValid = validator;
    const isEmailDetector = emailValid.validate(userInfo.email);
    const isEmail = userInfo.email.length === 0;
    const isPassword = userInfo.password.length < 5;
    const isPasswordValid = userInfo.password === userInfo.password_check;
    if (isEmailDetector) {
      setHonest("first");
    } else if (!isEmailDetector) {
      if (isEmail) {
        setHonest("third");
      } else {
        setHonest("second");
      }
    }
    if (isPassword) {
      setDefine("one");
    } else if (isPasswordValid) {
      setDefine("two");
    } else {
      setDefine("three");
    }
  }, [userInfo]);

  //대학교, 유저타입 백엔드통신용
  useEffect(() => {
    fetch(UNIV_LIST)
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      });
  }, []);

  // 인풋값 감지용
  const inputValuedetector = (e) => {
    const { name, value } = e.target;
    setUserinfo({ ...userInfo, [name]: value });
  };

  // 회원 가입 버튼
  const submitBtn = (e) => {
    const {
      firstname,
      password,
      email,
      subscriber,
      usertype,
      department,
    } = userInfo;
    const auth_number = sessionStorage.getItem("auth_number");
    const phone_number = sessionStorage.getItem("phone_number");
    e.preventDefault();
    fetch(SUBMIT_POINT, {
      method: "POST",
      body: JSON.stringify({
        firstname,
        password,
        email,
        subscriber,
        usertype,
        department,
        auth_number,
        phone_number,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message === "회원가입이 완료되었습니다.") {
          alert("회원가입을 환영합니다");
          history.push("/signin");
        } else if (res.message === "중복된 이메일입니다.") {
          alert("중복된 이메일입니다.");
        } else if (res.message === "중복된 이메일입니다.") {
          alert("이메일과 비밀번호를 확인해주십시오");
        }
        sessionStorage.removeItem(
          "phone_number", 
          "auth_number"
        );
      });
  };

  return (
    <>
      <Nav />
      {/* 이제부터 바디내용 */}
      <div>
        <ContainerWrap>
          <InnerContent>
            <TitleContainer>
              <FirstTitle>Register for WRDS</FirstTitle>
            </TitleContainer>
            <BodyContainer>
              <FormTag>
                {/* 성 */}
                <FormGroup>
                  <LabelName type="id_first_name">이름</LabelName>
                  <InputValue
                    onChange={inputValuedetector}
                    type="text"
                    name="firstname"
                    maxlength="254"
                    placeholder="이름"
                  />
                </FormGroup>
                {/* 비밀번호 */}
                <FormGroup>
                  <LabelName type="password">비밀번호</LabelName>
                  <InputValue
                    onChange={inputValuedetector}
                    type="password"
                    name="password"
                    maxlength="254"
                    placeholder="비밀번호"
                  />
                  <SmallText>비밀번호를 5자 이상으로 적어주세요</SmallText>
                </FormGroup>
                {/* 비밀번호 확인용 */}
                <FormGroup>
                  <LabelName type="password">비밀번호 확인</LabelName>
                  <InputGroup>
                    <InputValue
                      onChange={inputValuedetector}
                      type="password"
                      name="password_check"
                      maxlength="254"
                      placeholder="비밀번호 확인"
                    />
                    <ValidationBox>
                      <SpanName define={define === "one"}>
                        비밀번호를 입력해주세요
                      </SpanName>
                      <SpanName define={define === "three"}>
                        비밀번호가 다릅니다.
                      </SpanName>
                      <SpanName color="#5CB85C" define={define === "two"}>
                        비밀번호가 일치합니다
                      </SpanName>
                    </ValidationBox>
                  </InputGroup>
                </FormGroup>
                {/* 이메일 주소 */}
                <FormGroup>
                  <LabelName type="id_email">이메일 주소</LabelName>
                  <InputGroup>
                    <InputValue
                      onChange={inputValuedetector}
                      type="email"
                      name="email"
                      maxlength="15"
                      placeholder="이메일 주소"
                    />
                    <ValidationBox>
                      <SpanName honest={honest === "third"}>
                        기관 이메일 주소를 입력해주세요
                      </SpanName>
                      <SpanName honest={honest === "second"}>
                        유효한 이메일주소가 아닙니다.
                      </SpanName>
                      <SpanName color="#5CB85C" honest={honest === "first"}>
                        유효한 이메일주소입니다.
                      </SpanName>
                    </ValidationBox>
                  </InputGroup>
                </FormGroup>
                {/* 대학교리스트 */}
                <FormGroup>
                  <LabelName>기관명</LabelName>
                  <select
                    onChange={inputValuedetector}
                    name="subscriber"
                    className="form-control"
                    id="id_subscriber"
                  >
                    {data &&
                      data.univ.map((el) => {
                        return (
                          <option key={el.id} value={el.id}>
                            {el.name}
                          </option>
                        );
                      })}
                  </select>
                </FormGroup>
                {/* 유저타입 */}
                <FormGroup>
                  <LabelName type="id_user_type">신분</LabelName>
                  <select
                    onChange={inputValuedetector}
                    name="usertype"
                    className="form-control"
                    title="신분"
                    id="user_type"
                  >
                    {data &&
                      data.type.map((el) => {
                        return (
                          <option key={el.id} value={el.id}>
                            {el.name}
                          </option>
                        );
                      })}
                  </select>
                  <SmallText>
                    가입하시는 분의 현재 신분을 선택해 주세요.
                  </SmallText>
                </FormGroup>
                {/* 부서 */}
                <FormGroup>
                  <LabelName type="id_department">부서</LabelName>
                  <InputValue
                    onChange={inputValuedetector}
                    type="text"
                    name="department"
                    maxlength="254"
                    placeholder="부서"
                  />
                </FormGroup>
                <VerificationFlex>
                  {/* 휴대폰 인증 */}
                  <FormGroup>
                    <LabelName>본인인증</LabelName>
                    <Verification />
                  </FormGroup>
                </VerificationFlex>
                {/* 회원약관 */}
                <FormGroup>
                  <LabelName type="id_terms_of_use">이용약관</LabelName>
                  <AcceptContract>
                    By submitting this form, you accept the
                    <Link className="TermsLink" to="">
                      &nbsp;Terms of Use
                    </Link>
                  </AcceptContract>
                </FormGroup>
                <SubmitBTN type="submit" onClick={submitBtn}>
                  가입하기
                </SubmitBTN>
              </FormTag>
            </BodyContainer>
          </InnerContent>
        </ContainerWrap>
      </div>
      <Footer />
    </>
  );
}

export default withRouter(Signup);

// 회원가입창 내용
const ContainerWrap = styled.div`
  margin: 0 auto;
  padding: 0 auto;
  width: 100%;
  max-width: 1170px;
`;

const InnerContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
`;

//Resister for RDS 감싼 부분.
const TitleContainer = styled.div`
  flex: 0 0 100%;
  max-width: 100%;
`;

const FirstTitle = styled.h1`
  margin: 15px 0px 15px 0px;
  padding-bottom: 11.5px;
  line-height: 1.2;
  font-size: 2.5rem;
  font-weight: 500;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  border-bottom: 1px solid #ddd;
`;

// 아이디 비밀번호 입력하는 내용 부분.
const BodyContainer = styled.div`
  position: relative;
  flex: 0 0 100%;
  padding-right: 15px;
  padding-left: 15px;
  width: 100%;
  max-width: 100%;
`;

// 폼 양식인 부분.
const FormTag = styled.form`
  margin-top: 0em;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;

  .form-control {
    display: block;
    padding: 0.375rem 0.75rem;
    width: 100%;
    height: calc(1.5em + 0.75rem + 2px);
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    background-color: #fff;
    background-clip: padding-box;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
`;

const LabelName = styled.label`
  display: inline-block;
  margin-bottom: 0.5rem;
`;

const InputGroup = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: flex-end;
  width: 100%;
`;

const InputValue = styled.input`
  position: relative;
  display: block;
  flex: 1 1 0%;
  margin-bottom: 0;
  padding: 0.375rem 0.75rem;
  width: 100%;
  min-width: 0;
  height: calc(1.5em + 0.75rem + 2px);
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  background-color: #fff;
  background-clip: padding-box;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`;

const ValidationBox = styled.div`
  display: flex;
  margin-left: -1px;
`;

// username 밸리데이션
const SpanName = styled.span`
  display: ${(props) =>
    props.honest || props.define
      ? "block"
      : "none"};
  align-items: center;
  margin-bottom: 0;
  padding: 0.375rem 0.75rem;
  color: #fff;
  font-size: 1rem;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  line-height: 1.5;
  background-color: ${(props) => props.color || "#c5093b"};
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  border-color: ${(props) => props.color || "#c5093b"};
  z-index: 5;
`;

// 인풋창 아래에 있는 작은 글씨들
const SmallText = styled.small`
  margin-top: 0.25rem;
  color: #6c757d;
  font-size: 80%;
  font-weight: 400;
`;

const VerificationFlex = styled.div`
  display: flex;
`;

//계약서 동의문구
const AcceptContract = styled.h5`
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
  font-weight: 500;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  line-height: 1.2;

  .TermsLink {
    color: #004785;
    text-decoration: none;
    background-color: transparent;

    &:hover {
      text-decoration: underline;
    }
  }
`;

// 제출 버튼
const SubmitBTN = styled.button`
  padding: 0.5rem 1rem;
  color: #fff;
  font-size: 1.25rem;
  font-weight: 400;
  text-align: center;
  line-height: 1.5;
  vertical-align: middle;
  transition: color 0.15s ease-in-out;
  border: 1px solid transparent;
  margin-bottom: 10px;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15),
    0 1px 1px rgba(0, 0, 0, 0);
  background-color: #004785;
  cursor: pointer;
`;
