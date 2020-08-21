import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Nav from "../../Components/Nav/Nav";
import Footer from "../../Components/Footer/Footer";
import { Univ_List } from "../../config";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { Recapcha_Key } from "../../config";
import { addMonths } from "date-fns";
import DatePicker from "react-datepicker";
import ReCAPTCHA from "react-google-recaptcha";
import "react-datepicker/dist/react-datepicker.css";

function Signup(props) {
  const [data, setData] = useState();
  const [startDate, setStartDate] = useState(null);
  const [userInfo, setUserinfo] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    subscriber: "",
    user_type: "",
    expiration_date: "",
    department: "",
  });
  const [valid, setValid] = useState("normal");
  const [honest, setHonest] = useState("third");
  const [calendar, setCalendar] = useState("jan");

  //밸리데이션 확인용
  useEffect(() => {
    const isDetector = userInfo.username.length > 4;
    const isNomal = userInfo.username.length === 0;
    const isEmailDetector =
      userInfo.email.length > 4 && userInfo.email.includes("@");
    const isEmail = userInfo.email.length === 0;
    const isCalendarDetector = startDate === null;
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
  }, [userInfo, startDate, calendar]);

  //대학교, 유저타입 백엔드통신용
  useEffect(() => {
    fetch(`${Univ_List}`)
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

  //리캡챠용
  const onChange = (value) => {
    console.log("Captcha value:", value);
  };

  const submitBtn = () => {
    const {
      username,
      first_name,
      last_name,
      email,
      subscriber,
      user_type,
      expiration_date,
      department,
    } = userInfo;
    fetch(``, {
      method: "POST",
      body: JSON.stringify({
        username,
        first_name,
        last_name,
        email,
        subscriber,
        user_type,
        department,
        expiration_date,
      }),
    })
      .then((res) => res.json)
      .then((res) => {
        if (res) {
          alert("회원가입을 환영합니다");
          props.history.push("/");
        } else {
          alert("이메일과 비밀번호를 확인해주십시오");
        }
      });
  };

  return (
    <>
      <Nav />
      <HomeBar>
        <HomeContainer>
          <nav>
            <OrderedList>
              <List>
                <FaHome className="houseImg" />
                &nbsp;Home
              </List>
            </OrderedList>
          </nav>
        </HomeContainer>
      </HomeBar>
      {/* 이제부터 바디내용 */}
      <div>
        <ContainerWrap>
          <InnerContent>
            <TitleContainer>
              <FirstTitle>
                Register for WRDS
              </FirstTitle>
            </TitleContainer>
            <BodyContainer>
              <FormTag
              action="."
              method="post"
              onsubmit="return check_form();"
              >
                {/* 유저네임 */}
                <FormGroup>
                  <LabelName>
                    Username
                  </LabelName>
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
                  <LabelName type="id_first_name">First name</LabelName>
                  <InputValue
                    onChange={inputValuedetector}
                    type="text"
                    name="first_name"
                    maxlength="254"
                    placeholder="First name"
                  />
                </FormGroup>
                {/* 이름 */}
                <FormGroup>
                  <LabelName type="id_last_name">Last name</LabelName>
                  <InputValue
                    onChange={inputValuedetector}
                    type="text"
                    name="last_name"
                    maxlength="254"
                    placeholder="Last name"
                  />
                </FormGroup>
                {/* 이메일 주소 */}
                <FormGroup>
                  <LabelName type="id_email">Email address</LabelName>
                  <InputGroup>
                    <InputValue
                      onChange={inputValuedetector}
                      type="email"
                      name="email"
                      maxlength="15"
                      placeholder="Email addresssername"
                    />
                    <ValidationBox>
                      <SpanName
                      honest={honest === "third"}
                      >
                        Please enter your institutional email address.
                      </SpanName>
                      <SpanName honest={honest === "second"}>
                        This is a valid email address. Please select your
                        institution below.
                      </SpanName>
                      <SpanName color="#5CB85C" honest={honest === "first"}>
                        This is a valid email address for the chosen subscriber.
                      </SpanName>
                    </ValidationBox>
                  </InputGroup>
                </FormGroup>
                {/* 대학교리스트 */}
                <FormGroup>
                  <LabelName>Subscriber</LabelName>
                  <select
                    onChange={inputValuedetector}
                    name="subscriber"
                    className="form-control"
                    id="id_subscriber"
                  >
                    {data &&
                      data.univ.map((el, idx) => {
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
                  <LabelName type="id_user_type">User type</LabelName>
                  <select
                    onChange={inputValuedetector}
                    name="user_type"
                    className="form-control"
                    title="The account type of this user."
                  >
                    {data &&
                      data.type.map((el, idx) => {
                        return (
                          <option key={el.id} value={el.id}>
                            {el.name}
                          </option>
                        );
                      })}
                  </select>
                  <SmallText>
                    The account type of this user.
                  </SmallText>
                </FormGroup>
                {/* 만료기간 */}
                <FormGroup>
                  <LabelName>
                    Expiration date
                  </LabelName>
                  <InputGroup>
                    <ValidationBox>
                      <SpanName
                      calendar={calendar === "jan"}
                      >
                        Please enter a valid expiration date (YYYY-MM-DD).
                      </SpanName>
                      <SpanName 
                      color="#5CB85C" 
                      calendar={calendar === "feb"}
                      >
                        This is a valid expiration date.
                      </SpanName>
                    </ValidationBox>  
                  </InputGroup>
                </FormGroup>
                {/* 부서 */}
                <FormGroup>
                  <LabelName type="id_department">Department</LabelName>
                  <InputValue
                    onChange={inputValuedetector}
                    type="text"
                    name="department"
                    maxlength="254"
                    placeholder="Department"
                  />
                </FormGroup>
                {/* 리캡차 */}
                <FormGroup>
                  <LabelName type="id_captcha">Captcha</LabelName>
                  <ReCAPTCHA sitekey={`${Recapcha_Key}`} onChange={onChange} />
                </FormGroup>
                {/* 회원약관 */}
                <FormGroup>
                  <LabelName type="id_terms_of_use">Terms of Use</LabelName>
                  <AcceptContract>
                    By submitting this form, you accept the
                    <Link className="TermsLink" to="">
                      Terms of Use
                    </Link>
                  </AcceptContract>
                </FormGroup>
                <SubmitBTN
                type="submit"
                onClick={submitBtn}
                >
                  Register for WRDS
                </SubmitBTN>
              </FormTag>
              <DatePicker
                className="calenderposition"
                selected={startDate}
                dateFormat="yyyy-MM-dd"
                onChange={(date) => {
                  setStartDate(date);
                  setUserinfo({ ...userInfo, expiration_date: date });
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

// 회원가입창 홈바
const HomeBar = styled.div`
  background-color: #e9ecef;
`;
const HomeContainer = styled.div`
  width: 100%;
  max-width: 1170px;
  padding: 0 15px;
  margin: 0 auto;
`;
const OrderedList = styled.ol`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  align-content: center;
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  border-radius: 0.25rem;
  height: 40px;
`;
const List = styled.li`
  display: flex;
  align-items: center;
  color: gray;
  font-family: "Helvetica Neue", "Helvetica", Arial, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 16px;
  width: 70px;
  height: 24px;

  .houseImg {
    width: 15px;
    height: 16px;
  }
`;

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
    bottom: 339px;
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
  background-color: ${props => props.color || "#c5093b"};
  border-color: ${props => props.color || "#c5093b"};
  display: ${props => props.valid || props.honest || props.calendar? "block": "none"};
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
