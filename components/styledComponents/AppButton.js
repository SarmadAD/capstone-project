import styled from "styled-components";

export const AppButton = styled.button`
  background: #9e94d6;
  border: 1px solid #ffffff;
  color: #ffffff;
  border-radius: 19px;
  padding: 1em;
  margin-top: 0.5em;
  font-family: Roboto;
  :active {
    background-color: rgb(101, 95, 138);
  }
  :disabled {
    background-color: grey;
  }
`;
