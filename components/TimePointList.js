import styled from "styled-components";

export default function TimePointList({ listOfTimepoints }) {
  return (
    <TimePointListContainer>
      {listOfTimepoints.map((x) => (
        <p key={x.id}>{x.title}</p>
      ))}
    </TimePointListContainer>
  );
}

const TimePointListContainer = styled.div``;
