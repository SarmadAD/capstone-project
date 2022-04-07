import { VerticalTimelineElement } from "react-vertical-timeline-component";
import Image from "next/image";
import React from "react";
import "react-vertical-timeline-component/style.min.css";
import styled from "styled-components";
import { TimePointTypeList } from "../../model/TimePointTypeList";

export default function Timepoint({ timepoint, setEditTimepointMode, setDeleteTimepointMode, setCurrentTimepoint, openModal }) {
  const iconTimepointStyle = TimePointTypeList.find((iconStyle) => iconStyle.type == timepoint.type);
  const timepointStyle = {
    background: "#FFFFFFF",
    color: "#000000",
    width: "100%",
    borderRadius: "26px",
    boxShadow: "0px 0px 13px 0px rgba(255,255,255,0.42)",
    padding: 0,
    paddingRight: "1em",
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
    <VerticalTimelineElement
      className="vertical-timeline-element--work"
      contentStyle={timepointStyle}
      contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
      iconStyle={{ background: iconTimepointStyle.color, color: "#fff", padding: "0.5em" }}
      icon={<Image src={iconTimepointStyle.icon} alt={`${iconTimepointStyle.type} Icon`} width={50} height={50}></Image>}
    >
      <TimepointContentContainer>
        <ImageContainer>
          <Image src="/Images/random.jpg" alt="The Image of the timepoint" width={100} height={35} className="timepointImage" />
        </ImageContainer>
        <TimepointContentRightSide>
          <TimepointHeader>{timepoint.title}</TimepointHeader>
          <TimepointContent>{timepoint.content}</TimepointContent>
          <FooterTimePoint>
            <div>{timepoint.date}</div>
            <EditDeleteContainer>
              <Image src="/SVG/delete.svg" height={25} width={25} alt="delete" onClick={handleDeleteClick} />
              <Image src="/SVG/edit.svg" height={25} width={25} alt="edit" onClick={handleEditClick} />
            </EditDeleteContainer>
          </FooterTimePoint>
        </TimepointContentRightSide>
      </TimepointContentContainer>
    </VerticalTimelineElement>
  );
}

const TimepointContentContainer = styled.div`
  display: flex;
  max-height: 150px;
`;

const TimepointContentRightSide = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1em;
  width: 70%;
`;

const ImageContainer = styled.div`
  display: flex;
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
