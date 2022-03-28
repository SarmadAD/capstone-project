import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  :root {
    font-family: Roboto;
  }
  body{
    background-color: #2D2A3D;
  }
`;
