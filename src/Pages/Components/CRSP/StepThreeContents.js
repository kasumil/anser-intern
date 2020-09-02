import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { STEPTHREE_CATEGORY, STEPTHREE_LIST } from "../../../config";
import SelectColumn from "./StepThreeSelect";
import SelectedColumn from "./StepThreeSelected";

const StepThreeContents = () => {
  const [categories, setCategories] = useState([]);
  const [clickCategory, setClickCetegory] = useState("SearchAll");
  const [selected, setSelected] = useState([]);
  const [arr, setArr] = useState([]);
  const [entire, setEntire] = useState([]);
  const tabRef = useRef(null);

  useEffect(() => {
    axios.get(STEPTHREE_CATEGORY).then((res) => {
      setCategories(res.data.categories);
    });

    axios.get(STEPTHREE_LIST).then((res) => {
      setArr(res.data.data);
      setEntire([...res.data.data]);
    });
  }, []);

  useEffect(() => {
    const selectedEl = selected.map((item) => {
      return item.name;
    });
    sessionStorage.setItem("selected", [...selectedEl]);
    // console.log(sessionStorage.getItem("selected").split(",")) : BE 보낼 때 양식
  }, [selected]);

  const filtered =
    clickCategory === "SearchAll"
      ? arr.sort(function (a, b) {
          return a.id > b.id ? 1 : a.id < b.id ? -1 : 0;
        })
      : arr
          .filter((item) => item.category === clickCategory)
          .sort(function (a, b) {
            return a.id > b.id ? 1 : a.id < b.id ? -1 : 0;
          });

  const filteredEntire = entire.filter(
    (item) => item.category === clickCategory
  );

  const goLeft = () => {
    tabRef.current.scrollTo(-200, 0);
  };

  const goRight = () => {
    tabRef.current.scrollTo(200, 0);
  };

  return (
    <>
      <TabTitle>
        <TabSlider ref={tabRef}>
          <button className="goLeft" onClick={() => goLeft()}>
            <i className="fas fa-angle-double-left" />
          </button>
          {categories.map((item) => {
            return (
              <TabCategory
                className={
                  clickCategory === `${item.category}` && clickCategory
                }
                onClick={() => {
                  setClickCetegory(`${item.category}`);
                }}
                key={item.id}
              >
                <h4>{item.category}</h4>
                {`${item.category}` === "SearchAll" && (
                  <span className="selectAllCount">
                    {selected.length}/{entire.length}
                  </span>
                )}
                {`${item.category}` === clickCategory &&
                  `${item.category}` !== "SearchAll" && (
                    <span className="tabCount">
                      {filteredEntire.length - filtered.length}/
                      {filteredEntire.length}
                    </span>
                  )}
              </TabCategory>
            );
          })}
          <button className="goRight" onClick={() => goRight()}>
            <i className="fas fa-angle-double-right" />
          </button>
        </TabSlider>
      </TabTitle>
      <TabContents>
        <SelectColumn
          filtered={filtered}
          arr={arr}
          setArr={setArr}
          selected={selected}
          setSelected={setSelected}
          clickCategory={clickCategory}
        />
        <SelectedColumn
          arr={arr}
          setArr={setArr}
          selected={selected}
          setSelected={setSelected}
        />
      </TabContents>
    </>
  );
};
export default StepThreeContents;

const TabTitle = styled.div`
  position: relative;

  button {
    position: absolute;
    top: 10px;
    width: 20px;
    height: 60%;
    padding: 0 5px;
    opacity: 0.1;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    outline: none;
    cursor: pointer;

    i {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    &:hover {
      opacity: 0.8;
    }
  }

  .goLeft {
    left: 10px;
  }

  .goRight {
    right: 10px;
  }
`;

const TabSlider = styled.ul`
  display: flex;
  color: white;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border: 1px solid #002c77;
  border-bottom: none;
  background: #002c77;
  overflow: hidden;
  overflow-x: scroll;
  scroll-behavior: smooth;

  ::-webkit-scrollbar {
    display: none;
  }

  .SearchAll,
  .Identifying,
  .TimeSeries,
  .Distribution {
    color: #002c77;
    background-color: white;
  }

  i {
    position: absolute;
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
    transition: 0.7s;
    border-right: 1px solid white;
  }

  h4 {
    display: inline-block;
    margin-left: 10px;
    width: 200px;
  }

  span {
    margin-left: 10px;
    padding: 2px 5px;
    border-radius: 10px;
  }

  .selectAllCount {
    font-size: 14px;
    color: #002c77;
    background-color: white;
    border: 1px solid #002c77;
  }

  .tabCount {
    font-size: 12px;
    color: white;
    background-color: #002c77;
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
