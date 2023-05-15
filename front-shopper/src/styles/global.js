import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 62.5%;
  }

  body {
    background-color: #E8F9F3;
    color: #03030B;
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button, label {
    font-family: 'Montserrat', sans-serif;
    font-size: 1.6rem;
  }

  button {
    cursor: pointer;
    transition: filter 0.2s;
  }

  button:hover {
    filter: brightness(0.8);
  }
`;