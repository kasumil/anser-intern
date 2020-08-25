import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import SelectColumn from "./StepThreeSelect";
import SelectedColumn from "./StepThreeSelected";

const StepThree = () => {
  const [showHowWorks, setShowHowWorks] = useState(false);
  const [categories, setCategories] = useState([]);
  const [clickCategory, setClickCetegory] = useState("selectAll");
  const [selected, setSelected] = useState([]);
  const [columns, setColumns] = useState([]);

  const handleHowItWorks = () => {
    setShowHowWorks(!showHowWorks);
  };

  useEffect(() => {
    axios.get("/data/crsptab.json").then((res) => {
      setCategories(res.data.categories);
      switch (clickCategory) {
        case "Identifying Information":
          setColumns(res.data.Identifying[0].variable_eng);
          break;
        case "Time Series Information":
          setColumns(res.data.Time[0].variable_eng);
          break;
        case "Distribution Information":
          setColumns(res.data.Distribution[0].variable_eng);
          break;
        default:
          setColumns([
            ...res.data.Identifying[0].variable_eng,
            ...res.data.Time[0].variable_eng,
            ...res.data.Distribution[0].variable_eng,
          ]);
      }
    });
  }, [clickCategory]);

  return (
    <StepThreeFrame>
      <TitleFrame>
        <h3>
          <strong>Step 3</strong>: Query Variables.
        </h3>
        <h4 className="howItWorks" onClick={handleHowItWorks}>
          <i className="far fa-question-circle" />
          How does this work?
        </h4>
      </TitleFrame>
      {showHowWorks && (
        <HowItWorksModal>
          <p>
            The purpose of the variable selector is to make it easier to manage
            the many variables that you frequently need to navigate in order to
            make a WRDS Query.
          </p>
          <p>
            <strong>To add items</strong>
            <li>Check the item in the list on the left.</li>
            <li>
              Alternately, you can just check all of the items with the "Check
              All" option.
            </li>
            <strong>To remove items</strong>
            <li>Uncheck the item in the list on the left. </li>
            <li>Or uncheck the item in the list on the right.</li>
            <li>
              Alternately, you can just uncheck all of the items with the
              "Uncheck All" option.
            </li>
          </p>
        </HowItWorksModal>
      )}
      <TabSlider>
        <TabCategory
          onClick={() => {
            setClickCetegory("");
          }}
        >
          <i className="fas fa-search" />
          <h4>Search All</h4>
          <span>
            {selected.length}/{columns.length}
          </span>
        </TabCategory>
        {categories.map((item) => {
          return (
            <TabCategory
              onClick={() => {
                setClickCetegory(`${item.category}`);
              }}
              key={item.id}
            >
              <h4>{item.category}</h4>
            </TabCategory>
          );
        })}
      </TabSlider>
      <TabContents>
        <SelectColumn
          selected={selected}
          setSelected={setSelected}
          columns={columns}
          setColumns={setColumns}
        />
        <SelectedColumn
          selected={selected}
          setSelected={setSelected}
          columns={columns}
          setColumns={setColumns}
        />
      </TabContents>
    </StepThreeFrame>
  );
};

export default StepThree;

const StepThreeFrame = styled.div`
  font-family: arial;

  h3 {
    font-size: 20px;

    strong {
      font-weight: 800;
    }
  }
`;

const TitleFrame = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .howItWorks {
    padding: 10px;
    color: #002c77;
    text-decoration: underline;
    cursor: pointer;

    i {
      margin-right: 10px;
    }
  }
`;

const HowItWorksModal = styled.div`
  margin: 0 auto 10px;
  padding: 20px;
  width: 100%;
  height: auto;
  background-color: white;
  border: 1px solid #ddd;

  p {
    line-height: 1.3;

    strong {
      margin: 5px 0;
      font-weight: 700;
    }
  }
`;

const TabSlider = styled.ul`
  display: flex;
  width: 100%;
  color: white;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border: 1px solid #002c77;
  border-bottom: none;
  background: #002c77;
  overflow-x: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const TabCategory = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  font-size: 15px;
  background: #002c77;
  border-right: 1px solid white;
  cursor: pointer;

  &:hover {
    color: #002c77;
    background-color: white;
  }

  h4 {
    margin-left: 10px;
  }

  span {
    margin-left: 10px;
    padding: 2px 5px;
    font-size: 12px;
    color: #002c77;
    background-color: white;
    border-radius: 10px;
  }
`;

const TabContents = styled.div`
  display: flex;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border: 1px solid #002c77;
  border-top: none;
  height: 520px;

  section {
    display: flex;
    flex-direction: column;
    width: 50%;
  }
`;
