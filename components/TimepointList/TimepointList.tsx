import { VerticalTimeline } from "react-vertical-timeline-component";
import { TimepointModel } from "../../model/TimepointModel";
import styled from "styled-components";
import "react-vertical-timeline-component/style.min.css";
import React from "react";
import Timepoint from "../Timepoint/Timepoint";

export default function TimepointList({ listOfTimepoints }) {
  return (
    <TimepointListContainer data-testid="timeline">
      <VerticalTimeline layout={"1-column-left"}>
        {listOfTimepoints.map((timepoint: TimepointModel) => (
          <Timepoint key={timepoint.id} timepoint={timepoint} />
        ))}
      </VerticalTimeline>
    </TimepointListContainer>
  );
}

const TimepointListContainer = styled.div`
  .vertical-timeline-element-date {
    display: none;
  }
`;
