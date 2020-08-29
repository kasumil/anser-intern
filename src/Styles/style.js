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
