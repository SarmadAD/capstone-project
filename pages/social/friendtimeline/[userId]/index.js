import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import styled from "styled-components";
import useSWR from "swr";
import Loading from "../../../../components/Loading/Loading";
import TimepointList from "../../../../components/TimepointList/TimepointList";

export default function FriendTimeline() {
  const router = useRouter();
  const { userId } = router.query;
  const timepoints = useSWR(`/api/timepoints/usertimepoint/${userId}`);
  const textForNoTimepoints = "Keine Timeline hier...";
  return (
    <FriendTimelineContainer>
      {timepoints.data && timepoints.data.length > 0 ? (
        <TimepointList listOfTimepoints={timepoints.data} readOnlyMode={true} />
      ) : timepoints.data && timepoints.data.length === 0 ? (
        <p>{textForNoTimepoints}</p>
      ) : (
        <Loading />
      )}
    </FriendTimelineContainer>
  );
}

const FriendTimelineContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5em;
  p {
    text-align: center;
    font-size: 2.5em;
    color: #ffffff;
  }
`;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signIn",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
