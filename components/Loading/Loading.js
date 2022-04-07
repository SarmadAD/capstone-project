import styled from "styled-components";

export const Loading = () => (
  <StyledObject type="image/svg+xml" data="/SVG/loadingcapstone.svg" aria-labelledby="loading">
    loading-animation
  </StyledObject>
);

export default Loading;

const StyledObject = styled.object`
  @media only screen and (max-width: 576px) {
    width: 100%;
  }
  @media only screen and (min-width: 576px) {
    width: 50%;
  }
  @media only screen and (min-width: 768px) {
    width: 50%;
  }
  @media only screen and (min-width: 1200px) {
    width: 30%;
  }
`;
