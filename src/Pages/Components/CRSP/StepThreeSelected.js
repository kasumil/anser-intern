import React from "react";
import styled from "styled-components";

const SelectedColumn = ({ selected, setSelected, columns, setColumns }) => {
  return (
    <SelectedColumnFrame>
      <ColumnFrame>
        <h3>Selected</h3>
        <button
          onClick={() => {
            setColumns([...new Set([...columns, ...selected])]);
            setSelected([]);
          }}
        >
          CLEAR ALL
        </button>
      </ColumnFrame>
      <List>
        {selected.map((item) => {
          return (
            <Variables key={item}>
              <EachVariable
                onClick={() => {
                  selected.splice(selected.indexOf(item), 1);
                  setColumns([...new Set([...columns, item])]);
                }}
              >
                <i className="fas fa-check-circle" />
                <span>{item}</span>
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
    color: #333;
    background-color: transparent;
    border-radius: 5px;
    border: 1px solid #ddd;
    outline: none;
    cursor: pointer;

    &:hover {
      background-color: #e6e6e6;
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
  }
`;
