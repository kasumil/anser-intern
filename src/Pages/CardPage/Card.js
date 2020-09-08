import React from "react";
import styled from "styled-components";

const Card = ({ image, title, content }) => {
  return (
    <CardFrame>
      <img alt="CardImg" src={image} />
      <h2>{title}</h2>
      <p>{content}</p>
      <i className="fas fa-angle-right" />
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

  h2 {
    margin-left: 5%;
    font-size: 24px;
  }

  p {
    margin: 5%;
    color: #888;
  }

  i {
    position: absolute;
    bottom: 5%;
    right: 5%;
  }
`;
