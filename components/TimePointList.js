import styled from "styled-components";
import { VerticalTimeline } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import Timepoint from "./Timepoint";

export default function TimepointList({ listOfTimepoints }) {
  return (
    <TimepointListContainer>
      <VerticalTimeline>
        {listOfTimepoints.map((timepoint) => (
          <Timepoint key={timepoint.id} timepoint={timepoint} />
        ))}
      </VerticalTimeline>
    </TimepointListContainer>
  );
}

const TimepointListContainer = styled.div``;
