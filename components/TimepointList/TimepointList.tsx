import styled from "styled-components";
import { VerticalTimeline } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { TimepointModel } from "../../model/TimepointModel";
import React from "react";
import Timepoint from "../Timepoint/Timepoint";

export default function TimepointList({ listOfTimepoints }) {
  return (
    <TimepointListContainer>
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
