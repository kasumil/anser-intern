import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const Card = ({ id, image, title, content }) => {
  const history = useHistory();

  return (
    <CardFrame onClick={() => history.push(`/id${id}`)}>
      <img alt="CardImg" src={image} />
      <CardTitle>
        <h2>{title}</h2>
        <i className="fas fa-angle-right" />
      </CardTitle>
      <p>{content.substring(0, 40) + "..."}</p>
    </CardFrame>
  );
};

export default Card;

const CardFrame = styled.div`
  position: relative;
  height: 360px;
  border: 1px solid #ddd;
  border-radius: 10px;
  cursor: pointer;
  opacity: 0.95;

  &:hover {
    opacity: 1;
    border: 1px solid #888;
  }

  img {
    margin: 5%;
    width: 90%;
    border-radius: 10px;
  }

  p {
    margin: 5%;
    color: #888;
  }
`;

const CardTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0px 6%;

  h2 {
    font-size: 24px;
  }
`;
