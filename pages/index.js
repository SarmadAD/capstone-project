import Image from "next/image";
import styled from "styled-components";
import TimepointList from "../components/TimepointList/TimepointList";
import { timepoints } from "../db";

export default function Home() {
  const textForNoTimepoints = "Füge Timepoints hinzu, um deine Timeline zu erstellen";
  return (
    <HomeContainer>
      {timepoints.length > 0 ? <TimepointList listOfTimepoints={timepoints} /> : <p>{textForNoTimepoints}</p>}
      {/* <Image src={"/components/SVG/loadingcapstone.svg"} alt="schade" width={100} height={100} /> */}
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  p {
    text-align: center;
    font-size: 2.5em;
  }
`;
