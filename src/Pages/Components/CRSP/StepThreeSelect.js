import React, { useState } from "react";
import styled from "styled-components";

const SelectColumn = ({ columns, setColumns, selected, setSelected }) => {
  const [infoModal, setInfoModal] = useState(false);
  const filterd = columns.filter((item) => !selected.includes(item));

  return (
    <SelectColumnFrame>
      <ColumnFrame>
        <h3>Select</h3>
        <button
          onClick={() => {
            setColumns([]);
            setSelected([...selected, ...columns]);
          }}
        >
          SELECT ALL
        </button>
      </ColumnFrame>
      <List>
        {filterd.map((item, idx) => {
          return (
            <EachVariable
              key={idx}
              onClick={() => {
                columns.splice(columns.indexOf(item), 1);
                setSelected([...new Set([...selected, item])]);
              }}
            >
              <div>
                <i className="far fa-check-circle" />
                <p>{item}</p>
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
              {columns.map((item) => {
                return <li key={item}>{item} : </li>;
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

const EachVariable = styled.li`
  display: flex;
  justify-content: space-between;
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

const ColumnTable = styled.section`
  display: flex;
  flex-direction: column;
  height: auto;
  line-height: 1.4;
`;
