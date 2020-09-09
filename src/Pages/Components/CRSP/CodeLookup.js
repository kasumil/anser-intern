import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import ReactExport from "react-export-excel";
import { CORPLIST } from "../../../config";
import TableData from "./TableData";
import SecondModal from "./SecondModal";
import { ModalStyle, ButtonStyle } from "../../../Styles/style";
import { FirstParagraph, SecondParagraph } from "./CodeLookupText";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const CodeLookup = ({ handleModal, checkedData, setCheckedData }) => {
  const [value, setValue] = useState("");
  const [resultValue, setResultValue] = useState("");
  const [searchValue, setSearchValue] = useState("로 시작하는 결과");
  const [searchType, setSearchType] = useState("start with")
  const [data, setData] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [secondModal, setSecondModal] = useState(false);
  const [modalCount, setModalCount] = useState(1);
  const [allCheck, setAllCheck] = useState(false);
  const [checkStatus, setCheckStatus] = useState([]);
  const focusTarget = useRef();
  const focusResult = useRef();

  useEffect(() => {
    focusTarget.current.focus();
  }, []);

  const handleSecondModal = () => {
    setSecondModal(!secondModal);
    setModalCount(1);
  };

  const handleModalCount = () => {
    setModalCount(modalCount + 1);
  };

  const handleInput = (e) => {
    const { value } = e.target;
    setValue(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setData([]);
    setIsLoading(true);
    if (value) {
      setIsSubmit(true);
      setResultValue(value);
      axios
        .post(CORPLIST, {
          search_word: value,
          search_type: searchType,
        })
        .then((res) => {
          setData(res.data.data);
          setCheckStatus(Array(res.data.data.length).fill(false));
          setIsLoading(false);
          focusResult.current.scrollIntoView({ behavior: "smooth" });
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      e.preventDefault();
      setIsSubmit(false);
      alert("Please fill the form first!");
    }
  };

  const handleAllCheck = () => {
    setAllCheck(!allCheck);
  };

  useEffect(() => {
    setCheckStatus(checkStatus.map(() => allCheck));
  }, [allCheck]);

  const handleEachCheck = (checkedIndex) => {
    setCheckStatus(
      checkStatus.map((status, index) =>
        index === checkedIndex ? !status : status
      )
    );
  };

  const handleSearchValue = (e) => {
    const { value, name } = e.target;
    setSearchValue(name);
    setSearchType(value)
  };

  const handleAddList = () => {
    const filteredData = data.filter((_, i) => {
      return checkStatus[i];
    });

    setCheckedData(
      filteredData.map((el) => {
        return el.corp_code;
      })
    );

    if (checkStatus.some((status) => status)) {
      sessionStorage.setItem("stock_code", checkedData);
      alert(`Add ${filteredData.length} codes to your list.`);
      handleModal();
    } else if (!checkStatus.every((status) => status)) {
      alert(
        "Whoops! Looks like you didn't select an identifier yet! Please select an identifier before you begin adding codes to your list."
      );
    }
  };

  const findMoreCodes = () => {
    focusTarget.current.focus();
  };

  return (
    <Modal>
      <Codelookup>
        <i className="far fa-times-circle xBtn" onClick={handleModal} />
        <TitleBox>
          <Title>
            <h3>CRSP 종목코드 조회</h3>
          </Title>
        </TitleBox>
        <SearchFormBox>
          <Row>
            <Col>
              <FormGroup>
                <CodeSearchForm onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="여기에 회사명이나 종목코드, 법인등록번호를 적어주세요."
                    value={value}
                    onChange={handleInput}
                    ref={focusTarget}
                  />
                  <InputGroupBtn>
                    <button onClick={handleSearchValue} value="start with" name="로 시작하는 ">
                      로 시작하는 결과
                    </button>
                    <button onClick={handleSearchValue} value="contains" name="를 포함하는 ">
                      를 포함하는 결과
                    </button>
                    <button onClick={handleSearchValue} value="exact">
                      Is Exactly
                    </button>
                  </InputGroupBtn>
                </CodeSearchForm>
              </FormGroup>
            </Col>
          </Row>
        </SearchFormBox>
        <br />
        <Row>
          <Colsmall>{FirstParagraph}</Colsmall>
          <Colsmall>{SecondParagraph}</Colsmall>
          <Colsmall>
            <Panel>
              <PanelHeader>
                <strong>Need more help?</strong>
              </PanelHeader>
              <PanelBody>
                <p>
                  Take a moment to{" "}
                  <span onClick={handleSecondModal}>
                    read the full step-by-step instructions
                  </span>{" "}
                  to using this tool, including{" "}
                  <span onClick={handleSecondModal}>
                    a complete list of identifiers available
                  </span>
                  .
                </p>
              </PanelBody>
            </Panel>
          </Colsmall>
        </Row>
        <hr />
        <Row>
          {!isSubmit ? (
            <ColResult>
              <p>아직 검색을 하지 않으셨네요!</p>
            </ColResult>
          ) : (
            <ColResult>
              <Row>
                <ColResult className="c-align">
                  {isSubmit && isLoading ? (
                    <div>
                      <p className="c-align">
                        <img alt="loading" src="/images/loading.gif" />
                        검색 진행 중...
                      </p>
                    </div>
                  ) : (
                    <>
                      <span ref={focusResult}>
                        {/* {data.length} results found that {searchValue} "
                        {resultValue}" */}
                        " {resultValue}"{searchValue} {data.length}개의 결과가 있습니다.
                        {/* "~"를 포함하는 "number"개의 결과가 있습니다. */}
                      </span>
                      <ResultTable>
                        <Base>
                          <ResultData>
                            <ResultDataInner>
                              <table>
                                <thead>
                                  <tr>
                                    <th className="thCheck">
                                      <input
                                        type="checkbox"
                                        onChange={handleAllCheck}
                                        checked={checkStatus.every(
                                          (status) => status
                                        )}
                                        value="head"
                                      />
                                    </th>
                                    <th className="companyName">CORP_CODE</th>
                                    <th className="general">회사명</th>
                                    <th className="general">종목코드</th>
                                    <th className="general">법인등록번호</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {data.map((el, i) => {
                                    return (
                                      <TableData
                                        key={i}
                                        idx={i}
                                        data={el}
                                        checked={checkStatus[i]}
                                        handleEachCheck={handleEachCheck}
                                      />
                                    );
                                  })}
                                </tbody>
                              </table>
                            </ResultDataInner>
                          </ResultData>
                        </Base>
                      </ResultTable>
                    </>
                  )}
                </ColResult>
              </Row>
            </ColResult>
          )}
        </Row>
        {!isLoading && (
          <>
            <ExcelFile
              element={
                <div className="exportData">
                  <span>엑셀 스프레드시트로 저장</span>
                </div>
              }
              filename={`CodeSearchResults ${new Date().toLocaleString()}`}
            >
              <ExcelSheet data={data} name="Codes">
                <ExcelColumn label="CORP_CODE" value="corp_code" />
                <ExcelColumn label="CORP_NAME" value="corp_name" />
                <ExcelColumn label="STOCK_CODE" value="stock_code" />
                <ExcelColumn label="FIRMCODE" value="firmcode" />
              </ExcelSheet>
            </ExcelFile>
            <Row className="addBtn">
              <ColResult>
                <button className="addBtn" onClick={handleAddList}>
                  목록에 추가하기
                </button>
                <button className="addBtn" onClick={findMoreCodes}>
                  더 찾아보기
                </button>
              </ColResult>
            </Row>
          </>
        )}
        <hr />
      </Codelookup>
      {secondModal && (
        <SecondModal
          secondModal={secondModal}
          modalCount={modalCount}
          handleSecondModal={handleSecondModal}
          handleModalCount={handleModalCount}
        />
      )}
    </Modal>
  );
};

export default CodeLookup;

const Modal = styled.div`
  ${ModalStyle}
`;

const Codelookup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 960px;
  height: 640px;
  padding: 30px 45px;
  background-color: #fff;
  overflow-y: auto;
  transform: translate(-50%, -50%);

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
      transition: color 0.5s ease;
    }
  }

  hr {
    margin: 19px 0;
    border: 0;
    border-top: 1px solid #ddd;
  }

  .exportData {
    display: flex;
    justify-content: flex-end;
    margin-top: 30px;
    color: #0e76bc;
    transition: color 0.5s ease;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const TitleBox = styled.div`
  margin: 0 -15px;
`;

const Title = styled.div`
  position: relative;
  min-height: 1px;
  padding: 0 15px;

  h3 {
    margin: 0 0 11.5px;
    font-size: 22px;
    font-weight: 600;
    letter-spacing: 1px;
    line-height: 30px;
    color: #010133;
    text-rendering: optimizeLegibility;
  }
`;

const SearchFormBox = styled.div`
  display: flex;
`;

const Row = styled.div`
  display: flex;
  margin: 0 -15px;

  &.addBtn {
    margin-top: 15px;
  }
`;

const Col = styled(Title)``;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const CodeSearchForm = styled.form`
  display: flex;
  width: 100%;

  input {
    display: block;
    width: 100%;
    height: 37px;
    padding: 8px 12px;
    font-size: 14px;
    line-height: 1.4;
    color: #000;
    border: 1px solid #ccc;
    background-color: #fff;
    outline: 0;
    transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;

    &:focus {
      box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
        0 0 8px rgba(102, 175, 233, 0.6);
      border-color: #66afe9;
    }
  }
`;

const InputGroupBtn = styled.span`
  position: relative;
  font-size: 0;
  white-space: nowrap;
  width: 1%;
  vertical-align: middle;

  ${ButtonStyle}
`;

const Colsmall = styled(Title)`
  margin-bottom: 30px;
  width: 33.33333%;

  p {
    margin: 0 0 11.5px;
    font-size: 16.5px;
    font-weight: 500;
    letter-spacing: 0.25px;
    line-height: 24px;
  }

  ol {
    margin-left: 15px;
    margin-bottom: 9.5px;
    font-size: 16.5px;
    font-weight: 500;
    letter-spacing: 0.25px;
    line-height: 24px;
    list-style-type: decimal;
  }
`;

const Panel = styled.div`
  margin-bottom: 19px;
  background-color: #fff;
  border: 1px solid #154281;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  transition: all 0.25s cubic-bezier(0.54, 0.06, 0.55, 0.97);

  &:hover {
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
  }
`;

const PanelHeader = styled.div`
  padding: 10px 15px;
  background-color: #154281;
  border-bottom: 1px solid #154281;
  color: #fff;
`;

const PanelBody = styled.div`
  padding: 15px;

  p {
    margin: 0 0 11.5px;
    font-size: 16.5px;
    font-weight: 500;
    letter-spacing: 0.25px;
    line-height: 24px;

    span {
      color: #0e76bc;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const ColResult = styled(Title)`
  width: 100%;

  p {
    margin: 0 0 11.5px;
    font-size: 1.4em;
    font-weight: bold;
    text-align: center;
    line-height: 24px;

    &.title {
      margin-left: -15px;
      font-size: 1.5em;
      color: #002c77;
      text-align: left;
    }
  }

  &.c-align {
    text-align: center;
  }

  img {
    vertical-align: middle;
  }

  span {
    padding: 8px 0;
    font-size: 1.5em;
    font-weight: bold;
    color: #002c77;
  }

  ${ButtonStyle}
  button {
    margin: 3px;
  }
`;

const ResultTable = styled.div`
  background-color: #f3f3f4;
  overflow: auto;
`;

const Base = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const ResultData = styled.div`
  background-color: #f3f3f4;
  z-index: 1;
`;

const ResultDataInner = styled.div`
  position: relative;
  max-height: 200px;
  overflow: auto;

  table {
    border-collapse: separate;
    table-layout: fixed;
    font-size: 0.8em;
    font-family: Verdana, Arial, sans-serif;

    th {
      position: sticky;
      top: 0;
      padding: 3px 6px 3px 4px;
      background-color: #cfdcee;
      border: 1px solid #000;
      border-bottom: 1px solid #000;
      border-right: none;
      white-space: nowrap;
      text-align: left;

      &.thCheck {
        width: 35px;
        height: 28px;
      }

      &.companyName {
        width: 33%;
      }

      &.general {
        width: 33%;
      }

      input {
        margin: 4px 0 0;
      }

      &:last-child {
        border-right: 1px solid #000;
      }
    }

    td {
      padding: 3px 6px 3px 4px;
      border: 1px solid #000;
      border-bottom: 1px solid #000;
      border-top: none;
      border-right: none;
      white-space: nowrap;
      text-align: left;

      &.thCheck {
        width: 35px;
        height: 28px;
      }

      &.companyName {
        width: 130px;
      }

      &.general {
        width: 116px;
      }

      input {
        margin: 4px 0 0;
      }

      &:last-child {
        border-right: 1px solid #000;
      }
    }
  }
`;
