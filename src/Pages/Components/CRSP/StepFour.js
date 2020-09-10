import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { INPUT_LIST, CRSP_SUBMIT } from "../../../config";
import axios from "axios";

function StepFour() {
  const [list, setList] = useState(); // 배열자료
  const [check, setCheck] = useState(); // format, 이메일, 쿼리내용 기입.
  const [query, setQuery] = useState(false); // 쿼리 체크값 확인용
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  // 백엔드 통신용
  useEffect(() => {
    fetch(INPUT_LIST)
      .then((res) => res.json())
      .then((res) => {
        setList(res);
      });
  }, []);

  // 백엔드 버튼 눌렀을시에 보내주는 기능
  const SubmitQuery = () => {
    const comp = sessionStorage.getItem("comp");
    const start_date = sessionStorage.getItem("start_date");
    const end_date = sessionStorage.getItem("end_date");
    const selected = sessionStorage.getItem("selected").split(",");
    const access_token = sessionStorage.getItem("access_token");
    const stock_code = sessionStorage.getItem("corp_code").split(",");
    const email = check.email;
    const format = check.format;
    const query_name = check.query_name;
    setIsLoading(true);
    axios({
      method: "POST",
      url: CRSP_SUBMIT,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        comp,
        start_date,
        end_date,
        selected,
        stock_code,
        email,
        format,
        query_name,
        access_token,
      },
    })
      .then((res) => {
        const down = res.data.data.download;
        let a = document.createElement("a");
        a.href = down;
        a.download = down;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      })
      .then((res) => {
        sessionStorage.removeItem(
          "stock_code",
          "comp",
          "start_date",
          "end_date"
        );
        setIsLoading(false);
        alert("요청하신 메일로 정상 발송되었습니다");
        history.push("/savedqueries");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // 포맷형식 선택기
  const valuedetector = (e) => {
    const { name, value } = e.target;
    setCheck({ ...check, [name]: value });
  };

  // 쿼리네임 체크박스 부분
  const InputManage = (e) => {
    !query ? setQuery(true) : setQuery(false);
  };

  return (
    <StepFourWrap>
      <div>
        <StepFourTitle>Step4 :</StepFourTitle>
        <StepFourSub> 출력형식.</StepFourSub>
      </div>
      <Body>
        <Typing>
          <Content>
            원하는 파일의 형식을 선택하세요.
            <br />
            다운받으실 데이터의 양이 많다면, 더 빠른 다운로드를 위해 압축 형식을
            선택해 주세요.
            <br />
            (옵션) 이메일 주소를 입력하시면, 요청하신 데이터 처리가 끝난 이후
            결과창으로
            <br />
            연결되는 링크를 보내드립니다.
          </Content>
        </Typing>
        <BtnWrap>
          <LeftBTN>
            <LeftWrap>
              <LeftTitle>출력형식</LeftTitle>
              {list &&
                list.OutputFormat.map((el) => {
                  return (
                    <LeftInputs key={el.id}>
                      <Btn
                        type="radio"
                        name="format"
                        id={el.title}
                        value={el.value}
                        checked={el.value === (check && check.format)}
                        autocomplete="off"
                        onChange={valuedetector}
                      />
                      &nbsp;
                      <LableName>{el.name}</LableName>
                    </LeftInputs>
                  );
                })}
            </LeftWrap>
          </LeftBTN>
          {/* 민치호님의 요청으로 주석처리 함. */}
          {/* <MiddleBTN>
            <MiddleWrap>
              <LeftTitle>Compression Type</LeftTitle>
              {list && list.CompressionType.map((el) =>{
                return(
                  <LeftInputs>
                    <Btn
                    type="radio"
                    name="compress"
                    id={el.title}
                    value={el.value}
                    checked={el.value === (check && check.format)}
                    autocomplete="off"
                    onChange={valuedetector}
                    />
                    &nbsp;
                    <LableName>{el.name}</LableName>
                  </LeftInputs>
                )
              })}
              </MiddleWrap>
          </MiddleBTN>
          <RightBTN>
            <LeftWrap>
              <LeftTitle>Date Format</LeftTitle>
              {list && list.DateFormat.map((el) =>{
                return(
                  <LeftInputs>
                    <Btn
                    type="radio"
                    name="datef"
                    id={el.title}
                    value={el.value}
                    checked={el.value === (check && check.format)}
                    autocomplete="off"
                    onChange={valuedetector}
                    />
                    &nbsp;
                    <LableName>{el.name}</LableName>
                  </LeftInputs>
                )
              })}
            </LeftWrap>
          </RightBTN> */}
        </BtnWrap>
        <EmailRow>
          <EmailWrap>
            <EmailLabel>
              이메일 주소
              <Smalltitle>(옵션)</Smalltitle>
            </EmailLabel>
            <EmailTypingBox>
              <EmailTyping
                type="email"
                maxlength="255"
                name="email"
                id="email"
                placeholder="이메일"
                onChange={valuedetector}
              />
            </EmailTypingBox>
          </EmailWrap>
          <SaveQueryWrap>
            <SaveQueryTitle>
              <InputBox
                type="checkbox"
                id="savequery"
                name="savequery"
                checked={true === query}
                onChange={InputManage}
              />
              &nbsp;Save this query to myWRDS
            </SaveQueryTitle>
            {query ? (
              <QueryName2
                name="query_name"
                id="query_name"
                type="text"
                placeholder="Query Name"
                onChange={valuedetector}
              />
            ) : (
              <QueryName
                name="query_name"
                id="query_name"
                type="text"
                placeholder="Query Name"
                disabled="readOnly"
              />
            )}
          </SaveQueryWrap>
        </EmailRow>
        <SubmitBtnRow>
          <BtnSubmin name="querysubmit" onClick={SubmitQuery}>
            {isLoading ? (
              <>
                <img alt="loading" src="/images/loading2.gif" />
                <span>처리중...</span>
              </>
            ) : (
              "질의 제출"
            )}
          </BtnSubmin>
        </SubmitBtnRow>
      </Body>
    </StepFourWrap>
  );
}

export default StepFour;

const StepFourWrap = styled.div`
  margin-top: 30px;
`;

// 제목태그
const StepFourTitle = styled.strong`
  font-size: 20px;
  font-weight: bold;
`;
const StepFourSub = styled.span`
  font-size: 20px;
`;

//내용
const Body = styled.div`
  margin: 0 -15px;
`;
const Typing = styled.div`
  position: relative;
  min-height: 1px;
  padding: 0 15px;
`;

const Content = styled.p`
  font-size: 18px;
  line-height: 26px;
  margin: 0 0 11.5px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
`;

//버튼들
const BtnWrap = styled.div`
  display: flex;
`;

const LeftBTN = styled(Typing)`
  width: 33.33333%;
  height: 100%;
`;

const LeftWrap = styled.dl`
  margin-bottom: 19px;
`;

const LeftTitle = styled.dt`
  font-weight: bold;
  line-height: 1.4;
  font-size: 16px;
  font-family: inherit;
`;

const LeftInputs = styled.dd`
  line-height: 1.4;
`;

const Btn = styled.input`
  margin-top: 1px;
`;

const LableName = styled.label`
  font-size: 14px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  display: inline-block;
  max-width: 100%;
  margin-bottom: 5px;
`;

const EmailRow = styled.div`
  display: flex;
`;

const EmailWrap = styled.div`
  width: 50%;
  position: relative;
  min-height: 1px;
  padding: 0 15px;
`;

const EmailLabel = styled.label`
  height: 32.5px;
  margin-bottom: 0;
  padding-top: 9px;
  max-width: 100%;
  font-size: 14px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  display: inline-block;
`;
const Smalltitle = styled.small`
  color: #686868;
  font-style: italic;
  font-size: 85%;
  text-align: right;
`;

const EmailTypingBox = styled.div`
  position: relative;
  display: table;
  border-collapse: separate;
  width: 100%;
  height: 37px;
  padding: 8px 12p 8px;
  font-size: 14px;
  line-height: 1.4;
  background-color: #fff;
`;

const EmailTyping = styled.input`
  position: relative;
  z-index: 2;
  width: 100%;
  margin-bottom: 0;
  height: 37px;
  padding: 8px 12px;
  font-size: 14px;
  line-height: 1.4;
  color: black;
  background-color: #fff;
  border: 1px solid #ccc;
`;

const SaveQueryWrap = styled(EmailWrap)``;
const SaveQueryTitle = styled(EmailLabel)``;

const InputBox = styled.input`
  margin-top: 1px;
`;

const QueryName = styled.input`
  cursor: not-allowed;
  background-color: "gray";
  display: block;
  width: 100%;
  height: 37px;
  padding: 8px 12px;
  color: #000;
  font-size: 14px;
  line-height: 1.4;
  border: 1px solid #ccc;
  opacity: 1;
`;

const QueryName2 = styled(QueryName)`
  cursor: text;
  color: #000;
  background-color: #fff;
  border: 1px solid #ccc;
`;

//버튼
const SubmitBtnRow = styled.div`
  display: flex;
  margin: 15px 0 30px;
  padding-left: 15px;
  height: auto;
`;

const BtnSubmin = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  background-color: #154281;
  border-color: #11376b;
  padding: 8px 12px;
  margin-top: 30px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  border: 1px solid transparent;
  white-space: nowrap;
  font-size: 14px;
  line-height: 1.4;
  user-select: none;
  width: 112.13px;
  height: 37px;
  outline: 0;

  img {
    width: 20%;
    height: 100%;
    object-fit: contain;
  }
`;

// const MiddleBTN = styled(LeftBTN)``;
// const RightBTN = styled(LeftBTN)``;
// const MiddleWrap = styled(LeftWrap)``;
