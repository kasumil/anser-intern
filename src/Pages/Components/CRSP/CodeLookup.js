import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import ReactExport from "react-export-excel";
import { SEARCH_DATA } from "../../../config";
import TableData from "./TableData";
import SecondModal from "./SecondModal";
import { ModalStyle } from "../../../Styles/ModalStyle";
import { FirstParagraph, SecondParagraph } from "./CodeLookupText";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const CodeLookup = ({ handleModal }) => {
  const [value, setValue] = useState("");
  const [resultValue, setResultValue] = useState("");
  const [searchValue, setSearchValue] = useState("start with");
  const [data, setData] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [secondModal, setSecondModal] = useState(false);
  const [modalCount, setModalCount] = useState(1);
  const [allCheck, setAllCheck] = useState(false);
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
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setData([]);
    setIsLoading(true);
    if (value) {
      setIsSubmit(true);
      setResultValue(value);
      setTimeout(() => {
        axios.get(SEARCH_DATA).then((res) => {
          const filteredData = res.data.data.filter((el) => {
            return Object.values(el)
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase());
          });
          setData(filteredData);
          setIsLoading(false);
          focusResult.current.scrollIntoView({ behavior: "smooth" });
        });
      }, 1000);
    } else {
      e.preventDefault();
      setIsSubmit(false);
      alert("Please fill the form first!");
    }
  };

  const handleAllCheck = () => {
    setAllCheck(!allCheck);
  };

  const handleSearchValue = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  return (
    <Modal>
      <Codelookup>
        <i className="far fa-times-circle xBtn" onClick={handleModal} />
        <TitleBox>
          <Title>
            <h3>CRSP Daily Stock Code Lookup</h3>
          </Title>
        </TitleBox>
        <SearchFormBox>
          <Row>
            <Col>
              <FormGroup>
                <CodeSearchForm onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="Enter a company name here or identifier such as ticker:ibm"
                    value={value}
                    onChange={handleInput}
                    ref={focusTarget}
                  />
                  <InputGroupBtn>
                    <button onClick={handleSearchValue} value="start with">
                      Starts With
                    </button>
                    <button onClick={handleSearchValue} value="contains">
                      Contains
                    </button>
                    <button onClick={handleSearchValue} value="exactly match">
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
              <p>No results yet. Search for something!</p>
            </ColResult>
          ) : (
            <ColResult>
              <Row>
                <ColResult className="c-align">
                  {isSubmit && isLoading ? (
                    <div>
                      <p className="c-align">
                        <img alt="loading" src="/images/loading.gif" />
                        Search in progress...
                      </p>
                    </div>
                  ) : (
                    <>
                      <span ref={focusResult}>
                        {data.length} results found that {searchValue} "
                        {resultValue}"
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
                                        checked={allCheck}
                                      />
                                    </th>
                                    <th className="companyName">ENTITY_NAME</th>
                                    <th className="general">TICKER</th>
                                    <th className="general">CUSIP_FULL</th>
                                    <th className="general">PERMNO</th>
                                    <th className="general">PERMCO</th>
                                    <th className="general">FIRST_DATE</th>
                                    <th className="general">LAST_DATE</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {data.map((el, i) => {
                                    return (
                                      <TableData
                                        key={i}
                                        data={el}
                                        allCheck={allCheck}
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
                  <span>Export all results as a spreadsheet</span>
                </div>
              }
              filename={`CodeSearchResults ${new Date().toLocaleString()}`}
            >
              <ExcelSheet data={data} name="Codes">
                <ExcelColumn label="entity_name" value="ENTITY_NAME" />
                <ExcelColumn label="ticker" value="TICKER" />
                <ExcelColumn label="cusip_full" value="CUSIP_FULL" />
                <ExcelColumn label="permno" value="PERMNO" />
                <ExcelColumn label="permco" value="PERMCO" />
                <ExcelColumn label="first_date" value="FIRST_DATE" />
                <ExcelColumn label="last_date" value="LAST_DATE" />
              </ExcelSheet>
            </ExcelFile>
            <ColResult>
              <p className="title">Select Your Identifier</p>
            </ColResult>
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
  top: 10%;
  right: 25%;
  bottom: 10%;
  left: 25%;
  padding: 30px 45px;
  background-color: #fff;
  overflow-y: auto;

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

  button {
    display: inline-block;
    position: relative;
    padding: 8px 12px;
    font-size: 14px;
    line-height: 1.4;
    text-align: center;
    color: #fff;
    vertical-align: middle;
    border: 1px solid #11376b;
    background-color: #154281;
    user-select: none;
    outline: 0;
    cursor: pointer;
    transition: all 0.25s cubic-bezier(0.54, 0.06, 0.55, 0.97);

    &:hover {
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
      background-color: #0e2c55;
      border-color: #091c36;
    }
  }
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
  overflow: auto;

  p {
    margin: 0 0 11.5px;
    font-size: 1.4em;
    font-weight: bold;
    text-align: center;
    line-height: 24px;

    &.title {
      margin: 0;
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
