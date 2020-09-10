import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import CodeLookup from "./CodeLookup";

const Search = () => {
  const [modal, setModal] = useState(false);
  const [fileName, setFileName] = useState("");
  const [checkedData, setCheckedData] = useState(
    sessionStorage.getItem("corp_code") || []
  );

  const handleFileUpload = (e) => {
    setFileName(e.target.files[0].name);
  };

  const handleModal = () => {
    setModal(!modal);
    if (!modal) {
      setCheckedData([]);
    }
  };

  const handleSearchAll = (e) => {
    sessionStorage.setItem("selected_all", e.target.value);
  };

  return (
    <>
      <FormInline>
        <Title>
          <p>종목코드의 종류를 선택하세요.</p>
        </Title>
        <FormGroup className="right">
          <FormRadio>
            <RadioBtnBox>
              <label>
                <input
                  type="radio"
                  name="options"
                  value="all"
                  onClick={handleSearchAll}
                />
              </label>
              <span>전체 데이터베이스에서 탐색</span>
            </RadioBtnBox>
            <InputNote>
              <small>
                <p>주의→ 이 방법은 시간이 오래 걸릴 수 있습니다.</p>
              </small>
            </InputNote>
          </FormRadio>
        </FormGroup>
        <FormGroup>
          <FormRadio>
            <RadioBtnBox>
              <label>
                <input type="radio" name="options" value="company" />
              </label>
            </RadioBtnBox>
            <InputBox
              type="text"
              placeholder="종목코드"
              defaultValue={checkedData}
            />
            <InputNote>
              <small>
                <p>기업 코드를 공백으로 구분하여 입력해 주세요.</p>
                <p>
                  예) 삼성전자, 현대자동차, 엘지전자 [{" "}
                  <span onClick={handleModal}>종목코드 검색</span> ]
                </p>
              </small>
            </InputNote>
          </FormRadio>
        </FormGroup>
        <FormGroup>
          <FormRadio>
            <RadioBtnBox>
              <label>
                <input type="radio" name="options" value="file" />
              </label>
            </RadioBtnBox>
            <InputGroup>
              <span className="inputGroupBtn">
                <span className="btnBox">
                  <FontAwesomeIcon icon={faFolderOpen} /> 찾기
                  <input
                    type="file"
                    name="options"
                    multiple
                    className="fileUpload"
                    onChange={handleFileUpload}
                  />
                </span>
              </span>
              <InputBox
                type="text"
                placeholder={fileName ? `${fileName}` : "선택된 파일 없음"}
                readOnly
                name="options"
                className="fileName"
              />
            </InputGroup>
            <InputNote>
              <small>
                <p>
                  한 줄당 하나의 종목이 있는 텍스트 파일(.txt)을
                  <br />
                  업로드해 주세요.
                </p>
              </small>
            </InputNote>
          </FormRadio>
        </FormGroup>
        <FormGroup>
          <FormRadio>
            <RadioBtnBox>
              <label>
                <input type="radio" name="options" value="select" />
              </label>
            </RadioBtnBox>
            <InputBox as="select">
              <option>---------저장된 종목코드 리스트---------</option>
            </InputBox>
            <InputNote>
              <small>
                <p>저장한 종목코드 리스트 중에 선택하세요.</p>
              </small>
            </InputNote>
          </FormRadio>
        </FormGroup>
      </FormInline>
      {modal && (
        <CodeLookup handleModal={handleModal} setCheckedData={setCheckedData} />
      )}
    </>
  );
};

export default Search;

const FormInline = styled.form`
  margin: 0 -15px 30px -15px;

  &::before {
    content: " ";
    display: table;
  }
`;

const Title = styled.div`
  position: relative;
  padding: 0 15px;
  margin-bottom: 0;
  width: 100%;
  min-height: 1px;

  p {
    margin: 0 0 11.5px;
    font-size: 18px;
    line-height: 26px;
  }
`;

const FormGroup = styled(Title)`
  width: 50%;
  margin-bottom: 30px;

  &.right {
    float: right;
  }
`;

const FormRadio = styled.div`
  display: inline-block;
  width: 100%;
  vertical-align: middle;

  &::before {
    content: " ";
    display: table;
  }
`;

const RadioBtnBox = styled.div`
  position: relative;
  display: inline-block;
  padding: 2px 5px 0;
  min-height: 28px;
  font-size: 14px;

  label {
    position: relative;
    display: inline-block;
    padding: 2px 5px 0;
    max-width: 100%;
    vertical-align: middle;
    font-size: 14px;
    cursor: pointer;

    input {
      position: relative;
      margin: 1px 0 0 0;
      outline: 0;
    }
  }

  span {
    margin-left: 8px;
    font-size: 16px;
    vertical-align: bottom;
  }
`;

const InputBox = styled.input`
  display: inline-block;
  width: 90%;
  height: 37px;
  padding: 8px 12px;
  vertical-align: middle;
  font-size: 14px;
  line-height: 1.4;
  border: 1px solid #ccc;
  background-color: #fff;
  color: #000;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.07);

  &:focus {
    border-color: #66afe9;
    outline: 0;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
      0 0 8px rgba(102, 175, 233, 0.6);
  }

  &:disabled {
    background-color: #eee;
    opacity: 1;
    cursor: not-allowed;

    &::placeholder {
      color: #999;
    }
  }

  &::after {
    content: " ";
    display: table;
  }

  &.fileName {
    width: 100%;
    background-color: #eee;

    &::placeholder {
      color: #000;
    }
  }

  &::placeholder {
    color: #999;
  }
`;

const InputNote = styled.div`
  margin-top: 5px;
  padding-left: 35px;

  small {
    font-style: italic;
    letter-spacing: -0.15px;
    color: #686868;

    p {
      margin: 0;
      font-size: 90%;

      span {
        font-size: 12px;
        color: #0e76bc;
        cursor: pointer;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`;

const InputGroup = styled.div`
  position: relative;
  display: inline-table;
  width: 90%;
  vertical-align: middle;
  border-collapse: separate;

  .inputGroupBtn {
    display: table-cell;
    position: relative;
    width: 20%;
    font-size: 0;
    white-space: nowrap;
    vertical-align: middle;

    .btnBox {
      display: inline-block;
      position: relative;
      margin-right: -1px;
      padding: 8px 12px;
      border: 1px solid #0c67a4;
      background-color: #0e76bc;
      font-size: 14px;
      line-height: 1.4;
      text-align: center;
      color: #fff;
      vertical-align: middle;
      cursor: pointer;
      overflow: hidden;
      transition: all 0.25s cubic-bezier(0.54, 0.06, 0.55, 0.97);

      &:hover {
        z-index: 2;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        color: #fff;
        background-color: #0a588d;
        border-color: #08436b;
      }

      .fileUpload {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        min-width: 100%;
        min-height: 100%;
        font-size: 100px;
        text-align: right;
        opacity: 0;
        outline: none;
        background: #fff;
        cursor: inherit;
      }
    }
  }
`;
