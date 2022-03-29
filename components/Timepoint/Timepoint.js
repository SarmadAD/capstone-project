import Image from "next/image";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import styled from "styled-components";

export default function Timepoint({ timepoint }) {
  const timepointStyle = {
    background: "#FFFFFFF",
    color: "#000000",
    width: "100%",
    borderRadius: "26px",
    filter: "drop-shadow(0px 4px 4px #F3686B)",
    padding: 0,
    paddingRight: "1em",
    boxShadow: "none",
  };
  return (
    <VerticalTimelineElement
      className="vertical-timeline-element--work"
      contentStyle={timepointStyle}
      contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
      iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
      // icon={<WorkIcon />}
    >
      <TimepointContentContainer>
        <ImageContainer>
          <Image src="/Images/random.jpg" alt="The Image of the timepoint" width={100} height={35} className="timepointImage" />
        </ImageContainer>
        <TimepointContentRightSide>
          <StyledTimepointHeader>{timepoint.title}</StyledTimepointHeader>
          <TimepointContent>{timepoint.content}</TimepointContent>
          <FooterTimePoint>
            <div>{timepoint.date}</div>
            <EditDeleteContainer>
              <Image src="/SVG/delete.svg" height={25} width={25} alt="delete" />
              <Image src="/SVG/edit.svg" height={25} width={25} alt="edit" />
            </EditDeleteContainer>
          </FooterTimePoint>
        </TimepointContentRightSide>
      </TimepointContentContainer>
    </VerticalTimelineElement>
  );
}
//weiter machen mit styling: Überschrift besser machen positon, etc
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

const StyledTimepointHeader = styled.h3`
  font-style: normal;
  font-weight: 400;
`;

const TimepointContent = styled.article`
  font-style: normal;
  font-weight: 400;
  margin-bottom: 1em;
  overflow-y:auto;
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
