import { VerticalTimeline } from "react-vertical-timeline-component";
import { TimepointModel } from "../../model/TimepointModel";
import styled from "styled-components";
import "react-vertical-timeline-component/style.min.css";
import React from "react";
import Timepoint from "../Timepoint/Timepoint";

export default function TimepointList({
  listOfTimepoints,
  setEditTimepointMode,
  setDeleteTimepointMode,
  setCurrentTimepoint,
  openModal,
  readOnlyMode,
}) {
  return (
    <TimepointListContainer>
      <VerticalTimeline layout={"1-column-left"}>
        {listOfTimepoints.map((timepoint: TimepointModel) => (
          <Timepoint
            key={timepoint._id}
            timepoint={timepoint}
            setEditTimepointMode={setEditTimepointMode}
            setCurrentTimepoint={setCurrentTimepoint}
            openModal={openModal}
            setDeleteTimepointMode={setDeleteTimepointMode}
            readOnlyMode={readOnlyMode}
          />
        ))}
      </VerticalTimeline>
    </TimepointListContainer>
  );
}

const TimepointListContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* border: 1px solid red; */
  align-items: center;
  .vertical-timeline-element-date {
    display: none;
  }
`;
