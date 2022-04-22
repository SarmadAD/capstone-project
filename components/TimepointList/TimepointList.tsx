import { VerticalTimeline } from "react-vertical-timeline-component";
import { TimepointModel } from "../../model/TimepointModel";
import styled from "styled-components";
import "react-vertical-timeline-component/style.min.css";
import React from "react";
import Timepoint from "../Timepoint/Timepoint";
import { motion } from "framer-motion";

export default function TimepointList({
  listOfTimepoints,
  setEditTimepointMode,
  setDeleteTimepointMode,
  setCurrentTimepoint,
  openModal,
  readOnlyMode,
}) {
  const myVariants = {
    initial: {
      opacity: 0,
    },
    default: {
      y: 0,
      scale: 1,
      rotate: "0",
      opacity: 1,
      transition: { staggerChildren: 0.8 },
    },
    exit: {
      y: -100,
      opacity: 0,
      rotate: "45deg",
      transition: { staggerChildren: 0.8 },
    },
  };
  return (
    <TimepointListContainer variants={myVariants} initial="initial" animate="default" exit="exit">
      <VerticalTimeline layout={"1-column-left"} animate={false}>
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

const TimepointListContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 500ms ease-in-out;
  transform-origin: 0% 0%;
  .vertical-timeline-element-date {
    display: none;
  }
  .vertical-timeline-element-content {
    width: auto;
  }
`;
