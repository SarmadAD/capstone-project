import styled from "styled-components";
import TimePointList from "../components/TimePointList";
import { timepoints } from "../db";

export default function Home() {
  const textForNoTimepoints = "Füge Timepoints hinzu, um deine Timeline zu erstellen";
  return (
    <HomeContainer>
      {timepoints.length > 0 ? <TimePointList listOfTimepoints={timepoints} /> : <p>{textForNoTimepoints}</p>}
      <div>+</div>
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  p{
    text-align: center;
    font-size: 2.5em;
  }
`;
