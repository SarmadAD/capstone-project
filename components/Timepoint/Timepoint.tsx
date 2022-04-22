import { VerticalTimelineElement } from "react-vertical-timeline-component";
import Image from "next/image";
import React from "react";
import styled from "styled-components";
import { TimePointTypeList } from "../../model/TimePointTypeList";
import { motion, AnimatePresence } from "framer-motion";

export default function Timepoint({ timepoint, setEditTimepointMode, setDeleteTimepointMode, setCurrentTimepoint, openModal, readOnlyMode }) {
  const iconTimepointStyle = TimePointTypeList.find((iconStyle) => iconStyle.type == timepoint.type);
  const timepointStyle = {
    background: "#FFFFFFF",
    color: "#000000",
    borderRadius: "26px",
    boxShadow: "0px 0px 13px 0px rgba(255,255,255,0.42)",
    padding: 0,
    paddingRight: "1em",
  };

  const itemVariants = {
    initial: {
      opacity: 0,
      y: 100,
    },
    default: {
      opacity: 1,
      y: 0,
    },
    exit: {
      y: 100,
      opacity: 0,
    },
  };

  function handleEditClick() {
    setEditTimepointMode(true);
    setCurrentTimepoint(timepoint);
    openModal(true);
  }

  function handleDeleteClick() {
    setDeleteTimepointMode(true);
    setCurrentTimepoint(timepoint);
    openModal(true);
  }

  return (
    <TimepointContainer variants={itemVariants} initial="initial" animate="default" exit="exit">
      <VerticalTimelineElement
        contentStyle={timepointStyle}
        contentArrowStyle={{ borderRight: "7px solid  #FFFFFF" }}
        iconStyle={{ background: iconTimepointStyle.color, color: "#fff", padding: "0.5em" }}
        icon={<Image src={iconTimepointStyle.icon} alt={`${iconTimepointStyle.type} Icon`} width={50} height={50}></Image>}
      >
        <TimepointContentContainer>
          <ImageContainer>
            {timepoint.picture ? (
              <Image src={timepoint.picture} alt="The Image of the timepoint" width={100} height={100} className="timepointImage" />
            ) : (
              <Image src="/Images/random.jpg" alt="The Image of the timepoint" width={100} height={100} className="timepointImage" />
            )}
          </ImageContainer>
          <TimepointContentRightSide>
            <TimepointHeader>{timepoint.title}</TimepointHeader>
            <TimepointContent>{timepoint.content}</TimepointContent>
            <FooterTimePoint>
              <div>{timepoint.date}</div>
              {readOnlyMode ? (
                ""
              ) : (
                <EditDeleteContainer>
                  <Image src="/SVG/delete.svg" height={25} width={25} alt="delete" onClick={handleDeleteClick} />
                  <Image src="/SVG/edit.svg" height={25} width={25} alt="edit" onClick={handleEditClick} />
                </EditDeleteContainer>
              )}
            </FooterTimePoint>
          </TimepointContentRightSide>
        </TimepointContentContainer>
      </VerticalTimelineElement>
    </TimepointContainer>
  );
}

const TimepointContainer = styled(motion.div)`
  margin-top: 1em;
`;

const TimepointContentContainer = styled.div`
  display: flex;
  width: 100%;
  max-height: 150px;
  max-width: 280px;
`;

const TimepointContentRightSide = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1em;
  width: 60%;
`;

const ImageContainer = styled.div`
  display: flex;
  width: 40%;
  border-radius: 26px 0px 0px 26px;

  .timepointImage {
    border-radius: 26px 0px 0px 26px;
  }
`;

const TimepointHeader = styled.h3`
  font-style: normal;
  font-weight: 400;
`;

const TimepointContent = styled.article`
  font-style: normal;
  font-weight: 400;
  margin-bottom: 1em;
  overflow-y: auto;
`;

const FooterTimePoint = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1em;
`;

const EditDeleteContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
