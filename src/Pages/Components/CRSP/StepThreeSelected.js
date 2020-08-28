import React from "react";
import styled from "styled-components";

const SelectedColumn = ({
  arr,
  setArr,
  selected,
  setSelected,
  clickCategory,
}) => {
  return (
    <SelectedColumnFrame>
      <ColumnFrame>
        <h3>Selected</h3>
        <button
          onClick={() => {
            setArr([...arr, ...selected]);
            setSelected([]);
          }}
        >
          CLEAR ALL
        </button>
      </ColumnFrame>
      <List>
        {selected.map((item) => {
          return (
            <Variables key={item.name}>
              <EachVariable
                onClick={() => {
                  setArr([...arr, item]);
                  selected.splice(selected.indexOf(item), 1);
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px 30px;
  border-bottom: 1px solid #ddd;

  h3 {
    font-weight: 600;
  }

  button {
    opacity: 0.4;
    color: #333;
    padding: 0 4px;
    background-color: transparent;
    border: 1px solid #ddd;
    outline: none;
    cursor: pointer;

    &:hover {
      opacity: 1;
      border-radius: 5px;
    }
  }
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
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px dotted #ddd;
  cursor: pointer;
  animation: slidein 1s;

  @keyframes slidein {
    from {
      opacity: 0;
      margin-top: 20px;
    }

    to {
      opacity: 1;
      margin-top: 0px;
    }
  }

  i {
    margin: 0 10px;
    color: green;
  }
`;
