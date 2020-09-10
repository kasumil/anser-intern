import React, { useState } from "react";
import styled from "styled-components";
import {
  StepThreeColumnFrameStyle,
  EachVariableStyle,
} from "../../../Styles/style";
const SelectColumn = ({ filtered, arr, setArr, selected, setSelected }) => {
  const [infoModal, setInfoModal] = useState(false);
  const handleSelected = ({ item }) => {
    const selectArr = [...arr];
    selectArr.splice(arr.indexOf(item), 1);
    setArr(selectArr);
    setSelected([...selected, item]);
  };
  return (
    <SelectColumnFrame>
      <ColumnFrame>
        <h3>변수 추가하기</h3>
        <button
          onClick={() => {
            setArr([...arr.filter((e) => !filtered.includes(e))]);
            setSelected([...new Set([...selected, ...filtered])]);
          }}
        >
          모두 선택하기
        </button>
      </ColumnFrame>
      <List>
        {filtered.map((item, idx) => {
          return (
            <EachVariable
              key={idx}
              onClick={() => {
                handleSelected({ item });
              }}
            >
              <div>
                <i className="far fa-check-circle" />
                <p>{item.name}</p>
              </div>
              <i
                key={idx}
                onClick={(event) => {
                  event.stopPropagation();
                  setInfoModal(!infoModal);
                }}
                className="fas fa-question-circle"
              />
            </EachVariable>
          );
        })}
      </List>
      {infoModal && (
        <>
          <InfoModalFrame onClick={() => setInfoModal(!infoModal)} />
          <InfoModal>
            <div>
              <h5>What Does It Mean?</h5>
              <i
                onClick={() => setInfoModal(false)}
                className="far fa-times-circle"
              />
            </div>
            <ColumnTable>
              {arr.map((item) => {
                return (
                  <li key={item.name}>
                    {item.name} : {item.kor}
                  </li>
                );
              })}
            </ColumnTable>
          </InfoModal>
        </>
      )}
    </SelectColumnFrame>
  );
};
export default SelectColumn;
const SelectColumnFrame = styled.section`
  margin: 10px;
  border-radius: 10px;
  border: 2px solid #ddd;
`;
const ColumnFrame = styled.div`
  ${StepThreeColumnFrameStyle}
`;
const List = styled.ul`
  padding: 15px;
  overflow-y: scroll;
`;
const EachVariable = styled.li`
  justify-content: space-between;
  ${EachVariableStyle}
  div {
    display: flex;
  }
  i {
    margin: 0 10px;
    color: #888;
    cursor: pointer;
    z-index: 2;
    &:hover {
      color: #444;
    }
  }
`;
const InfoModalFrame = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
`;
const InfoModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 480px;
  height: auto;
  padding: 25px;
  color: #333;
  background-color: white;
  border: 1px solid #ddd;
  z-index: 3;
  div {
    display: flex;
    justify-content: space-between;
    align-items: start;
    margin-bottom: 10px;
    z-index: 3;
    h5 {
      font-size: 20px;
      font-weight: 700;
      z-index: 3;
    }
    i {
      color: #ddd;
      cursor: pointer;
      &:hover {
        color: #444;
      }
    }
  }
  p {
    line-height: 1.3;
  }
`;
const ColumnTable = styled.ul`
  display: flex;
  flex-direction: column;
  height: auto;
  line-height: 1.4;
`;