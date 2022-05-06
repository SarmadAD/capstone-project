import { VerticalTimeline } from "react-vertical-timeline-component";
import { TimepointModel } from "../../model/TimepointModel";
import styled from "styled-components";
import "react-vertical-timeline-component/style.min.css";
import React from "react";
import Timepoint from "../Timepoint/Timepoint";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";

export default function TimepointList({
  listOfTimepoints,
  setEditTimepointMode,
  setDeleteTimepointMode,
  setCurrentTimepoint,
  openModal,
  readOnlyMode,
}) {
  const textForNoTimepoints = "Keine Timeline hier...";
  const { data: session } = useSession();
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

  function sortTimepoints(a:TimepointModel, b:TimepointModel) {
    const date1 = Date.parse(a.date.toString());
    const date2 = Date.parse(b.date.toString());
    return date1 - date2;
  }

  const filterListOfTimepoints = listOfTimepoints
    .filter(
      (timepoint: TimepointModel) =>
        timepoint.visible || timepoint.userId === session.user.id
    )
    .sort(sortTimepoints);
  return (
    <TimepointListContainer
      variants={myVariants}
      initial="initial"
      animate="default"
      exit="exit"
    >
      {filterListOfTimepoints.length > 0 ? (
        <VerticalTimeline layout={"1-column-left"} animate={false}>
          {filterListOfTimepoints.map((timepoint: TimepointModel) => (
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
      ) : (
        <p>{textForNoTimepoints}</p>
      )}
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
