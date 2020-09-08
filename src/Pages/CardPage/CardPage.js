import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { API } from "../../config";
import Card from "./Card";

const CardPage = () => {
  const [cardList, setCardList] = useState([]);
  const [cardCategory, setCardCategory] = useState("AllCategory");

  useEffect(() => {
    axios({
      method: "POST",
      url: `${API}content/`,
    }).then((res) => setCardList(res.data.data));
  }, []);

  const filtered =
    cardCategory === "AllCategory"
      ? cardList
      : cardList.filter((item) => item.category === cardCategory);

  const handleCategory = (item) => {
    setCardCategory(item);
  };

  const setList = cardList.map((item) => {
    return item.category;
  });

  return (
    <CardPageFrame>
      <Title>
        <h1>List Title</h1>
      </Title>
      <CardCategory>
        <li onClick={() => setCardCategory("AllCategory")}>AllCategory</li>
        {[...new Set(setList)].map((item) => {
          return (
            <li
              key={item}
              className={item.category === cardCategory ? "clicked" : ""}
              onClick={() => handleCategory(item)}
            >
              {item}
            </li>
          );
        })}
      </CardCategory>
      <CardList>
        {filtered.map((item) => {
          return (
            <Card
              key={item.id}
              id={item.id}
              category={item.category}
              image={item.image}
              title={item.title}
              content={item.content}
            />
          );
        })}
      </CardList>
    </CardPageFrame>
  );
};

export default CardPage;

const CardPageFrame = styled.div`
  margin: 0 auto;
  width: 1140px;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px 0 30px;

  h1 {
    font-size: 48px;
  }
`;

const CardCategory = styled.ul`
  display: flex;
  margin-bottom: 20px;
  border: 1px solid #777;
  border-radius: 10px;

  li {
    width: 200px;
    padding: 10px;
    text-align: center;
    cursor: pointer;

    &:hover {
      border-radius: 10px;
      background-color: #ddd;
    }
  }
`;

const CardList = styled.section`
  margin-bottom: 40px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 15px;
`;
