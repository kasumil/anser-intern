import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { CORPLIST } from "../../../config";
import SomethingHere from "./SomethingHere";
import SmallTableData from "./SmallTableData";

const SmallCRSP = () => {
  const searchValue = "contains";
  const [value, setValue] = useState("");
  const [resultValue, setResultValue] = useState("");
  const [data, setData] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [checked, setChecked] = useState([]);
  const [allChecked, setAllChecked] = useState(false);
  const focusTarget = useRef();
  const history = useHistory();

  useEffect(() => {
    focusTarget.current.focus();
  }, []);

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
          search_type: searchValue,
        })
        .then((res) => {
          setData(res.data.data);
          setIsLoading(false);
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

  const checkAllItem = () => {
    !allChecked
      ? setChecked(
          data.map((item) => {
            return item.corp_code;
          })
        )
      : setChecked([]);
  };

  const goToCRSP = () => {
    sessionStorage.setItem("corp_code", checked);
    history.push("/CRSP");
  };

  return (
    <SmallCRSPFrame>
      <SomethingHere />
      <SmallCRSPSearchFrame>
        <SmallCRSPContent>
          <SearchForm onSubmit={handleSubmit}>
            <InputText>
              <i className="fas fa-search" />
              <input
                type="text"
                placeholder="검색어를 입력해주세요"
                value={value}
                ref={focusTarget}
                onChange={handleInput}
              />
            </InputText>
            <button>검색하기</button>
          </SearchForm>
          <ResultSection>
            <h3>검색결과</h3>
            {!isSubmit ? (
              <ColResult>
                <p className="c-align v-align">
                  아직 검색을 하지 않으셨네요!
                </p>
              </ColResult>
            ) : (
              <ColResult>
                <ColResult className="c-align">
                  {isSubmit && isLoading ? (
                    <div>
                      <p className="c-align v-align">
                        <img alt="loading" src="/images/loading.gif" />
                        검색 중...
                      </p>
                    </div>
                  ) : (
                    <>
                      <span>
                        {data.length} results found that {searchValue} "
                        {resultValue}"
                      </span>
                      <table>
                        <thead>
                          <tr>
                            <th>
                              <input
                                type="checkbox"
                                onChange={() => {
                                  setAllChecked(!allChecked);
                                  checkAllItem();
                                }}
                                checked={checked.length === data.length}
                              />
                            </th>
                            <th>CORP_CODE</th>
                            <th>CORP_NAME</th>
                            <th>STOCK_CODE</th>
                            <th>FIRMCODE</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.map((el, i) => {
                            return (
                              <SmallTableData
                                key={i}
                                idx={i}
                                data={el}
                                checked={checked}
                                setChecked={setChecked}
                              />
                            );
                          })}
                        </tbody>
                      </table>
                    </>
                  )}
                </ColResult>
              </ColResult>
            )}
          </ResultSection>
          <button onClick={() => goToCRSP()}>Go To CRSP</button>
        </SmallCRSPContent>
      </SmallCRSPSearchFrame>
    </SmallCRSPFrame>
  );
};

export default SmallCRSP;

const SmallCRSPFrame = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  border: 1px solid #888;
  border-radius: 10px;
`;

const SmallCRSPSearchFrame = styled.div`
  padding: 20px;
  width: 560px;
`;

const SmallCRSPContent = styled.div`
  margin: 0 auto;

  button {
    width: 100%;
    height: 36px;
    background-color: #f7f7f7;
    border: 1px solid #888;
    border-radius: 18px;
    cursor: pointer;
    outline: none;
  }
`;

const SearchForm = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 48px;
  border: 1px solid #888;
  border-radius: 24px;

  button {
    width: 128px;
    height: 48px;
    line-height: 48px;
    font-size: 16px;
    color: white;
    background-color: #888;
    border-radius: 24px;
    border: transparent;
    cursor: pointer;
  }
`;

const InputText = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  i {
    padding: 15px;
    color: #888;
    font-size: 20px;
    cursor: pointer;
  }

  input {
    display: inline-block;
    margin-right: 10px;
    width: 320px;
    height: 100%;
    font-size: 16px;
    border: transparent;
    background-color: transparent;
    outline: none;
  }
`;

const ResultSection = styled.section`
  margin-top: 10px;
  padding: 20px;
  height: 240px;
  overflow-y: scroll;

  h3 {
    font-size: 20px;
    color: #888;
  }

  p {
    font-weight: 400;
    font-size: 20px;
  }
`;

const ColResult = styled.div`
  font-size: 14px;
  font-weight: 500;

  th {
    margin-top: 5px;
    padding: 3px;
    width: 25%;
    border: 1px solid #888;
  }

  img {
    width: 25px;
  }

  .c-align {
    color: #888;
    text-align: center;
  }

  .v-align {
    line-height: 9;
  }
`;
