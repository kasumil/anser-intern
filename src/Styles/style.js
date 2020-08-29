import { css } from "styled-components";

export const ModalStyle = css`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 10001;
  opacity: 1;
  animation: opacity 0.15s linear;

  @keyframes opacity {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const ButtonStyle = css`
  button {
    display: inline-block;
    position: relative;
    padding: 8px 12px;
    font-size: 14px;
    line-height: 1.4;
    text-align: center;
    color: #fff;
    vertical-align: middle;
    border: 1px solid #11376b;
    background-color: #154281;
    user-select: none;
    outline: 0;
    cursor: pointer;
    transition: all 0.25s cubic-bezier(0.54, 0.06, 0.55, 0.97);

    &:hover {
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
      background-color: #0e2c55;
      border-color: #091c36;
    }
  }
`;

export const StepThreeColumnFrameStyle = css`
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

export const EachVariableStyle = css`
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
`;
