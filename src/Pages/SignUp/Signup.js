import React, { useState, useEffect } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import styled from "styled-components";
import Nav from "../../Components/Nav/Nav";
import Verification from "./Verification";
import Footer from "../../Components/Footer/Footer";
import DatePicker from "react-datepicker";
import moment from "moment";
import { SUBMIT_POINT, UNIV_LIST } from "../../config";
import { addMonths } from "date-fns";
import validator from "email-validator";
import "react-datepicker/dist/react-datepicker.css";

function Signup() {
  const [data, setData] = useState();
  const [startDate, setStartDate] = useState(null);
  const [userInfo, setUserinfo] = useState({
    username: "",
    firstname: "",
    lastname: "",
    password: "",
    password_check: "",
    email: "",
    subscriber: "",
    usertype: "",
    expirationdate: "",
    department: "",
  });
  const [valid, setValid] = useState("normal");
  const [honest, setHonest] = useState("third");
  const [calendar, setCalendar] = useState("jan");
  const [define, setDefine] = useState("one");
  const history = useHistory();

  console.log(calendar, startDate);
  //밸리데이션 확인용
  useEffect(() => {
    const emailValid = validator;
    const isDetector = userInfo.username.length > 4;
    const isNomal = userInfo.username.length === 0;
    const isEmailDetector = emailValid.validate(userInfo.email);
    const isEmail = userInfo.email.length === 0;
    const isCalendarDetector = startDate === null;
    const isPassword = userInfo.password.length === 0;
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
    if (isDetector) {
      setValid("correct");
    } else if (!isDetector) {
      if (isNomal) {
        setValid("normal");
      } else {
        setValid("valid");
      }
    }
    if (isCalendarDetector) {
      setCalendar("jan");
    } else {
      setCalendar("feb");
    }
    if (isPassword) {
      setDefine("one");
    } else if (isPasswordValid) {
      setDefine("two");
    } else {
      setDefine("three");
    }
  }, [userInfo, startDate, calendar]);

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

  // //리캡차용
  // const onChange = (value) => {
  //   console.log("Captcha value:", value);
  // };

  const submitBtn = (e) => {
    const {
      username,
      firstname,
      lastname,
      password,
      email,
      subscriber,
      usertype,
      expirationdate,
      department,
    } = userInfo;
    e.preventDefault();
    fetch(SUBMIT_POINT, {
      method: "POST",
      body: JSON.stringify({
        username,
        firstname,
        lastname,
        password,
        email,
        subscriber,
        usertype,
        expirationdate,
        department,
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
                {/* 유저네임 */}
                <FormGroup>
                  <LabelName>Username</LabelName>
                  <InputGroup>
                    <InputValue
                      onChange={inputValuedetector}
                      type="text"
                      name="username"
                      maxlength="15"
                      placeholder="Username"
                      title="Required. 4 to 15 characters long. 
                    Lowercase letters and digits only. 
                    Must start with a letter."
                    />
                    <ValidationBox>
                      <SpanName valid={valid === "normal"}>
                        Please choose a username.
                      </SpanName>
                      <SpanName valid={valid === "valid"}>
                        The username you have entered is too short.
                      </SpanName>
                      <SpanName color="#5CB85C" valid={valid === "correct"}>
                        The username you have selected is available.
                      </SpanName>
                    </ValidationBox>
                  </InputGroup>
                  <SmallText>
                    Required. 4 to 15 characters long. Lowercase letters and
                    digits only. Must start with a letter.
                  </SmallText>
                </FormGroup>
                {/* 성 */}
                <FormGroup>
                  <LabelName type="id_first_name">성함</LabelName>
                  <InputValue
                    onChange={inputValuedetector}
                    type="text"
                    name="firstname"
                    maxlength="254"
                    placeholder="성함"
                  />
                </FormGroup>
                {/* 이름 */}
                <FormGroup>
                  <LabelName type="id_last_name">Last name</LabelName>
                  <InputValue
                    onChange={inputValuedetector}
                    type="text"
                    name="lastname"
                    maxlength="254"
                    placeholder="Last name"
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
                  <SmallText>가입하시는 분의 현재 신분을 선택해 주세요.</SmallText>
                </FormGroup>
                {/* 만료기간 */}
                <FormGroup>
                  <LabelName>만료일</LabelName>
                  <InputGroup>
                    <ValidationBox>
                      <SpanName calendar={calendar === "jan"}>
                        만료일을 선택해 주세요(YYYY-MM-DD).
                      </SpanName>
                      <SpanName color="#5CB85C" calendar={calendar === "feb"}>
                        유효한 만료일입니다.
                      </SpanName>
                    </ValidationBox>
                  </InputGroup>
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
                    <LabelName>Verification</LabelName>
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
              <DatePicker
                className="calenderposition"
                selected={startDate}
                dateFormat="yyyy-MM-dd"
                onChange={(date) => {
                  setStartDate(date);
                  setUserinfo({
                    ...userInfo,
                    expirationdate: moment(date).format("YYYY-MM-DD"),
                  });
                }}
                minDate={addMonths(new Date(), 6)}
                maxDate={addMonths(new Date(), 12)}
                onKeyDown={(e) => e.preventDefault()}
                type="text"
                name="expiration_date"
                placeholderText=" Expiration date"
              />
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
  width: 100%;
  max-width: 1170px;
  margin: 0 auto;
  padding: 0 auto;
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
  border-bottom: 1px solid #dddddd;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  padding-bottom: 11.5px;
  margin: 15px 0px 15px 0px;
  font-size: 2.5rem;
  font-weight: 500;
  line-height: 1.2;
`;

// 아이디 비밀번호 입력하는 내용 부분.
const BodyContainer = styled.div`
  position: relative;
  flex: 0 0 100%;
  max-width: 100%;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;

  .calenderposition {
    background: #fff
      url(https://code.jquery.com/ui/1.10.3/themes/smoothness/images/ui-bg_flat_75_ffffff_40x100.png)
      50% 50% repeat-x;
    color: #222222;
    position: absolute;
    display: block;
    border: 1px solid #ced4da;
    width: 17em;
    padding: 0.2em 0.2em 0;
    min-height: 0;
    bottom: 337px;
    width: 1138px;
    height: 36px;
    border-radius: 0.25rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
  }

  .react-datepicker-popper {
    top: -349px !important;
  }

  .react-datepicker__triangle {
    display: none;
  }
`;

// 폼 양식인 부분.
const FormTag = styled.form`
  margin-top: 0em;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;

  .form-control {
    display: block;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    width: 100%;
    height: calc(1.5em + 0.75rem + 2px);
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    border-radius: 0.25rem;
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
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  display: block;
  flex: 1 1 0%;
  min-width: 0;
  margin-bottom: 0;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  border-radius: 0.25rem;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`;

const ValidationBox = styled.div`
  display: flex;
  margin-left: -1px;
`;

// username 밸리데이션
const SpanName = styled.span`
  color: #fff;
  background-color: ${(props) => props.color || "#c5093b"};
  border-color: ${(props) => props.color || "#c5093b"};
  display: ${(props) =>
    props.valid || props.honest || props.calendar || props.define
      ? "block"
      : "none"};
  align-items: center;
  text-align: center;
  white-space: nowrap;
  border: 1px solid #ced4da;
  padding: 0.375rem 0.75rem;
  margin-bottom: 0;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  border-radius: 0.25rem;
  z-index: 5;
`;

// 인풋창 아래에 있는 작은 글씨들
const SmallText = styled.small`
  color: #6c757d;
  margin-top: 0.25rem;
  font-size: 80%;
  font-weight: 400;
`;

const VerificationFlex = styled.div`
  display: flex;
`;

//계약서 동의문구
const AcceptContract = styled.h5`
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  margin-bottom: 0.5rem;
  font-weight: 500;
  line-height: 1.2;
  font-size: 1.25rem;
  margin-top: 0;

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
  cursor: pointer;
  color: #fff;
  background-color: #004785;
  border-color: #004785;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15),
    0 1px 1px rgba(0, 0, 0, 0);
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  border: 1px solid transparent;
  transition: color 0.15s ease-in-out;
  padding: 0.5rem 1rem;
  font-size: 1.25rem;
  line-height: 1.5;
`;
