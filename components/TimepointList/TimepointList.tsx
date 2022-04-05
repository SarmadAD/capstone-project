import { VerticalTimeline } from "react-vertical-timeline-component";
import { TimepointModel } from "../../model/TimepointModel";
import styled from "styled-components";
import "react-vertical-timeline-component/style.min.css";
import React from "react";
import Timepoint from "../Timepoint/Timepoint";

export default function TimepointList({ listOfTimepoints, setEditTimepointMode, setDeleteTimepointMode, setCurrentTimepoint, openModal }) {
  return (
    <TimepointListContainer>
      <VerticalTimeline layout={"1-column-left"}>
        {listOfTimepoints.map((timepoint: TimepointModel) => (
          <Timepoint
            key={timepoint.id}
            timepoint={timepoint}
            setEditTimepointMode={setEditTimepointMode}
            setCurrentTimepoint={setCurrentTimepoint}
            openModal={openModal}
            setDeleteTimepointMode={setDeleteTimepointMode}
          />
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
