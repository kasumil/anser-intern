import React from "react";
import styled from "styled-components";

const GoToTop = () => {
  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <GoToTopFrame onClick={() => goToTop()}>
      <i className="fas fa-angle-up" />
    </GoToTopFrame>
  );
};
export default GoToTop;

const GoToTopFrame = styled.button`
  position: fixed;
  top: 80%;
  right: 10px;
  width: 32px;
  height: 32px;
  border: 1px solid #ddd;
  background-color: white;
  outline: none;
  cursor: pointer;
  opacity: 0.4;

  &:hover {
    opacity: 0.8;
  }

  i {
    margin: 0 auto;
  }
`;
