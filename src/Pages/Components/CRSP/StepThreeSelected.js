import React from "react";
import styled from "styled-components";
import {
  StepThreeColumnFrameStyle,
  EachVariableStyle,
} from "../../../Styles/style";

const SelectedColumn = ({ arr, setArr, selected, setSelected }) => {
  const handleSelected = ({ item }) => {
    setArr([...arr, item]);
    const selectedArr = [...selected];
    selectedArr.splice(selected.indexOf(item), 1);
    setSelected(selectedArr);
  };

  return (
    <SelectedColumnFrame>
      <ColumnFrame>
        <h3>선택된 변수</h3>
        <button
          onClick={() => {
            setArr([...arr, ...selected]);
            setSelected([]);
          }}
        >
          모두 제거하기
        </button>
      </ColumnFrame>
      <List>
        {selected.map((item) => {
          return (
            <Variables key={item.name}>
              <EachVariable
                onClick={() => {
                  handleSelected({ item });
                }}
              >
                <i className="fas fa-check-circle" />
                <span>{item.name}</span>
              </EachVariable>
            </Variables>
          );
        })}
      </List>
    </SelectedColumnFrame>
  );
};

export default SelectedColumn;

const SelectedColumnFrame = styled.section`
  border-radius: 10px;
  border: 2px solid #ddd;
  margin: 10px 10px 10px 0;
`;

const ColumnFrame = styled.div`
  ${StepThreeColumnFrameStyle}
`;

const List = styled.ul`
  padding: 15px;
  overflow-y: scroll;
`;

const Variables = styled.ul`
  width: 100%;

  h4 {
    padding: 15px;
    font-size: 20px;
  }
`;

const EachVariable = styled.li`
  ${EachVariableStyle}

  i {
    margin: 0 10px;
    color: green;
  }
`;
