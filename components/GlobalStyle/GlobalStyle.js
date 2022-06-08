import { createGlobalStyle } from "styled-components";
import "react-widgets/styles.css";

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  :root {
    font-family: Roboto;
  }
  body{
    background-image: linear-gradient(
  170deg,
  hsl(249deg 18% 20%) 10%,
  hsl(249deg 18% 23%) 32%,
  hsl(249deg 18% 26%) 41%,
  hsl(249deg 18% 29%) 48%,
  hsl(249deg 18% 33%) 53%,
  hsl(249deg 18% 36%) 57%,
  hsl(249deg 18% 39%) 61%,
  hsl(249deg 18% 43%) 64%,
  hsl(249deg 18% 46%) 67%,
  hsl(249deg 18% 49%) 70%,
  hsl(249deg 20% 53%) 73%,
  hsl(249deg 24% 56%) 75%,
  hsl(249deg 27% 60%) 79%,
  hsl(249deg 32% 64%) 82%,
  hsl(249deg 37% 67%) 87%,
  hsl(249deg 45% 71%) 100%
);
    height: 100%;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
`;
